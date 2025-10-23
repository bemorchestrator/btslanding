import mongoose, { Schema, Document } from 'mongoose';

/**
 * Author Interface
 * Extends Document to include Mongoose document properties
 */
export interface IAuthor extends Document {
  name: string;
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
}

/**
 * Author Schema
 * Defines the structure and validation rules for authors
 */
const AuthorSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
      minlength: [2, 'Author name must be at least 2 characters'],
      maxlength: [100, 'Author name must not exceed 100 characters'],
    },
    profilePicture: {
      type: String,
      required: [true, 'Profile picture URL is required'],
      trim: true,
    },
    bio: {
      type: String,
      required: [true, 'Author bio is required'],
      trim: true,
      maxlength: [500, 'Bio must not exceed 500 characters'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    social: {
      twitter: {
        type: String,
        trim: true,
      },
      linkedin: {
        type: String,
        trim: true,
      },
      facebook: {
        type: String,
        trim: true,
      },
      website: {
        type: String,
        trim: true,
      },
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

// Create index for name for faster lookups
AuthorSchema.index({ name: 1 });

/**
 * Author Model
 * Export the Mongoose model for use in routes and controllers
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Author: any = mongoose.model('Author', AuthorSchema);
