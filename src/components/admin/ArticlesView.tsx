import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Eye, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import type { Article, Category } from '../../types/admin';
import * as articleService from '../../services/articleService';

type ArticlesViewProps = {
  categories: Category[];
  onCreateArticle: (categoryId: string) => void;
  onEditArticle: (article: Article) => void;
  onArticlesChange?: () => void;
  refreshTrigger?: number;
};

export function ArticlesView({ categories, onCreateArticle, onEditArticle, onArticlesChange, refreshTrigger }: ArticlesViewProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch articles function (for use in delete operation)
  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await articleService.getArticles();
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch articles on mount only
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await articleService.getArticles();
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch articles');
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refetch articles when refreshTrigger changes (e.g., after article updates)
  useEffect(() => {
    if (refreshTrigger !== undefined && refreshTrigger > 0) {
      fetchArticles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger]);

  const handleCategorySelect = () => {
    if (selectedCategory) {
      onCreateArticle(selectedCategory);
      setIsCategorySelectOpen(false);
      setSelectedCategory(undefined);
    }
  };

  const handleDelete = async () => {
    if (!selectedArticle) return;

    try {
      setIsDeleting(true);
      await articleService.deleteArticle(selectedArticle.id);
      await fetchArticles();
      onArticlesChange?.();
      setIsDeleteDialogOpen(false);
      setSelectedArticle(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete article');
      console.error('Error deleting article:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteDialog = (article: Article) => {
    setSelectedArticle(article);
    setIsDeleteDialogOpen(true);
  };

  const handlePreview = (article: Article) => {
    if (article.slug) {
      window.open(`/articles/${article.slug}`, '_blank');
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.name || 'Unknown';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-[#d4af37] animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-0">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-8">
        <h1 className="text-white text-3xl">Articles</h1>
        {/* Desktop button - hidden on mobile */}
        <Button
          onClick={() => setIsCategorySelectOpen(true)}
          variant="admin"
          className="hidden md:flex"
        >
          <Plus size={20} className="mr-2" />
          Add Article
        </Button>
      </div>

      {/* Mobile FAB - hidden on desktop */}
      <button
        onClick={() => setIsCategorySelectOpen(true)}
        className="md:hidden fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl z-50 transition-colors"
        style={{
          position: 'fixed',
          backgroundColor: '#d4af37'
        }}
      >
        <Plus size={28} className="text-black font-bold" strokeWidth={3} />
      </button>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/20 border border-red-900/50 text-red-400 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && articles.length === 0 && (
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-12 text-center">
          <h3 className="text-white text-xl mb-2">No Articles Yet</h3>
          <p className="text-gray-400 mb-6">Get started by creating your first article</p>
          <Button
            onClick={() => setIsCategorySelectOpen(true)}
            className="bg-[#d4af37] text-black hover:bg-[#c49d2f]"
          >
            <Plus size={20} className="mr-2" />
            Create First Article
          </Button>
        </div>
      )}

      {/* Articles Table/Cards */}
      {articles.length > 0 && (
        <>
          {/* Desktop Table View */}
          <div className="max-md:hidden bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#2a2a2a]">
                <tr>
                  <th className="text-left text-gray-400 p-4">Title</th>
                  <th className="text-left text-gray-400 p-4">Category</th>
                  <th className="text-left text-gray-400 p-4">Author</th>
                  <th className="text-left text-gray-400 p-4">Status</th>
                  <th className="text-left text-gray-400 p-4">Created</th>
                  <th className="text-right text-gray-400 p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-t border-[#2a2a2a]">
                    <td className="text-white p-4">{article.title}</td>
                    <td className="text-gray-400 p-4">{getCategoryName(article.categoryId)}</td>
                    <td className="text-gray-400 p-4">{article.author}</td>
                    <td className="p-4">
                      <Badge
                        variant={article.status === 'published' ? 'default' : 'secondary'}
                        className={
                          article.status === 'published'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-600 text-white'
                        }
                      >
                        {article.status}
                      </Badge>
                    </td>
                    <td className="text-gray-400 p-4">{formatDate(article.createdAt)}</td>
                    <td className="text-right p-4">
                      <div className="flex justify-end gap-2">
                        {article.slug && article.status === 'published' && (
                          <button
                            onClick={() => handlePreview(article)}
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-[#2a2a2a] rounded"
                            title="Preview article"
                          >
                            <Eye size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => onEditArticle(article)}
                          className="p-2 text-gray-400 hover:text-[#d4af37] hover:bg-[#2a2a2a] rounded"
                          title="Edit article"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => openDeleteDialog(article)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-[#2a2a2a] rounded"
                          title="Delete article"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3 block">
            {articles.map((article) => (
              <div key={article.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-base mb-1">{article.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-400 text-sm">{getCategoryName(article.categoryId)}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-400 text-sm">{article.author}</span>
                    </div>
                    <Badge
                      variant={article.status === 'published' ? 'default' : 'secondary'}
                      className={
                        article.status === 'published'
                          ? 'bg-green-600 text-white text-xs'
                          : 'bg-gray-600 text-white text-xs'
                      }
                    >
                      {article.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#2a2a2a]">
                  <div className="flex gap-2">
                    {article.slug && article.status === 'published' && (
                      <button
                        onClick={() => handlePreview(article)}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-[#2a2a2a] rounded"
                      >
                        <Eye size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => onEditArticle(article)}
                      className="p-2 text-gray-400 hover:text-[#d4af37] hover:bg-[#2a2a2a] rounded"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => openDeleteDialog(article)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-[#2a2a2a] rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <span className="text-gray-500 text-xs">{formatDate(article.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Category Selection Dialog */}
      <Dialog open={isCategorySelectOpen} onOpenChange={setIsCategorySelectOpen}>
        <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
          <DialogHeader>
            <DialogTitle>Select Category for New Article</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="category" className="text-gray-300 mb-2 block">Which category will this article belong to?</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a]">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id} className="text-white focus:bg-[#3a3a3a] focus:text-white">
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex-row gap-2">
            <Button
              variant="adminOutline"
              onClick={() => {
                setIsCategorySelectOpen(false);
                setSelectedCategory(undefined);
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCategorySelect}
              disabled={!selectedCategory}
              variant="admin"
              className="flex-1"
            >
              Continue to Builder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This will permanently delete the article "{selectedArticle?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-2">
            <AlertDialogCancel
              className="flex-1 border-[#3a3a3a] bg-transparent text-white hover:bg-[#2a2a2a] hover:text-white"
              disabled={isDeleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
