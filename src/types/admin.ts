// Category types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
}

// Author types
export interface Author {
  id: string;
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
  createdAt: string;
  updatedAt: string;
}

// Article content block types
export interface ArticleContent {
  type: 'heading' | 'paragraph' | 'image' | 'quote';
  content: string;
  style?: {
    textAlign?: 'left' | 'center' | 'right';
    fontSize?: string;
    fontWeight?: string;
  };
}

// FAQ types
export interface FAQ {
  question: string;
  answer: string;
}

// Article types
export interface Article {
  id: string;
  title: string;
  slug?: string;
  categoryId: string;
  content: string;
  contentBlocks?: ArticleContent[];
  author: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt?: string;
  featuredImage?: string;
  // SEO Meta Fields
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  // FAQ Section
  faqs?: FAQ[];
  // Draft fields - for work-in-progress without affecting published content
  draftTitle?: string;
  draftCategoryId?: string;
  draftContent?: string;
  draftAuthor?: string;
  draftFeaturedImage?: string;
}

// Article update payload - allows null for draft fields to clear them
export type ArticleUpdatePayload = Partial<Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'draftTitle' | 'draftCategoryId' | 'draftContent' | 'draftAuthor' | 'draftFeaturedImage'>> & {
  draftTitle?: string | null;
  draftCategoryId?: string | null;
  draftContent?: string | null;
  draftAuthor?: string | null;
  draftFeaturedImage?: string | null;
  saveDraft?: boolean;
};

// Auth types
export interface User {
  username: string;
  role: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}
