import express, { Request, Response } from 'express';
import { Category } from '../models/category';
import { AuthRequest, requireAuth } from '../middleware/auth';

const router = express.Router();

/**
 * GET /api/categories/public
 * Get all categories (PUBLIC - no authentication required)
 * Returns all categories sorted alphabetically for blog page display
 * @access Public
 */
router.get('/public', async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find()
      .sort({ name: 1 }); // Sort alphabetically by name

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error('Error fetching public categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * GET /api/categories
 * Get all categories
 * @access Protected
 */
router.get('/', requireAuth, async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const categories = await Category.find()
      .sort({ createdAt: -1 }); // Sort by creation date (newest first)

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * GET /api/categories/:id
 * Get single category by ID
 * @access Protected
 */
router.get('/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const category = await Category.findById(id);

    if (!category) {
      res.status(404).json({
        success: false,
        message: 'Category not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch category',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/categories
 * Create new category
 * @access Protected
 */
router.post('/', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;

    // Validate required fields
    if (!name || !description) {
      res.status(400).json({
        success: false,
        message: 'Name and description are required',
      });
      return;
    }

    // Check if category with same name already exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      res.status(409).json({
        success: false,
        message: 'A category with this name already exists',
      });
      return;
    }

    // Create new category
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const category = await Category.create({
      name,
      description,
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    console.error('Error creating category:', error);

    // Handle Mongoose validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create category',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * PUT /api/categories/:id
 * Update category
 * @access Protected
 */
router.put('/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Validate required fields
    if (!name || !description) {
      res.status(400).json({
        success: false,
        message: 'Name and description are required',
      });
      return;
    }

    // Check if category exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const category = await Category.findById(id);
    if (!category) {
      res.status(404).json({
        success: false,
        message: 'Category not found',
      });
      return;
    }

    // Check if new name conflicts with existing category (excluding current one)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingCategory = await Category.findOne({
      name,
      _id: { $ne: id },
    });

    if (existingCategory) {
      res.status(409).json({
        success: false,
        message: 'A category with this name already exists',
      });
      return;
    }

    // Update category
    category.name = name;
    category.description = description;
    await category.save();

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    });
  } catch (error) {
    console.error('Error updating category:', error);

    // Handle Mongoose validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update category',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * DELETE /api/categories/:id
 * Delete category
 * @access Protected
 */
router.delete('/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const category = await Category.findById(id);

    if (!category) {
      res.status(404).json({
        success: false,
        message: 'Category not found',
      });
      return;
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete category',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
