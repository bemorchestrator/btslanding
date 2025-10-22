import { useState } from 'react';
import { ArrowLeft, Loader2, ExternalLink, Eye, X, Trash2, EyeOff } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { Article, Category } from '../../types/admin';
import * as articleService from '../../services/articleService';

type BlogPostBuilderProps = {
  article: Article | null;
  categoryId: string;
  categories: Category[];
  onCancel: () => void;
  onArticlesChange?: () => void;
};

export function BlogPostBuilder({ article, categoryId, categories, onCancel, onArticlesChange }: BlogPostBuilderProps) {
  // When editing existing article, load draft version if it exists, otherwise load published version
  const [title, setTitle] = useState(article?.draftTitle || article?.title || '');
  const [author, setAuthor] = useState(article?.draftAuthor || article?.author || '');
  const [status, setStatus] = useState<'draft' | 'published'>(article?.status || 'draft');
  const [selectedCategory, setSelectedCategory] = useState(article?.draftCategoryId || article?.categoryId || categoryId);
  const [featuredImage, setFeaturedImage] = useState(article?.draftFeaturedImage || article?.featuredImage || '');
  const [content, setContent] = useState(article?.draftContent || article?.content || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [savedArticleSlug, setSavedArticleSlug] = useState<string | null>(article?.slug || null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [savingAs, setSavingAs] = useState<'draft' | 'published' | null>(null);

  // Check if there are draft changes (derived from props, not local state)
  const hasDraftChanges = !!(article?.draftTitle || article?.draftContent || article?.draftAuthor);

  const handleSave = async (saveStatus: 'draft' | 'published', isDraftSave: boolean = false) => {
    try {
      setIsSaving(true);
      setSavingAs(saveStatus);
      setError(null);
      setSuccess(null);

      // Validate required fields
      if (!title.trim()) {
        setError('Title is required');
        return;
      }
      if (!author.trim()) {
        setError('Author is required');
        return;
      }

      // Strip HTML tags to check if content is empty
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';

      if (!textContent.trim()) {
        setError('Article content is required');
        return;
      }

      const articleData = {
        title,
        categoryId: selectedCategory,
        content,
        author,
        status: saveStatus,
        featuredImage,
        saveDraft: isDraftSave, // Tell backend whether to save as draft only
      };

      let savedArticle: Article;
      if (article?.id) {
        // Update existing article
        savedArticle = await articleService.updateArticle(article.id, articleData);
      } else {
        // Create new article
        savedArticle = await articleService.createArticle(articleData);
      }

      setStatus(saveStatus);
      setSavedArticleSlug(savedArticle.slug || null);

      // Refresh articles to update the article prop with latest data
      onArticlesChange?.();

      // Show success message
      let successMsg = '';
      if (isDraftSave) {
        // User clicked "Save Draft"
        successMsg = 'Draft saved successfully';
      } else {
        // User clicked "Update Live" or "Publish"
        successMsg = status === 'published' ? 'Article updated and live' : 'Article published successfully';
      }
      setSuccess(successMsg);

      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);

      // If draft, redirect back to articles list after showing success
      if (saveStatus === 'draft' && !article) {
        setTimeout(() => {
          onCancel();
        }, 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save article');
      console.error('Error saving article:', err);
    } finally {
      setIsSaving(false);
      setSavingAs(null);
    }
  };

  const handlePreview = () => {
    if (savedArticleSlug && status === 'published') {
      window.open(`/articles/${savedArticleSlug}`, '_blank');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryName = () => {
    const category = categories.find(cat => cat.id === selectedCategory);
    return category?.name || 'Article';
  };

  const handleDelete = async () => {
    if (!article?.id) return;

    if (window.confirm('Are you sure you want to delete this article? This cannot be undone.')) {
      try {
        setIsSaving(true);
        await articleService.deleteArticle(article.id);
        onArticlesChange?.();
        onCancel(); // Go back to articles list
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete article');
        console.error('Error deleting article:', err);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleDiscardChanges = async () => {
    if (window.confirm('Discard all draft changes? This will revert to the published version and clear your drafts.')) {
      if (!article?.id) return;

      try {
        setIsSaving(true);
        // Clear draft fields by setting them to null
        // We need to use null instead of undefined because undefined gets stripped during JSON.stringify
        await articleService.updateArticle(article.id, {
          title: article.title,
          categoryId: article.categoryId,
          content: article.content,
          author: article.author,
          status: article.status,
          featuredImage: article.featuredImage,
          draftTitle: null,
          draftCategoryId: null,
          draftContent: null,
          draftAuthor: null,
          draftFeaturedImage: null,
        });

        // Reset local state to published values
        setTitle(article.title);
        setAuthor(article.author);
        setSelectedCategory(article.categoryId);
        setFeaturedImage(article.featuredImage || '');
        setContent(article.content || '');

        setSuccess('Draft changes discarded. Reverted to published version.');
        setTimeout(() => setSuccess(null), 3000);

        // Refresh the articles list to update the article data
        onArticlesChange?.();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to discard changes');
        console.error('Error discarding changes:', err);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Back button and heading - Very top left, no padding */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onCancel}
            disabled={isSaving}
            className="text-gray-400 hover:text-white flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <h1 className="text-white text-xl font-medium">
            {article ? 'Edit Article' : 'Add New Article'}
          </h1>
          {article && hasDraftChanges && (
            <span className="px-2 py-1 bg-amber-900/30 border border-amber-900/50 text-amber-400 text-xs rounded">
              Draft Changes
            </span>
          )}
        </div>

        {/* Preview Buttons */}
        <div className="flex items-center gap-3">
          {/* Preview Changes - Always available */}
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="text-gray-400 hover:text-white flex items-center gap-2 text-sm"
          >
            <Eye size={16} />
            Preview Changes
          </button>

          {/* Preview Live - Only if published */}
          {savedArticleSlug && status === 'published' && (
            <button
              onClick={handlePreview}
              className="text-gray-400 hover:text-white flex items-center gap-2 text-sm"
            >
              <ExternalLink size={16} />
              Preview Live
            </button>
          )}
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mx-6 mb-4 bg-green-900/20 border border-green-900/50 text-green-400 px-4 py-3 rounded-lg text-sm">
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mx-6 mb-4 bg-red-900/20 border border-red-900/50 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Main Content - Two Column Layout */}
      <div className="flex-1 flex">
        {/* Left Side - Editor */}
        <div className="flex-1 px-6 pb-6">
          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add title"
            className="w-full bg-transparent border border-[#505050] text-white text-3xl font-bold placeholder:text-gray-600 focus:outline-none focus:border-2 focus:border-[#3a3a3a] px-4 py-5 mb-6 rounded-lg transition-all"
          />

          {/* Rich Text Editor */}
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Start writing your article..."
          />
        </div>

        {/* Right Sidebar - WordPress Style */}
        <div className="w-80 border-l border-[#2a2a2a] p-6 space-y-6">
          {/* Publish Section */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
            <h3 className="text-white text-sm font-semibold mb-4">Publish</h3>
            <div className="flex gap-2">
              <Button
                onClick={() => handleSave(status, true)}
                disabled={isSaving}
                variant="outline"
                className="flex-1 border-[#3a3a3a] bg-transparent text-white hover:bg-[#2a2a2a]"
              >
                {isSaving && savingAs === status ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Draft'
                )}
              </Button>
              <Button
                onClick={() => handleSave('published', false)}
                disabled={isSaving}
                className="flex-1 bg-[#d4af37] text-black hover:bg-[#c49d2f]"
              >
                {savingAs === 'published' && isSaving ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    {status === 'published' ? 'Updating...' : 'Publishing...'}
                  </>
                ) : (
                  status === 'published' ? 'Update Live' : 'Publish'
                )}
              </Button>
            </div>
            <div className="mt-4 pt-4 border-t border-[#2a2a2a]">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Status:</span>
                <span className="text-white">{status === 'draft' ? 'Draft' : 'Published'}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-400">Visibility:</span>
                <span className="text-white">Public</span>
              </div>
              {article && hasDraftChanges && (
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-400">Draft Changes:</span>
                  <span className="text-amber-400 text-xs">Unpublished edits</span>
                </div>
              )}
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
            <h3 className="text-white text-sm font-semibold mb-4">Featured Image</h3>
            <Input
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="Image URL"
              className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500 text-sm"
            />
            {featuredImage && (
              <div className="mt-3">
                <img
                  src={featuredImage}
                  alt="Featured"
                  className="w-full h-32 object-cover rounded border border-[#3a3a3a]"
                />
              </div>
            )}
          </div>

          {/* Category */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
            <h3 className="text-white text-sm font-semibold mb-4">Category</h3>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-[#2a2a2a] border-[#3a3a3a] text-white text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a]">
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    className="text-white focus:bg-[#3a3a3a] focus:text-white text-sm"
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Author */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
            <h3 className="text-white text-sm font-semibold mb-4">Author</h3>
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author name"
              className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500 text-sm"
            />
          </div>

          {/* Article Actions - Only for existing articles */}
          {article && (
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
              <h3 className="text-white text-sm font-semibold mb-3">Article Actions</h3>

              {hasDraftChanges && (
                <Button
                  onClick={handleDiscardChanges}
                  disabled={isSaving}
                  variant="outline"
                  className="w-full border-[#3a3a3a] bg-transparent text-white hover:bg-[#2a2a2a] mb-2"
                >
                  <X size={16} className="mr-2" />
                  Discard Changes
                </Button>
              )}

              {status === 'published' && (
                <Button
                  onClick={() => handleSave('draft')}
                  disabled={isSaving}
                  variant="outline"
                  className="w-full border-[#3a3a3a] bg-transparent text-white hover:bg-[#2a2a2a] mb-2"
                >
                  <EyeOff size={16} className="mr-2" />
                  Unpublish Article
                </Button>
              )}

              <Button
                onClick={handleDelete}
                disabled={isSaving}
                variant="outline"
                className="w-full border-red-900/50 bg-transparent text-red-400 hover:bg-red-900/20 hover:border-red-900"
              >
                <Trash2 size={16} className="mr-2" />
                Delete Article
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 overflow-y-auto py-8">
          <div className="relative w-full max-w-5xl bg-[#0a0a0a] rounded-lg shadow-2xl mx-4">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-[#1a1a1a] border-b border-[#2a2a2a] px-6 py-4 flex items-center justify-between rounded-t-lg">
              <h2 className="text-white text-xl font-semibold">Article Preview</h2>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Preview Content - Styled like article-preview page */}
            <div className="p-8">
              {/* Header Section */}
              <div className="mb-8 pb-8 border-b border-[#2a2a2a]">
                <span className="bg-amber-400 text-white text-xs font-semibold px-2.5 py-1 rounded inline-block">
                  {getCategoryName()}
                </span>
                <h1 className="text-4xl font-bold text-white mt-4 mb-4">
                  {title || 'Untitled Article'}
                </h1>
                <div className="flex items-center text-slate-400 text-sm">
                  <span className="font-medium text-white mr-2">{author || 'Author Name'}</span>
                  <span>•</span>
                  <span className="ml-2">{formatDate(article?.createdAt || new Date().toISOString())}</span>
                </div>
              </div>

              {/* Featured Image */}
              {featuredImage && (
                <img
                  src={featuredImage}
                  alt={title}
                  className="w-full rounded-lg mb-8"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              )}

              {/* Article Content */}
              <div className="prose prose-lg prose-invert max-w-none">
                {content ? (
                  <div
                    className="text-slate-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                ) : (
                  <p className="text-slate-500 italic">No content yet. Start writing to see your article preview.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
