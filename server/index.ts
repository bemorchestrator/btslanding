import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import axios from 'axios';
import authRoutes from './routes/auth';
import categoryRoutes from './routes/categories';
import { connectDatabase } from './config/database';
import { requireAuth } from './middleware/auth';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Set CSP headers that allow reCAPTCHA
app.use((_req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' http://localhost:3000 https://localhost:3000 http://127.0.0.1:3000 https://127.0.0.1:3000 https://www.betterteachingsolutions.com https://betterteachingsolutions.com; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:3000 https://localhost:3000 http://127.0.0.1:3000 https://127.0.0.1:3000 https://www.google.com https://www.gstatic.com https://recaptcha.google.com https://www.recaptcha.google.com https://www.google-analytics.com https://analytics.google.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: blob: https: http: https://www.google.com https://www.gstatic.com; " +
    "connect-src 'self' http://localhost:3000 https://localhost:3000 http://127.0.0.1:3000 https://127.0.0.1:3000 https://www.google.com https://www.gstatic.com https://www.recaptcha.google.com https://recaptcha.google.com https://www.google-analytics.com https://analytics.google.com https://play.google.com https://www.recaptcha.net https://*.ingest.sentry.io https://api.segment.io https://csp.withgoogle.com; " +
    "frame-src 'self' http://localhost:3000 https://localhost:3000 http://127.0.0.1:3000 https://127.0.0.1:3000 https://www.google.com https://recaptcha.google.com https://www.recaptcha.google.com; " +
    "manifest-src 'self' http://localhost:3000 https://localhost:3000 http://127.0.0.1:3000 https://127.0.0.1:3000; " +
    "object-src 'none'; " +
    "base-uri 'self';"
  );
  next();
});

// Request logging middleware - only in development
app.use((req: Request, _res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  }
  next();
});

// Create reusable transporter object using SMTP transport
let transporter: nodemailer.Transporter | null = null;

// Only create transporter if SMTP is configured
if (process.env.SMTP_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Verify SMTP connection configuration
  transporter.verify(function (error: Error | null, _success: boolean) {
    if (error) {
      console.error('SMTP connection error:', error);
    } else {
      console.log('SMTP server is ready to take our messages');
    }
  });
} else {
  console.log('SMTP not configured - email sending disabled in development mode');
}

// Types for request bodies
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  recaptchaToken?: string;
  submissionTime?: number;
  website?: string;
}

// Mount auth routes
app.use('/api/auth', authRoutes);

// Mount category routes (protected with auth middleware)
app.use('/api/categories', requireAuth, categoryRoutes);

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_SECURE: process.env.SMTP_SECURE,
      EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
      EMAIL_PASS: process.env.EMAIL_PASS ? 'Set' : 'Not set'
    }
  });
});

// Contact form endpoint
app.post('/api/contact', async (req: Request, res: Response): Promise<void> => {
  // Safe logging - only log non-sensitive data
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment) {
    console.log('Received contact form submission:', {
      name: req.body.name,
      email: req.body.email ? `${req.body.email.substring(0, 3)}***@${req.body.email.split('@')[1]}` : undefined,
      subject: req.body.subject,
      hasRecaptchaToken: !!req.body.recaptchaToken,
      messageLength: req.body.message?.length || 0,
      submissionTime: req.body.submissionTime
    });
  } else {
    console.log('Contact form submission received:', {
      timestamp: new Date().toISOString(),
      hasRecaptchaToken: !!req.body.recaptchaToken,
      submissionTime: req.body.submissionTime
    });
  }
  
  try {
    const { name, email, subject, message, recaptchaToken, submissionTime, website } = req.body as ContactFormData;

    // Server-side validation
    // 1. Check for honeypot field (bots will fill this)
    if (website) {
      // Honeypot field was filled - likely a bot
      // Return success to avoid giving feedback to bots
      res.status(200).json({ message: 'Form submitted successfully' });
      return;
    }

    // 2. Check submission time (if too quick, likely a bot)
    if (submissionTime && submissionTime < 3000) { // Less than 3 seconds is suspicious
      console.log('Rejected: Form submitted too quickly');
      res.status(400).json({ message: 'Submission rejected. Please try again later.' });
      return;
    }

    // 3. Validate required fields
    if (!name || !email || !subject || !message) {
      console.error('Missing required fields:', { name, email, subject, message });
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    // 4. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: 'Invalid email address' });
      return;
    }

    // 5. Check for spam keywords or patterns
    const spamKeywords = ['casino', 'loan', 'viagra', 'free money', 'deposit'];
    const containsSpamKeyword = spamKeywords.some(keyword => 
      message.toLowerCase().includes(keyword) || 
      subject.toLowerCase().includes(keyword)
    );
    
    if (containsSpamKeyword) {
      res.status(400).json({ message: 'Your message contains prohibited content.' });
      return;
    }

    // 6. Count URLs in message (too many links is suspicious)
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = message.match(urlRegex) || [];
    if (urls.length > 2) {
      res.status(400).json({ message: 'Too many links in your message.' });
      return;
    }

    // 7. Verify reCAPTCHA token
    if (recaptchaToken) {
      const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
      if (recaptchaSecretKey) {
        try {
          const recaptchaVerification = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            null,
            {
              params: {
                secret: recaptchaSecretKey,
                response: recaptchaToken,
              },
              timeout: 10000, // 10 second timeout
            }
          );

          const { success, score, 'error-codes': errorCodes } = recaptchaVerification.data;
          
          // reCAPTCHA verification failed or score too low (v3 provides a score from 0.0 to 1.0)
          if (!success) {
            console.log('reCAPTCHA verification failed:', { 
              success, 
              score: score || 'N/A',
              errorCodes: errorCodes || 'None'
            });
            const errorMessage = errorCodes && errorCodes.includes('timeout-or-duplicate') 
              ? 'Security verification expired. Please try again.'
              : 'Security verification failed. Please try again.';
            res.status(400).json({ message: errorMessage });
            return;
          }
          
          if (score && score < 0.5) {
            console.log('reCAPTCHA score below threshold:', { score, threshold: 0.5 });
            res.status(400).json({ message: 'Security verification failed. Please try again later.' });
            return;
          }
        } catch (recaptchaError: any) {
          console.error('reCAPTCHA verification error:', recaptchaError);
          if (recaptchaError?.code === 'ECONNABORTED') {
            res.status(400).json({ message: 'Security verification timed out. Please try again.' });
          } else {
            res.status(400).json({ message: 'Security verification failed. Please try again.' });
          }
          return;
        }
      } else {
        console.error('reCAPTCHA secret key not configured');
        res.status(500).json({ message: 'Security verification not properly configured.' });
        return;
      }
    } else {
      // If no token provided, check if we're in development mode
      const isDevelopment = process.env.NODE_ENV === 'development';
      const hasSiteKey = !!process.env.REACT_APP_RECAPTCHA_SITE_KEY;
      
      if (!isDevelopment && hasSiteKey) {
        console.log('No reCAPTCHA token provided in production');
        res.status(400).json({ message: 'Security verification required. Please refresh the page and try again.' });
        return;
      }
      
      console.log('Development mode: Skipping reCAPTCHA verification');
    }

    // Send email to support
    if (transporter) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'support@betterteachingsolutions.com',
        subject: `New Contact Form Submission: ${subject}`,
        text: `
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
        `,
        html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>
        `,
      });

      // Send confirmation email to user
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting Better Teaching Solutions',
        text: `
Dear ${name},

Thank you for contacting Better Teaching Solutions. We have received your message and will get back to you as soon as possible.

Here's a copy of your message:
Subject: ${subject}
Message: ${message}

Best regards,
Better Teaching Solutions Team
        `,
        html: `
<h2>Thank you for contacting Better Teaching Solutions</h2>
<p>Dear ${name},</p>
<p>Thank you for contacting Better Teaching Solutions. We have received your message and will get back to you as soon as possible.</p>
<p>Here's a copy of your message:</p>
<p><strong>Subject:</strong> ${subject}</p>
<p><strong>Message:</strong> ${message}</p>
<p>Best regards,<br>Better Teaching Solutions Team</p>
        `,
      });
    } else {
      console.log('SMTP not configured - email sending skipped in development mode');
      console.log('Contact form data:', { name, email, subject, messageLength: message.length });
    }

    console.log('Contact form processed successfully:', {
      timestamp: new Date().toISOString(),
      recipient: email ? `${email.substring(0, 3)}***@${email.split('@')[1]}` : 'N/A'
    });
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to send message',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    details: err.message 
  });
});

// Initialize database and start server
async function startServer() {
  try {
    // Connect to MongoDB
    await connectDatabase();

    // Start Express server
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API: http://localhost:${port}/api`);

      if (process.env.NODE_ENV === 'development') {
        console.log('\n📦 Environment variables loaded:', {
          SMTP_HOST: process.env.SMTP_HOST,
          SMTP_PORT: process.env.SMTP_PORT,
          SMTP_SECURE: process.env.SMTP_SECURE,
          EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
          EMAIL_PASS: process.env.EMAIL_PASS ? 'Set' : 'Not set',
          RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY ? 'Set' : 'Not set',
          MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not set',
        });
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer(); 