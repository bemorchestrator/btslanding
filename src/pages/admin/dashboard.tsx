import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../../components/admin/ProtectedRoute';
import { DashboardLayout } from '../../components/admin/DashboardLayout';
import { DashboardOverview } from '../../components/admin/DashboardOverview';
import { CategoriesView } from '../../components/admin/CategoriesView';
import { ArticlesView } from '../../components/admin/ArticlesView';
import { BlogPostBuilder } from '../../components/admin/BlogPostBuilder';
import { useAuth } from '../../contexts/AuthContext';
import * as categoryService from '../../services/categoryService';
import type { Category, Article } from '../../types/admin';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [currentView, setCurrentView] = useState<'dashboard' | 'categories' | 'articles' | 'blog-builder'>('dashboard');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [selectedCategoryForNew, setSelectedCategoryForNew] = useState<string>('');
  const [categoriesCount, setCategoriesCount] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories on mount (needed for dropdowns in ArticlesView and BlogPostBuilder)
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
      setCategoriesCount(data.length);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoriesChange = () => {
    fetchCategories();
  };

  const [articles, setArticles] = useState<Article[]>([
    {
      id: '1',
      title: 'Building Positive Classroom Culture',
      categoryId: '1',
      content: 'Creating a positive classroom environment starts with setting clear expectations...',
      author: 'Sarah Johnson',
      status: 'published',
      createdAt: '2025-02-10',
    },
    {
      id: '2',
      title: '5 Tips for Effective Lesson Planning',
      categoryId: '2',
      content: 'Efficient lesson planning can save hours of work each week...',
      author: 'Michael Chen',
      status: 'published',
      createdAt: '2025-02-12',
    },
    {
      id: '3',
      title: 'Interactive Activities for Math Class',
      categoryId: '3',
      content: 'Students learn best when they are actively engaged in the material...',
      author: 'Emily Rodriguez',
      status: 'draft',
      createdAt: '2025-02-14',
    },
  ]);

  const handleCreateArticle = (categoryId: string) => {
    setSelectedCategoryForNew(categoryId);
    setEditingArticle(null);
    setCurrentView('blog-builder');
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setCurrentView('blog-builder');
  };

  const handleSaveArticle = (article: Article) => {
    if (editingArticle) {
      // Update existing article
      setArticles(articles.map(a => a.id === article.id ? article : a));
    } else {
      // Create new article
      setArticles([...articles, article]);
    }
    setCurrentView('articles');
    setEditingArticle(null);
    setSelectedCategoryForNew('');
  };

  const handleCancelBuilder = () => {
    setCurrentView('articles');
    setEditingArticle(null);
    setSelectedCategoryForNew('');
  };

  return (
    <ProtectedRoute>
      <DashboardLayout currentView={currentView} setCurrentView={setCurrentView} onLogout={logout}>
        {currentView === 'dashboard' && (
          <DashboardOverview
            categoriesCount={categoriesCount}
            articlesCount={articles.length}
            publishedCount={articles.filter(a => a.status === 'published').length}
          />
        )}
        {currentView === 'categories' && (
          <CategoriesView
            onCategoriesChange={handleCategoriesChange}
          />
        )}
        {currentView === 'articles' && (
          <ArticlesView
            articles={articles}
            setArticles={setArticles}
            categories={categories}
            onCreateArticle={handleCreateArticle}
            onEditArticle={handleEditArticle}
          />
        )}
        {currentView === 'blog-builder' && (
          <BlogPostBuilder
            article={editingArticle}
            categoryId={selectedCategoryForNew}
            categories={categories}
            onSave={handleSaveArticle}
            onCancel={handleCancelBuilder}
          />
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
