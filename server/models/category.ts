import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * Category Interface
 * Extends Document to include Mongoose document properties
 */
export interface ICategory extends Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
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

// Create indexes for better query performance
CategorySchema.index({ name: 1 });
CategorySchema.index({ createdAt: -1 });

/**
 * Category Model
 * Export the Mongoose model for use in routes and controllers
 * Note: Using any type to avoid TypeScript's "Expression produces a union type that is too complex to represent" error
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Category: any = mongoose.model('Category', CategorySchema);
