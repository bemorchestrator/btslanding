import type { Article } from '../types/admin';

const API_BASE_URL = '/api/articles';

/**
 * Get auth token from localStorage
 */
function getAuthToken(): string | null {
  return localStorage.getItem('bts_admin_token');
}

/**
 * Handle API response errors
 */
async function handleResponse(response: Response) {
  if (!response.ok) {
    // If unauthorized, redirect to login
    if (response.status === 401) {
      localStorage.removeItem('bts_admin_token');
      localStorage.removeItem('bts_admin_user');
      window.location.href = '/admin/login';
      throw new Error('Unauthorized');
    }

    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}

/**
 * Get all articles
 * @param categoryId - Optional filter by category
 * @param status - Optional filter by status ('draft' | 'published')
 */
export async function getArticles(categoryId?: string, status?: string): Promise<Article[]> {
  const token = getAuthToken();
  if (!token) {
    window.location.href = '/admin/login';
    throw new Error('Not authenticated');
  }

  const params = new URLSearchParams();
  if (categoryId) params.append('categoryId', categoryId);
  if (status) params.append('status', status);

  const url = `${API_BASE_URL}${params.toString() ? `?${params.toString()}` : ''}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const result = await handleResponse(response);
  return result.data;
}

/**
 * Get article by ID
 */
export async function getArticleById(id: string): Promise<Article> {
  const token = getAuthToken();
  if (!token) {
    window.location.href = '/admin/login';
    throw new Error('Not authenticated');
  }

  const response = await fetch(`${API_BASE_URL}/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const result = await handleResponse(response);
  return result.data;
}

/**
 * Get article by slug (PUBLIC - no authentication required)
 * Only returns published articles
 */
export async function getArticleBySlug(slug: string): Promise<Article> {
  const response = await fetch(`${API_BASE_URL}/slug/${slug}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Article not found');
  }

  const result = await response.json();
  return result.data;
}

/**
 * Create new article
 */
export async function createArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'slug'>): Promise<Article> {
  const token = getAuthToken();
  if (!token) {
    window.location.href = '/admin/login';
    throw new Error('Not authenticated');
  }

  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  });

  const result = await handleResponse(response);
  return result.data;
}

/**
 * Update existing article
 */
export async function updateArticle(id: string, article: Partial<Article>): Promise<Article> {
  const token = getAuthToken();
  if (!token) {
    window.location.href = '/admin/login';
    throw new Error('Not authenticated');
  }

  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  });

  const result = await handleResponse(response);
  return result.data;
}

/**
 * Delete article
 */
export async function deleteArticle(id: string): Promise<void> {
  const token = getAuthToken();
  if (!token) {
    window.location.href = '/admin/login';
    throw new Error('Not authenticated');
  }

  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  await handleResponse(response);
}
