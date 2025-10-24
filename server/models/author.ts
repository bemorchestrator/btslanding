import mongoose, { Schema, Document } from 'mongoose';

/**
 * Author Interface
 * Extends Document to include Mongoose document properties
 */
export interface IAuthor extends Document {
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
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
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

// Pre-save hook to generate slug from name
AuthorSchema.pre('save', async function (next) {
  // Generate slug if it doesn't exist or if name was modified
  if (!this.slug || this.isModified('name')) {
    let slug = generateSlug(String(this.name));

    // Check for duplicate slugs and append number if necessary
    const existingAuthor = await mongoose.model('Author').findOne({ slug, _id: { $ne: this._id } });
    if (existingAuthor) {
      let counter = 1;
      let newSlug = `${slug}-${counter}`;
      while (await mongoose.model('Author').findOne({ slug: newSlug, _id: { $ne: this._id } })) {
        counter++;
        newSlug = `${slug}-${counter}`;
      }
      slug = newSlug;
    }

    this.slug = slug;
  }
  next();
});

// Create indexes for faster lookups
AuthorSchema.index({ name: 1 });
AuthorSchema.index({ slug: 1 });

/**
 * Author Model
 * Export the Mongoose model for use in routes and controllers
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Author: any = mongoose.model('Author', AuthorSchema);
