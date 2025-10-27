import mongoose, { Schema, Document } from 'mongoose';

/**
 * Category Interface
 * Extends Document to include Mongoose document properties
 */
export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Helper function to generate slug from name
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-')  // Replace spaces, underscores with hyphens
    .replace(/^-+|-+$/g, '');  // Remove leading/trailing hyphens
}

/**
 * Category Schema
 * Defines the structure and validation rules for categories
 */
const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      unique: true,
      minlength: [2, 'Category name must be at least 2 characters'],
      maxlength: [100, 'Category name must not exceed 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Category description is required'],
      trim: true,
      minlength: [5, 'Description must be at least 5 characters'],
      maxlength: [500, 'Description must not exceed 500 characters'],
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

// Pre-save hook to generate slug from name
CategorySchema.pre('save', async function (next) {
  // Generate slug if it doesn't exist or if name was modified
  if (!this.slug || this.isModified('name')) {
    let slug = generateSlug(String(this.name));

    // Check for duplicate slugs and append number if necessary
    const existingCategory = await mongoose.model('Category').findOne({ slug, _id: { $ne: this._id } });
    if (existingCategory) {
      let counter = 1;
      let newSlug = `${slug}-${counter}`;
      while (await mongoose.model('Category').findOne({ slug: newSlug, _id: { $ne: this._id } })) {
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
CategorySchema.index({ name: 1 });
CategorySchema.index({ slug: 1 });
CategorySchema.index({ createdAt: -1 });

/**
 * Category Model
 * Export the Mongoose model for use in routes and controllers
 * Note: Using 'any' type because Mongoose's Model<ICategory> produces a union type too complex for TypeScript to represent
 * This is a known Mongoose/TypeScript limitation - the model is properly typed at runtime
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Category: any = mongoose.model('Category', CategorySchema);
