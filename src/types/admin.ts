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
  categoryId: string;
  content: string;
  contentBlocks?: ArticleContent[];
  author: string;
  status: 'draft' | 'published';
  createdAt: string;
  featuredImage?: string;
}

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
