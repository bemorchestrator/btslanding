import type { Author } from '../types/admin';

/**
 * API Service for Author CRUD operations
 * All write endpoints require JWT authentication, read endpoints are public
 */

const API_BASE_URL = '/api/authors';

/**
 * Get authentication token from localStorage
 */
function getAuthToken(): string | null {
  return localStorage.getItem('bts_admin_token');
}

/**
 * Get headers with authentication
 */
function getHeaders(): HeadersInit {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
}

/**
 * Handle API response
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    // Handle 401 Unauthorized - redirect to login
    if (response.status === 401) {
      localStorage.removeItem('bts_admin_token');
      localStorage.removeItem('bts_admin_user');
      window.location.href = '/admin/login';
      throw new Error('Authentication required');
    }

    // Try to parse error message from response
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * GET all authors
 * @returns Promise<Author[]>
 */
export async function getAuthors(): Promise<Author[]> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: getHeaders(),
    });

    return handleResponse<Author[]>(response);
  } catch (error) {
    console.error('Error fetching authors:', error);
    throw error;
  }
}

/**
 * GET single author by ID
 * @param id - Author ID
 * @returns Promise<Author>
 */
export async function getAuthor(id: string): Promise<Author> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    return handleResponse<Author>(response);
  } catch (error) {
    console.error('Error fetching author:', error);
    throw error;
  }
}

/**
 * POST create new author
 * @param author - Author data (without id, timestamps, and slug - slug is auto-generated)
 * @returns Promise<Author>
 */
export async function createAuthor(author: Omit<Author, 'id' | 'createdAt' | 'updatedAt' | 'slug'>): Promise<Author> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(author),
    });

    return handleResponse<Author>(response);
  } catch (error) {
    console.error('Error creating author:', error);
    throw error;
  }
}

/**
 * PUT update existing author
 * @param id - Author ID
 * @param author - Updated author data (partial, slug is auto-generated from name)
 * @returns Promise<Author>
 */
export async function updateAuthor(id: string, author: Partial<Omit<Author, 'id' | 'createdAt' | 'updatedAt' | 'slug'>>): Promise<Author> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(author),
    });

    return handleResponse<Author>(response);
  } catch (error) {
    console.error('Error updating author:', error);
    throw error;
  }
}

/**
 * DELETE author
 * @param id - Author ID
 * @returns Promise<{ message: string }>
 */
export async function deleteAuthor(id: string): Promise<{ message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    return handleResponse<{ message: string }>(response);
  } catch (error) {
    console.error('Error deleting author:', error);
    throw error;
  }
}
