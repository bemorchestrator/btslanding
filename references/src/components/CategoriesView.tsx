import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import type { Category } from '../App';

type CategoriesViewProps = {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
};

export function CategoriesView({ categories, setCategories }: CategoriesViewProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleCreate = () => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCategories([...categories, newCategory]);
    setIsCreateDialogOpen(false);
    setFormData({ name: '', description: '' });
  };

  const handleEdit = () => {
    if (!selectedCategory) return;
    setCategories(
      categories.map((cat) =>
        cat.id === selectedCategory.id
          ? { ...cat, name: formData.name, description: formData.description }
          : cat
      )
    );
    setIsEditDialogOpen(false);
    setFormData({ name: '', description: '' });
    setSelectedCategory(null);
  };

  const handleDelete = () => {
    if (!selectedCategory) return;
    setCategories(categories.filter((cat) => cat.id !== selectedCategory.id));
    setIsDeleteDialogOpen(false);
    setSelectedCategory(null);
  };

  const openEditDialog = (category: Category) => {
    setSelectedCategory(category);
    setFormData({ name: category.name, description: category.description });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-3xl">Categories</h1>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-[#d4af37] text-black hover:bg-[#c49d2f]"
        >
          <Plus size={20} className="mr-2" />
          Add Category
        </Button>
      </div>

      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
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
                <td className="text-gray-400 p-4">{category.createdAt}</td>
                <td className="text-right p-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEditDialog(category)}
                      className="p-2 text-gray-400 hover:text-[#d4af37] hover:bg-[#2a2a2a] rounded"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => openDeleteDialog(category)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-[#2a2a2a] rounded"
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
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-gray-300 mb-2 block">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
              className="border-[#3a3a3a] bg-transparent text-white hover:bg-[#2a2a2a] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              className="bg-[#d4af37] text-black hover:bg-[#c49d2f]"
            >
              Create
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
              />
            </div>
            <div>
              <Label htmlFor="edit-description" className="text-gray-300 mb-2 block">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-[#3a3a3a] bg-transparent text-white hover:bg-[#2a2a2a] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEdit}
              className="bg-[#d4af37] text-black hover:bg-[#c49d2f]"
            >
              Save Changes
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
            <AlertDialogCancel className="border-[#3a3a3a] bg-transparent text-white hover:bg-[#2a2a2a] hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
