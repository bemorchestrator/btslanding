import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { DashboardLayout } from './components/DashboardLayout';
import { CategoriesView } from './components/CategoriesView';
import { ArticlesView } from './components/ArticlesView';
import { DashboardOverview } from './components/DashboardOverview';
import { BlogPostBuilder } from './components/BlogPostBuilder';

export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

export type ArticleContent = {
  type: 'heading' | 'paragraph' | 'image' | 'quote';
  content: string;
  style?: {
    textAlign?: 'left' | 'center' | 'right';
    fontSize?: string;
    fontWeight?: string;
  };
};

export type Article = {
  id: string;
  title: string;
  categoryId: string;
  content: string;
  contentBlocks?: ArticleContent[];
  author: string;
  status: 'draft' | 'published';
  createdAt: string;
  featuredImage?: string;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'categories' | 'articles' | 'blog-builder'>('dashboard');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [selectedCategoryForNew, setSelectedCategoryForNew] = useState<string>('');
  
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Classroom Management',
      description: 'Tips and strategies for effective classroom management',
      createdAt: '2025-01-15',
    },
    {
      id: '2',
      name: 'Lesson Planning',
      description: 'Resources for creating engaging lesson plans',
      createdAt: '2025-01-20',
    },
    {
      id: '3',
      name: 'Student Engagement',
      description: 'Methods to increase student participation and interest',
      createdAt: '2025-02-01',
    },
  ]);

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

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout currentView={currentView} setCurrentView={setCurrentView}>
      {currentView === 'dashboard' && (
        <DashboardOverview 
          categoriesCount={categories.length}
          articlesCount={articles.length}
          publishedCount={articles.filter(a => a.status === 'published').length}
        />
      )}
      {currentView === 'categories' && (
        <CategoriesView
          categories={categories}
          setCategories={setCategories}
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
  );
}

export default App;
