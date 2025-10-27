import express, { Request, Response } from 'express';
import { Author } from '../models/author';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

console.log('✅ Author routes loaded');

/**
 * GET /api/authors
 * Get all authors (sorted by name)
 * @access Public (needed for article display)
 */
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const authors = await Author
      .find()
      .sort({ name: 1 });

    // Convert Mongoose documents to JSON with manual _id to id transformation
    const authorsJSON = authors.map((author: {
      _id: unknown;
      name: string;
      slug: string;
      profilePicture: string;
      bio: string;
      email?: string;
      social?: {
        twitter?: string;
        linkedin?: string;
        facebook?: string;
        website?: string;
      };
      createdAt: Date;
      updatedAt: Date;
    }) => ({
      id: String(author._id),
      name: author.name,
      slug: author.slug,
      profilePicture: author.profilePicture,
      bio: author.bio,
      email: author.email,
      social: author.social,
      createdAt: author.createdAt,
      updatedAt: author.updatedAt,
    }));
    res.json(authorsJSON);
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).json({ message: 'Failed to fetch authors' });
  }
});

/**
 * GET /api/authors/:id
 * Get single author by ID
 * @access Public
 */
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const author = await Author.findById(req.params.id);

    if (!author) {
      res.status(404).json({ message: 'Author not found' });
      return;
    }

    res.json({
      id: String(author._id),
      name: author.name,
      slug: author.slug,
      profilePicture: author.profilePicture,
      bio: author.bio,
      email: author.email,
      social: author.social,
      createdAt: author.createdAt,
      updatedAt: author.updatedAt,
    });
  } catch (error) {
    console.error('Error fetching author:', error);
    res.status(500).json({ message: 'Failed to fetch author' });
  }
});

/**
 * POST /api/authors
 * Create new author
 * @access Protected (admin only)
 */
router.post('/', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, profilePicture, bio, email, social } = req.body;

    // Validate required fields
    if (!name || !name.trim()) {
      res.status(400).json({ message: 'Author name is required' });
      return;
    }
    if (!profilePicture || !profilePicture.trim()) {
      res.status(400).json({ message: 'Profile picture URL is required' });
      return;
    }
    if (!bio || !bio.trim()) {
      res.status(400).json({ message: 'Bio is required' });
      return;
    }

    // Create author
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const author = await Author.create({
      name: name.trim(),
      profilePicture: profilePicture.trim(),
      bio: bio.trim(),
      email: email?.trim() || undefined,
      social: social || {},
    });

    res.status(201).json({
      id: String(author._id),
      name: author.name,
      slug: author.slug,
      profilePicture: author.profilePicture,
      bio: author.bio,
      email: author.email,
      social: author.social,
      createdAt: author.createdAt,
      updatedAt: author.updatedAt,
    });
  } catch (error) {
    console.error('Error creating author:', error);
    if ((error as { name?: string }).name === 'ValidationError') {
      res.status(400).json({ message: (error as Error).message });
    } else {
      res.status(500).json({ message: 'Failed to create author' });
    }
  }
});

/**
 * PUT /api/authors/:id
 * Update author
 * @access Protected (admin only)
 */
router.put('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, profilePicture, bio, email, social } = req.body;

    // Validate required fields if provided
    if (name !== undefined && !name.trim()) {
      res.status(400).json({ message: 'Author name cannot be empty' });
      return;
    }
    if (profilePicture !== undefined && !profilePicture.trim()) {
      res.status(400).json({ message: 'Profile picture URL cannot be empty' });
      return;
    }
    if (bio !== undefined && !bio.trim()) {
      res.status(400).json({ message: 'Bio cannot be empty' });
      return;
    }

    // Build update object
    const updateData: {
      name?: string;
      profilePicture?: string;
      bio?: string;
      email?: string;
      social?: {
        twitter?: string;
        linkedin?: string;
        facebook?: string;
        website?: string;
      };
    } = {};

    if (name !== undefined) updateData.name = name.trim();
    if (profilePicture !== undefined) updateData.profilePicture = profilePicture.trim();
    if (bio !== undefined) updateData.bio = bio.trim();
    if (email !== undefined) updateData.email = email.trim() || undefined;
    if (social !== undefined) updateData.social = social;

    // Find author first, then update and save to trigger pre-save hooks
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const author = await Author.findById(req.params.id);

    if (!author) {
      res.status(404).json({ message: 'Author not found' });
      return;
    }

    // Update fields directly (not using Object.assign to ensure Mongoose change tracking works)
    if (updateData.name !== undefined) author.name = updateData.name;
    if (updateData.profilePicture !== undefined) author.profilePicture = updateData.profilePicture;
    if (updateData.bio !== undefined) author.bio = updateData.bio;
    if (updateData.email !== undefined) author.email = updateData.email;
    if (updateData.social !== undefined) author.social = updateData.social;

    // Save to trigger pre-save hooks (generates slug from name)
    await author.save();

    res.json({
      id: String(author._id),
      name: author.name,
      slug: author.slug,
      profilePicture: author.profilePicture,
      bio: author.bio,
      email: author.email,
      social: author.social,
      createdAt: author.createdAt,
      updatedAt: author.updatedAt,
    });
  } catch (error) {
    console.error('Error updating author:', error);
    if ((error as { name?: string }).name === 'ValidationError') {
      res.status(400).json({ message: (error as Error).message });
    } else {
      res.status(500).json({ message: 'Failed to update author' });
    }
  }
});

/**
 * DELETE /api/authors/:id
 * Delete author
 * @access Protected (admin only)
 */
router.delete('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const author = await Author.findByIdAndDelete(req.params.id);

    if (!author) {
      res.status(404).json({ message: 'Author not found' });
      return;
    }

    res.json({ message: 'Author deleted successfully' });
  } catch (error) {
    console.error('Error deleting author:', error);
    res.status(500).json({ message: 'Failed to delete author' });
  }
});

export default router;
