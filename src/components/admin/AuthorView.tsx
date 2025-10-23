import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Mail, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from '../../services/authorService';
import type { Author } from '../../types/admin';

export function AuthorView() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    profilePicture: '',
    bio: '',
    email: '',
    twitter: '',
    linkedin: '',
    facebook: '',
    website: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch authors on mount
  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const data = await getAuthors();
      setAuthors(data);
    } catch (err) {
      console.error('Error fetching authors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAuthor = () => {
    setEditingAuthor(null);
    setIsCreateDialogOpen(true);
    setFormData({
      name: '',
      profilePicture: '',
      bio: '',
      email: '',
      twitter: '',
      linkedin: '',
      facebook: '',
      website: '',
    });
    setError(null);
  };

  const handleEditAuthor = (author: Author) => {
    setEditingAuthor(author);
    setIsCreateDialogOpen(true);
    setFormData({
      name: author.name,
      profilePicture: author.profilePicture,
      bio: author.bio,
      email: author.email || '',
      twitter: author.social?.twitter || '',
      linkedin: author.social?.linkedin || '',
      facebook: author.social?.facebook || '',
      website: author.social?.website || '',
    });
    setError(null);
  };

  const handleDeleteAuthor = async (id: string) => {
    if (!confirm('Are you sure you want to delete this author?')) {
      return;
    }

    try {
      await deleteAuthor(id);
      await fetchAuthors();
    } catch (err) {
      console.error('Error deleting author:', err);
      alert('Failed to delete author');
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.name.trim()) {
      setError('Author name is required');
      return;
    }
    if (!formData.profilePicture.trim()) {
      setError('Profile picture URL is required');
      return;
    }
    if (!formData.bio.trim()) {
      setError('Bio is required');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Create author payload
      const authorPayload = {
        name: formData.name.trim(),
        profilePicture: formData.profilePicture.trim(),
        bio: formData.bio.trim(),
        ...(formData.email?.trim() && { email: formData.email.trim() }),
        social: {
          ...(formData.twitter?.trim() && { twitter: formData.twitter.trim() }),
          ...(formData.linkedin?.trim() && { linkedin: formData.linkedin.trim() }),
          ...(formData.facebook?.trim() && { facebook: formData.facebook.trim() }),
          ...(formData.website?.trim() && { website: formData.website.trim() }),
        },
      };

      if (editingAuthor) {
        // Update existing author
        await updateAuthor(editingAuthor.id, authorPayload);
      } else {
        // Create new author
        await createAuthor(authorPayload);
      }

      // Refresh authors list
      await fetchAuthors();

      // Close dialog on success
      setIsCreateDialogOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create author');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Authors</h1>
          <p className="text-gray-400 mt-1">Manage author profiles and bios</p>
        </div>

        {/* Desktop Button - hidden on mobile */}
        <Button
          onClick={handleAddAuthor}
          variant="admin"
          className="hidden md:flex"
        >
          <Plus size={20} className="mr-2" />
          Add Author
        </Button>
      </div>

      {/* Mobile FAB - hidden on desktop */}
      <button
        onClick={handleAddAuthor}
        className="md:hidden fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl z-50 transition-colors"
        style={{
          position: 'fixed',
          backgroundColor: '#d4af37'
        }}
      >
        <Plus size={28} className="text-black font-bold" strokeWidth={3} />
      </button>

      {/* Authors List */}
      {loading ? (
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8">
          <p className="text-gray-400 text-center">Loading authors...</p>
        </div>
      ) : authors.length === 0 ? (
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8">
          <p className="text-gray-400 text-center">No authors yet. Click "Add Author" to create one.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <div
              key={author.id}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden hover:border-[#d4af37] transition-all duration-200 flex flex-col"
            >
              {/* TOP: Profile Picture & Name - Horizontal Layout */}
              <div className="p-5 flex items-center gap-4 border-b border-[#2a2a2a]">
                <img
                  src={author.profilePicture}
                  alt={author.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#2a2a2a] flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64?text=?';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white mb-1 truncate">{author.name}</h3>
                  {author.email && (
                    <a
                      href={`mailto:${author.email}`}
                      className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-[#d4af37] transition-colors"
                    >
                      <Mail size={12} />
                      <span className="truncate">{author.email}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* MIDDLE: Bio */}
              <div className="p-5 flex-1">
                <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                  {author.bio}
                </p>
              </div>

              {/* BOTTOM: Social Links */}
              {(author.social?.twitter || author.social?.linkedin || author.social?.facebook || author.social?.website) && (
                <div className="px-5 pb-5">
                  <div className="flex items-center gap-2 flex-wrap">
                    {author.social?.twitter && (
                      <a
                        href={author.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 text-xs font-medium text-gray-400 bg-[#2a2a2a] rounded hover:bg-[#d4af37] hover:text-black transition-all"
                      >
                        Twitter
                      </a>
                    )}
                    {author.social?.linkedin && (
                      <a
                        href={author.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 text-xs font-medium text-gray-400 bg-[#2a2a2a] rounded hover:bg-[#d4af37] hover:text-black transition-all"
                      >
                        LinkedIn
                      </a>
                    )}
                    {author.social?.facebook && (
                      <a
                        href={author.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 text-xs font-medium text-gray-400 bg-[#2a2a2a] rounded hover:bg-[#d4af37] hover:text-black transition-all"
                      >
                        Facebook
                      </a>
                    )}
                    {author.social?.website && (
                      <a
                        href={author.social.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 text-xs font-medium text-gray-400 bg-[#2a2a2a] rounded hover:bg-[#d4af37] hover:text-black transition-all inline-flex items-center gap-1"
                      >
                        <Globe size={11} />
                        Website
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* FOOTER: Actions */}
              <div className="mt-auto border-t border-[#2a2a2a] bg-[#0f0f0f]">
                <div className="flex divide-x divide-[#2a2a2a]">
                  <button
                    onClick={() => handleEditAuthor(author)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-[#d4af37]/10 transition-all"
                  >
                    <Edit size={16} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteAuthor(author.id)}
                    className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Author Modal */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingAuthor ? 'Edit Author' : 'Add New Author'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {error && (
              <div className="bg-red-900/20 border border-red-900/50 rounded p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., John Doe"
                className="bg-[#2a2a2a] border-[#3a3a3a] text-white"
              />
            </div>

            {/* Profile Picture URL */}
            <div className="space-y-2">
              <Label htmlFor="profilePicture" className="text-gray-300">
                Profile Picture URL <span className="text-red-500">*</span>
              </Label>
              <Input
                id="profilePicture"
                value={formData.profilePicture}
                onChange={(e) => setFormData({ ...formData, profilePicture: e.target.value })}
                placeholder="https://example.com/profile.jpg"
                className="bg-[#2a2a2a] border-[#3a3a3a] text-white"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-gray-300">
                Bio <span className="text-red-500">*</span>
                <span className="text-gray-500 text-xs ml-2">
                  {formData.bio.length}/500 characters
                </span>
              </Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value.slice(0, 500) })}
                placeholder="Write a short bio about the author..."
                rows={4}
                maxLength={500}
                className="bg-[#2a2a2a] border-[#3a3a3a] text-white resize-none"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email <span className="text-gray-500">(optional)</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="author@example.com"
                className="bg-[#2a2a2a] border-[#3a3a3a] text-white"
              />
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <Label className="text-gray-300">
                Social Links <span className="text-gray-500">(optional)</span>
              </Label>

              {/* Twitter */}
              <div className="space-y-1">
                <Label htmlFor="twitter" className="text-gray-400 text-xs">
                  Twitter/X
                </Label>
                <Input
                  id="twitter"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  placeholder="https://twitter.com/username"
                  className="bg-[#2a2a2a] border-[#3a3a3a] text-white"
                />
              </div>

              {/* LinkedIn */}
              <div className="space-y-1">
                <Label htmlFor="linkedin" className="text-gray-400 text-xs">
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                  className="bg-[#2a2a2a] border-[#3a3a3a] text-white"
                />
              </div>

              {/* Facebook */}
              <div className="space-y-1">
                <Label htmlFor="facebook" className="text-gray-400 text-xs">
                  Facebook
                </Label>
                <Input
                  id="facebook"
                  value={formData.facebook}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                  placeholder="https://facebook.com/username"
                  className="bg-[#2a2a2a] border-[#3a3a3a] text-white"
                />
              </div>

              {/* Website */}
              <div className="space-y-1">
                <Label htmlFor="website" className="text-gray-400 text-xs">
                  Website
                </Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://yourwebsite.com"
                  className="bg-[#2a2a2a] border-[#3a3a3a] text-white"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
              disabled={submitting}
              className="border-[#3a3a3a] text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-[#d4af37] hover:bg-[#c09d2f] text-black"
            >
              {submitting
                ? (editingAuthor ? 'Updating...' : 'Creating...')
                : (editingAuthor ? 'Update Author' : 'Create Author')
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
