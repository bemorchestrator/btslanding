import mongoose, { Schema, Document } from 'mongoose';

/**
 * Article Interface
 * Extends Document to include Mongoose document properties
 */
export interface IArticle extends Document {
  title: string;
  slug: string;
  categoryId: mongoose.Types.ObjectId;
  content: string;
  contentBlocks: Array<{
    type: 'heading' | 'paragraph' | 'image' | 'quote';
    content: string;
    style?: {
      textAlign?: 'left' | 'center' | 'right';
      fontSize?: string;
      fontWeight?: string;
    };
  }>;
  author: string;
  status: 'draft' | 'published';
  featuredImage?: string;
  // Draft fields - for saving work-in-progress without affecting published content
  draftTitle?: string;
  draftCategoryId?: mongoose.Types.ObjectId;
  draftContent?: string;
  draftAuthor?: string;
  draftFeaturedImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Generate URL-safe slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Remove consecutive hyphens
    .replace(/^-+|-+$/g, '');  // Remove leading/trailing hyphens
}

/**
 * Article Schema
 * Defines the structure and validation rules for articles
 */
const ArticleSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Article title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [200, 'Title must not exceed 200 characters'],
    },
    slug: {
      type: String,
      required: false, // Will be auto-generated in pre-save hook
      unique: true,
      trim: true,
      lowercase: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    content: {
      type: String,
      default: '',
    },
    contentBlocks: {
      type: Schema.Types.Mixed,
      default: [],
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
      minlength: [2, 'Author name must be at least 2 characters'],
      maxlength: [100, 'Author name must not exceed 100 characters'],
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    featuredImage: {
      type: String,
      trim: true,
    },
    // Draft fields - for saving work-in-progress without affecting published content
    draftTitle: {
      type: String,
      trim: true,
    },
    draftCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    draftContent: {
      type: String,
      default: '',
    },
    draftAuthor: {
      type: String,
      trim: true,
    },
    draftFeaturedImage: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    toJSON: {
      transform: function (_doc, ret: { id?: string; _id?: unknown; __v?: number }) {
        // Transform _id to id for frontend compatibility
        ret.id = String(ret._id);
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Pre-save hook to generate slug from title
ArticleSchema.pre('save', async function (next) {
  // Generate slug if it doesn't exist or if title was modified
  if (!this.slug || this.isModified('title')) {
    let slug = generateSlug(String(this.title));

    // Check for duplicate slugs and append number if necessary
    const existingArticle = await mongoose.model('Article').findOne({ slug, _id: { $ne: this._id } });
    if (existingArticle) {
      let counter = 1;
      let newSlug = `${slug}-${counter}`;
      while (await mongoose.model('Article').findOne({ slug: newSlug, _id: { $ne: this._id } })) {
        counter++;
        newSlug = `${slug}-${counter}`;
      }
      slug = newSlug;
    }

    this.slug = slug;
  }
  next();
});

// Create indexes for better query performance
ArticleSchema.index({ slug: 1 }, { unique: true });
ArticleSchema.index({ categoryId: 1 });
ArticleSchema.index({ status: 1 });
ArticleSchema.index({ createdAt: -1 });

/**
 * Article Model
 * Export the Mongoose model for use in routes and controllers
 * Note: Using any type to avoid TypeScript's "Expression produces a union type that is too complex to represent" error
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Article: any = mongoose.model('Article', ArticleSchema);
