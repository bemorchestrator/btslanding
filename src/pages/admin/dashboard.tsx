import { useState, useEffect, useCallback } from 'react';
import { ProtectedRoute } from '../../components/admin/ProtectedRoute';
import { DashboardLayout } from '../../components/admin/DashboardLayout';
import { DashboardOverview } from '../../components/admin/DashboardOverview';
import { CategoriesView } from '../../components/admin/CategoriesView';
import { ArticlesView } from '../../components/admin/ArticlesView';
import { BlogPostBuilder } from '../../components/admin/BlogPostBuilder';
import { useAuth } from '../../contexts/AuthContext';
import * as categoryService from '../../services/categoryService';
import * as articleService from '../../services/articleService';
import type { Category, Article } from '../../types/admin';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [currentView, setCurrentView] = useState<'dashboard' | 'categories' | 'articles' | 'blog-builder'>('dashboard');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [selectedCategoryForNew, setSelectedCategoryForNew] = useState<string>('');
  const [categoriesCount, setCategoriesCount] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [articlesCount, setArticlesCount] = useState<number>(0);
  const [publishedCount, setPublishedCount] = useState<number>(0);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  // Fetch categories on mount only
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(data);
        setCategoriesCount(data.length);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch articles on mount only
  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await articleService.getArticles();
        setArticlesCount(data.length);
        setPublishedCount(data.filter(article => article.status === 'published').length);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    loadArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoriesChange = useCallback(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(data);
        setCategoriesCount(data.length);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    loadCategories();
  }, []);

  const handleArticlesChange = useCallback(async () => {
    try {
      const data = await articleService.getArticles();
      setArticlesCount(data.length);
      setPublishedCount(data.filter(article => article.status === 'published').length);

      // If we're currently editing an article, update it with fresh data from the database
      // Use functional setState to access the latest editingArticle value
      setEditingArticle(currentEditingArticle => {
        if (currentEditingArticle?.id) {
          const updatedArticle = data.find(a => a.id === currentEditingArticle.id);
          if (updatedArticle) {
            return updatedArticle;
          }
        }
        return currentEditingArticle;
      });

      // Increment refresh trigger to notify ArticlesView to refetch
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }, []);

  const handleCreateArticle = (categoryId: string) => {
    setSelectedCategoryForNew(categoryId);
    setEditingArticle(null);
    setCurrentView('blog-builder');
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setCurrentView('blog-builder');
  };

  const handleCancelBuilder = () => {
    setCurrentView('articles');
    setEditingArticle(null);
    setSelectedCategoryForNew('');
    // Refresh articles after returning from builder
    handleArticlesChange();
  };

  return (
    <ProtectedRoute>
      <DashboardLayout currentView={currentView} setCurrentView={setCurrentView} onLogout={logout}>
        {currentView === 'dashboard' && (
          <DashboardOverview
            categoriesCount={categoriesCount}
            articlesCount={articlesCount}
            publishedCount={publishedCount}
          />
        )}
        {currentView === 'categories' && (
          <CategoriesView
            onCategoriesChange={handleCategoriesChange}
          />
        )}
        {currentView === 'articles' && (
          <ArticlesView
            categories={categories}
            onCreateArticle={handleCreateArticle}
            onEditArticle={handleEditArticle}
            onArticlesChange={handleArticlesChange}
            refreshTrigger={refreshTrigger}
          />
        )}
        {currentView === 'blog-builder' && (
          <BlogPostBuilder
            article={editingArticle}
            categoryId={selectedCategoryForNew}
            categories={categories}
            onCancel={handleCancelBuilder}
            onArticlesChange={handleArticlesChange}
          />
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
