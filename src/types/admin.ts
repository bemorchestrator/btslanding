// Category types
export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
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
