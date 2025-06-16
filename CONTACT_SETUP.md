# Contact Form Setup Guide

## Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# Email Configuration
EMAIL_USER=support@betterteachingsolutions.com
EMAIL_PASS=your_app_password_here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# reCAPTCHA Configuration
REACT_APP_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
```

## reCAPTCHA Setup

### Important: Domain Configuration
reCAPTCHA keys are tied to specific domains. If your keys are configured for `betterteachingsolutions.com` but you're testing on `localhost`, you'll get errors.

### Option 1: Add Development Domains (Recommended)
1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Select your existing site (betterteachingsolutions.com)
3. Click "Settings"
4. In the "Domains" section, add:
   - `localhost`
   - `127.0.0.1`
   - `localhost:3000` (if using specific port)
5. Save changes

### Option 2: Create New reCAPTCHA Site
1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Create a new site for development
3. Choose reCAPTCHA v3
4. Add domains: `localhost`, `127.0.0.1`, etc.
5. Copy the Site Key to `REACT_APP_RECAPTCHA_SITE_KEY`
6. Copy the Secret Key to `RECAPTCHA_SECRET_KEY`

### Option 3: Development Without reCAPTCHA
For testing purposes, you can run the form without reCAPTCHA by:
1. Not setting the `REACT_APP_RECAPTCHA_SITE_KEY` in your `.env.local`
2. The form will show a "Development mode" message and skip verification

## Gmail Setup (if using Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password
   - Use this password in `EMAIL_PASS`

## Running the Application

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm run dev
   ```

This will start both the React frontend and the Express backend.

## Features Included

- ✅ reCAPTCHA v3 integration
- ✅ Spam protection (honeypot, timing checks, content filtering)
- ✅ Email validation
- ✅ Rate limiting protection
- ✅ CSP headers configured for reCAPTCHA
- ✅ Proper error handling and user feedback
- ✅ Mobile-responsive design
- ✅ Accessibility features
- ✅ Loading states and success messages

## Troubleshooting

### reCAPTCHA Issues
- Make sure your domain is added to the reCAPTCHA console
- Check that both site key and secret key are correct
- Verify CSP headers allow reCAPTCHA domains

### Email Issues
- Verify SMTP credentials
- Check if your email provider requires app passwords
- Test with a simple email service first

### Form Not Submitting
- Check browser console for JavaScript errors
- Verify the backend server is running on correct port
- Check network tab for API call failures 