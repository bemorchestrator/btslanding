import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import type { Category } from '../../types/admin';
import * as categoryService from '../../services/categoryService';

type CategoriesViewProps = {
  onCategoriesChange?: () => void;
};

export function CategoriesView({ onCategoriesChange }: CategoriesViewProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [submitting, setSubmitting] = useState(false);

  // Fetch categories function (for use in CRUD operations)
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories on mount only
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await categoryService.getCategories();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async () => {
    if (!formData.name || !formData.description) {
      setError('Name and description are required');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await categoryService.createCategory(formData);
      await fetchCategories();
      setIsCreateDialogOpen(false);
      setFormData({ name: '', description: '' });
      onCategoriesChange?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create category');
      console.error('Error creating category:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async () => {
    if (!selectedCategory || !formData.name || !formData.description) {
      setError('Name and description are required');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await categoryService.updateCategory(selectedCategory.id, formData);
      await fetchCategories();
      setIsEditDialogOpen(false);
      setFormData({ name: '', description: '' });
      setSelectedCategory(null);
      onCategoriesChange?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update category');
      console.error('Error updating category:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;

    try {
      setSubmitting(true);
      setError(null);
      await categoryService.deleteCategory(selectedCategory.id);
      await fetchCategories();
      setIsDeleteDialogOpen(false);
      setSelectedCategory(null);
      onCategoriesChange?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category');
      console.error('Error deleting category:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const openEditDialog = (category: Category) => {
    setSelectedCategory(category);
    setFormData({ name: category.name, description: category.description });
    setIsEditDialogOpen(true);
    setError(null);
  };

  const openDeleteDialog = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
    setError(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="pt-20 md:pt-0">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-8">
        <h1 className="text-white text-3xl">Categories</h1>
        {/* Desktop button - hidden on mobile */}
        <Button
          onClick={() => {
            setIsCreateDialogOpen(true);
            setError(null);
          }}
          variant="admin"
          className="hidden md:flex"
          disabled={loading}
        >
          <Plus size={20} className="mr-2" />
          Add Category
        </Button>
      </div>

      {/* Mobile FAB - hidden on desktop */}
      <button
        onClick={() => {
          setIsCreateDialogOpen(true);
          setError(null);
        }}
        disabled={loading}
        className="md:hidden fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl z-50 transition-colors"
        style={{
          position: 'fixed',
          backgroundColor: '#d4af37'
        }}
      >
        <Plus size={28} className="text-black font-bold" strokeWidth={3} />
      </button>

      {/* Error Banner */}
      {error && (
        <div className="mb-4 bg-red-900/20 border border-red-900/50 rounded p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-12 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="animate-spin h-8 w-8 text-[#d4af37] mx-auto mb-2" />
            <p className="text-gray-400">Loading categories...</p>
          </div>
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-12 text-center">
          <p className="text-gray-400 mb-4">No categories found. Create your first category to get started.</p>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-[#d4af37] text-black hover:bg-[#c49d2f]"
          >
            <Plus size={20} className="mr-2" />
            Add First Category
          </Button>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="max-md:hidden bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#2a2a2a]">
                <tr>
                  <th className="text-left text-gray-400 p-4">Name</th>
                  <th className="text-left text-gray-400 p-4">Description</th>
                  <th className="text-left text-gray-400 p-4">Created</th>
                  <th className="text-right text-gray-400 p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-t border-[#2a2a2a]">
                    <td className="text-white p-4">{category.name}</td>
                    <td className="text-gray-400 p-4">{category.description}</td>
                    <td className="text-gray-400 p-4">{formatDate(category.createdAt)}</td>
                    <td className="text-right p-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditDialog(category)}
                          className="p-2 text-gray-400 hover:text-[#d4af37] hover:bg-[#2a2a2a] rounded"
                          disabled={submitting}
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => openDeleteDialog(category)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-[#2a2a2a] rounded"
                          disabled={submitting}
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
            {categories.map((category) => (
              <div key={category.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-base mb-1">{category.name}</h3>
                    <p className="text-gray-400 text-sm">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#2a2a2a]">
                  <span className="text-gray-500 text-xs">{formatDate(category.createdAt)}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditDialog(category)}
                      className="p-2 text-gray-400 hover:text-[#d4af37] hover:bg-[#2a2a2a] rounded"
                      disabled={submitting}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => openDeleteDialog(category)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-[#2a2a2a] rounded"
                      disabled={submitting}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name" className="text-gray-300 mb-2 block">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500"
                placeholder="e.g., Classroom Management"
                disabled={submitting}
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-gray-300 mb-2 block">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500"
                placeholder="Describe this category..."
                disabled={submitting}
              />
            </div>
          </div>
          <DialogFooter className="flex-row gap-2">
            <Button
              variant="adminOutline"
              onClick={() => {
                setIsCreateDialogOpen(false);
                setFormData({ name: '', description: '' });
                setError(null);
              }}
              className="flex-1"
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              variant="admin"
              className="flex-1"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Creating...
                </>
              ) : (
                'Create'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="edit-name" className="text-gray-300 mb-2 block">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500"
                disabled={submitting}
              />
            </div>
            <div>
              <Label htmlFor="edit-description" className="text-gray-300 mb-2 block">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500"
                disabled={submitting}
              />
            </div>
          </div>
          <DialogFooter className="flex-row gap-2">
            <Button
              variant="adminOutline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setFormData({ name: '', description: '' });
                setSelectedCategory(null);
                setError(null);
              }}
              className="flex-1"
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEdit}
              variant="admin"
              className="flex-1"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
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
              This will permanently delete the category "{selectedCategory?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="border-[#3a3a3a] bg-transparent text-white hover:bg-[#2a2a2a] hover:text-white"
              disabled={submitting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-700"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
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
