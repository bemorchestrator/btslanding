import express, { Request, Response } from 'express';
import { findUserByUsername, verifyPassword } from '../models/user';
import { generateToken, requireAuth, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Login endpoint
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required' });
      return;
    }

    // Find user
    const user = await findUserByUsername(username);
    if (!user) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    // Generate token
    const token = generateToken(user.username, user.role);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Verify token endpoint
router.get('/verify', requireAuth, (req: AuthRequest, res: Response): void => {
  res.status(200).json({
    message: 'Token is valid',
    user: req.user,
  });
});

// Logout endpoint (client-side token removal, but we can track it here)
router.post('/logout', (_req: Request, res: Response): void => {
  // In a real application, you might want to blacklist the token
  res.status(200).json({ message: 'Logout successful' });
});

export default router;
