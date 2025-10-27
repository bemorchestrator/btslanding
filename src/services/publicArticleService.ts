import type { Article, Category } from '../types/admin';

const API_BASE_URL = '/api';

/**
 * Get all published articles (PUBLIC - no authentication required)
 * Only returns articles with status 'published'
 */
export async function getPublishedArticles(): Promise<Article[]> {
  const response = await fetch(`${API_BASE_URL}/articles/public`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch published articles');
  }

  const result = await response.json();
  return result.data;
}

/**
 * Get all categories (PUBLIC - no authentication required)
 */
export async function getPublicCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/categories/public`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const result = await response.json();
  return result.data;
}

/**
 * Get article by slug (PUBLIC - no authentication required)
 * Only returns published articles
 */
export async function getPublishedArticleBySlug(slug: string): Promise<Article> {
  const response = await fetch(`${API_BASE_URL}/articles/slug/${slug}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Article not found or not published');
  }

  const result = await response.json();
  return result.data;
}
