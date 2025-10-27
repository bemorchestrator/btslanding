import type { Category } from '../types/admin';

/**
 * API Service for Category CRUD operations
 * All endpoints require JWT authentication
 */

const API_BASE_URL = '/api/categories';

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
 * GET all categories
 * @returns Promise<Category[]>
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: getHeaders(),
    });

    const data = await handleResponse<{ success: boolean; data: Category[] }>(response);
    return data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

/**
 * GET single category by ID
 * @param id - Category ID
 * @returns Promise<Category>
 */
export async function getCategory(id: string): Promise<Category> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    const data = await handleResponse<{ success: boolean; data: Category }>(response);
    return data.data;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
}

/**
 * POST create new category
 * @param categoryData - { name, description }
 * @returns Promise<Category>
 */
export async function createCategory(categoryData: {
  name: string;
  description: string;
}): Promise<Category> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(categoryData),
    });

    const data = await handleResponse<{ success: boolean; data: Category }>(response);
    return data.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
}

/**
 * PUT update existing category
 * @param id - Category ID
 * @param categoryData - { name, description }
 * @returns Promise<Category>
 */
export async function updateCategory(
  id: string,
  categoryData: { name: string; description: string }
): Promise<Category> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(categoryData),
    });

    const data = await handleResponse<{ success: boolean; data: Category }>(response);
    return data.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
}

/**
 * DELETE category
 * @param id - Category ID
 * @returns Promise<void>
 */
export async function deleteCategory(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    await handleResponse<{ success: boolean; message: string }>(response);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
}
