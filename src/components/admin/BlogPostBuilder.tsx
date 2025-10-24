import { useState, useEffect } from 'react';
import { ArrowLeft, Loader2, ExternalLink, Eye, X, Trash2, EyeOff, Save, Upload, ChevronDown, ChevronUp } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { Article, Category, Author } from '../../types/admin';
import * as articleService from '../../services/articleService';
import { getAuthors } from '../../services/authorService';

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
  // SEO Meta Fields
  const [metaTitle, setMetaTitle] = useState(article?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(article?.metaDescription || '');
  const [focusKeyword, setFocusKeyword] = useState(article?.focusKeyword || '');
  const [customSlug, setCustomSlug] = useState(article?.slug || '');
  const [isEditingSlug, setIsEditingSlug] = useState(false);
  const [isSeoExpanded, setIsSeoExpanded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  // Author management
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isCustomAuthor, setIsCustomAuthor] = useState(false);
  const [customAuthorName, setCustomAuthorName] = useState('');

  // Fetch authors on mount
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const data = await getAuthors();
        setAuthors(data);

        // Check if current author is in the authors list
        if (author && data.length > 0) {
          const exists = data.some(a => a.name === author);
          if (!exists) {
            // Current author is custom
            setIsCustomAuthor(true);
            setCustomAuthorName(author);
          }
        }
      } catch (err) {
        console.error('Error fetching authors:', err);
      }
    };

    fetchAuthors();
  }, [author]);
  const [savedArticleSlug, setSavedArticleSlug] = useState<string | null>(article?.slug || null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [savingAs, setSavingAs] = useState<'draft' | 'published' | null>(null);

  // Track draft changes locally for immediate UI updates
  const [localHasDraftChanges, setLocalHasDraftChanges] = useState(
    !!(article?.draftTitle || article?.draftContent || article?.draftAuthor)
  );

  // Use local state if available, otherwise derive from props
  const hasDraftChanges = localHasDraftChanges;

  // Handle author selection change
  const handleAuthorChange = (value: string) => {
    if (value === 'custom') {
      setIsCustomAuthor(true);
      setAuthor(''); // Clear author, will use customAuthorName
    } else {
      setIsCustomAuthor(false);
      setCustomAuthorName('');
      const selectedAuthor = authors.find(a => a.id === value);
      if (selectedAuthor) {
        setAuthor(selectedAuthor.name);
      }
    }
  };

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
        author: isCustomAuthor ? customAuthorName : author,
        status: saveStatus,
        featuredImage,
        slug: customSlug.trim() || undefined,
        metaTitle: metaTitle.trim() || undefined,
        metaDescription: metaDescription.trim() || undefined,
        focusKeyword: focusKeyword.trim() || undefined,
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

      // Update local draft indicator state immediately
      if (isDraftSave) {
        setLocalHasDraftChanges(true); // Just saved a draft
      } else {
        setLocalHasDraftChanges(false); // Published/updated live, no more drafts
      }

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

        // Clear draft indicator immediately
        setLocalHasDraftChanges(false);

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
    <div className="h-screen bg-[#0a0a0a] flex flex-col overflow-hidden">
      {/* Back button and heading - Single row layout */}
      <div className="flex items-center justify-between p-4 md:p-6 mt-16 md:mt-0">
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={onCancel}
            disabled={isSaving}
            className="text-gray-400 hover:text-white flex items-center gap-2"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-white text-base md:text-xl font-medium">
            {article ? 'Edit Article' : 'Add New Article'}
          </h1>
          {article && hasDraftChanges && (
            <span className="hidden lg:inline px-2 py-1 bg-amber-900/30 border border-amber-900/50 text-amber-400 text-xs rounded">
              Draft Changes
            </span>
          )}
        </div>

        {/* Preview Buttons - Compact text on mobile, full text on desktop */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Preview Changes - Always available */}
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="text-gray-400 hover:text-white flex items-center gap-1.5 md:gap-2 text-xs md:text-sm"
          >
            <Eye size={14} className="md:w-4 md:h-4" />
            <span className="md:hidden">Preview</span>
            <span className="hidden md:inline">Preview Changes</span>
          </button>

          {/* Preview Live - Only if published */}
          {savedArticleSlug && status === 'published' && (
            <button
              onClick={handlePreview}
              className="text-gray-400 hover:text-white flex items-center gap-1.5 md:gap-2 text-xs md:text-sm"
            >
              <ExternalLink size={14} className="md:w-4 md:h-4" />
              <span className="md:hidden">Live</span>
              <span className="hidden md:inline">Preview Live</span>
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
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Editor */}
        <div className="flex-1 px-4 md:px-6 pb-6 overflow-y-auto pb-24 lg:pb-6">
          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add title"
            className="w-full bg-transparent border border-[#505050] text-white text-xl md:text-3xl font-bold placeholder:text-gray-600 focus:outline-none focus:border-2 focus:border-[#3a3a3a] px-3 py-2.5 md:px-4 md:py-5 mb-2 rounded-lg transition-all"
          />

          {/* WordPress-style Permalink (URL Slug) */}
          <div className="mb-4 md:mb-6">
            {!isEditingSlug ? (
              <div className="flex items-center gap-2 text-sm flex-wrap">
                <span className="text-gray-500">Permalink:</span>
                <span className="text-gray-400">http://localhost:3000/articles/</span>
                {customSlug ? (
                  <span className="text-blue-400 font-mono">{customSlug}</span>
                ) : (
                  <span className="text-gray-600 italic font-mono">
                    {title ? title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : 'auto-generated'}
                  </span>
                )}
                <button
                  onClick={() => setIsEditingSlug(true)}
                  className="text-blue-400 hover:text-blue-300 text-xs underline"
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm flex-wrap">
                <span className="text-gray-500">Permalink:</span>
                <span className="text-gray-400">http://localhost:3000/articles/</span>
                <Input
                  value={customSlug || (title ? title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : '')}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  onBlur={() => setIsEditingSlug(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === 'Escape') {
                      setIsEditingSlug(false);
                    }
                  }}
                  autoFocus
                  className="flex-1 min-w-[200px] bg-[#2a2a2a] border-[#3a3a3a] text-white text-sm font-mono h-7 px-2"
                />
                <button
                  onClick={() => setIsEditingSlug(false)}
                  className="text-green-400 hover:text-green-300 text-xs px-2 py-1 bg-green-400/10 rounded"
                >
                  OK
                </button>
                <button
                  onClick={() => {
                    setCustomSlug(article?.slug || '');
                    setIsEditingSlug(false);
                  }}
                  className="text-gray-400 hover:text-gray-300 text-xs underline"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Mobile-only fields - Author, Category, Featured Image */}
          <div className="lg:hidden space-y-4 mb-6">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Author</label>
              {isCustomAuthor ? (
                <div className="space-y-2">
                  <Input
                    value={customAuthorName}
                    onChange={(e) => setCustomAuthorName(e.target.value)}
                    placeholder="Guest author name"
                    className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500"
                  />
                  <button
                    onClick={() => {
                      setIsCustomAuthor(false);
                      setCustomAuthorName('');
                    }}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    Select from authors list
                  </button>
                </div>
              ) : (
                <Select value={authors.find(a => a.name === author)?.id || ''} onValueChange={handleAuthorChange}>
                  <SelectTrigger className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                    <SelectValue placeholder="Select author" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a]">
                    {authors.map((author) => (
                      <SelectItem key={author.id} value={author.id} className="text-white">
                        {author.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom" className="text-[#d4af37]">
                      + Custom (Guest Author)
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a]">
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      className="text-white focus:bg-[#3a3a3a] focus:text-white"
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Featured Image URL</label>
              <Input
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500"
              />
            </div>

            {/* SEO Settings for Mobile - Collapsible */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
              <button
                onClick={() => setIsSeoExpanded(!isSeoExpanded)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[#2a2a2a] transition-colors"
              >
                <div>
                  <h3 className="text-white text-sm font-semibold">SEO Settings</h3>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {metaTitle || metaDescription || focusKeyword
                      ? 'Configured'
                      : 'Optional: Customize search appearance'}
                  </p>
                </div>
                {isSeoExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {isSeoExpanded && (
                <div className="px-4 pb-4 space-y-4 border-t border-[#2a2a2a]">
                  <p className="text-gray-500 text-xs pt-4">Customize how this article appears in search results</p>

                  {/* Meta Title */}
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">
                      Meta Title
                      <span className="text-gray-600 ml-1">(optional)</span>
                    </label>
                    <Input
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder={`${title || 'Article title'} | Better Teaching Solutions`}
                      maxLength={70}
                      className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-600 text-sm"
                    />
                    <p className="text-gray-600 text-xs mt-1">
                      {metaTitle.length}/70 characters
                      {metaTitle.length === 0 && <span className="ml-2 text-gray-500">• Falls back to article title</span>}
                    </p>
                  </div>

                  {/* Meta Description */}
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">
                      Meta Description
                      <span className="text-gray-600 ml-1">(optional)</span>
                    </label>
                    <textarea
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder="Brief summary shown in search results..."
                      maxLength={160}
                      rows={3}
                      className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-md text-white placeholder:text-gray-600 text-sm px-3 py-2 resize-none"
                    />
                    <p className="text-gray-600 text-xs mt-1">
                      {metaDescription.length}/160 characters
                      {metaDescription.length === 0 && <span className="ml-2 text-gray-500">• Auto-generated from content</span>}
                    </p>
                  </div>

                  {/* Focus Keyword */}
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">
                      Focus Keyword
                      <span className="text-gray-600 ml-1">(optional)</span>
                    </label>
                    <Input
                      value={focusKeyword}
                      onChange={(e) => setFocusKeyword(e.target.value)}
                      placeholder="e.g., classroom management philippines"
                      maxLength={100}
                      className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-600 text-sm"
                    />
                    <p className="text-gray-600 text-xs mt-1">
                      Target search term for this article
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Rich Text Editor */}
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Start writing your article..."
          />
        </div>

        {/* Right Sidebar - WordPress Style - Hidden on mobile */}
        <div className="hidden lg:flex w-80 border-l border-[#2a2a2a] p-6 space-y-6 overflow-y-auto flex-shrink-0 flex-col">
          {/* Publish Section */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
            <h3 className="text-white text-sm font-semibold mb-4">Publish</h3>
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => handleSave(status, true)}
                disabled={isSaving}
                variant="outline"
                className="w-full border-[#3a3a3a] bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] hover:border-[#4a4a4a]"
              >
                {isSaving && savingAs === status ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Save Draft
                  </>
                )}
              </Button>
              <Button
                onClick={() => handleSave('published', false)}
                disabled={isSaving}
                variant="admin"
                className="w-full font-medium"
              >
                {savingAs === 'published' && isSaving ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    {status === 'published' ? 'Updating...' : 'Publishing...'}
                  </>
                ) : (
                  <>
                    <Upload size={16} className="mr-2" />
                    {status === 'published' ? 'Update Live' : 'Publish'}
                  </>
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
            {isCustomAuthor ? (
              <div className="space-y-2">
                <Input
                  value={customAuthorName}
                  onChange={(e) => setCustomAuthorName(e.target.value)}
                  placeholder="Guest author name"
                  className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500 text-sm"
                />
                <button
                  onClick={() => {
                    setIsCustomAuthor(false);
                    setCustomAuthorName('');
                  }}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  Select from authors list
                </button>
              </div>
            ) : (
              <Select value={authors.find(a => a.name === author)?.id || ''} onValueChange={handleAuthorChange}>
                <SelectTrigger className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                  <SelectValue placeholder="Select author" />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a]">
                  {authors.map((author) => (
                    <SelectItem key={author.id} value={author.id} className="text-white">
                      {author.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom" className="text-[#d4af37]">
                    + Custom (Guest Author)
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* SEO Settings */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
            <h3 className="text-white text-sm font-semibold mb-2">SEO Settings</h3>
            <p className="text-gray-500 text-xs mb-4">Optional: Customize how this article appears in search results</p>

            <div className="space-y-4">
              {/* Meta Title */}
              <div>
                <label className="text-gray-400 text-xs mb-1 block">
                  Meta Title
                  <span className="text-gray-600 ml-1">(optional)</span>
                </label>
                <Input
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder={`${title || 'Article title'} | Better Teaching Solutions`}
                  maxLength={70}
                  className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-600 text-sm"
                />
                <p className="text-gray-600 text-xs mt-1">
                  {metaTitle.length}/70 characters
                  {metaTitle.length === 0 && <span className="ml-2 text-gray-500">• Falls back to article title</span>}
                </p>
              </div>

              {/* Meta Description */}
              <div>
                <label className="text-gray-400 text-xs mb-1 block">
                  Meta Description
                  <span className="text-gray-600 ml-1">(optional)</span>
                </label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Brief summary shown in search results..."
                  maxLength={160}
                  rows={3}
                  className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-md text-white placeholder:text-gray-600 text-sm px-3 py-2 resize-none"
                />
                <p className="text-gray-600 text-xs mt-1">
                  {metaDescription.length}/160 characters
                  {metaDescription.length === 0 && <span className="ml-2 text-gray-500">• Auto-generated from content</span>}
                </p>
              </div>

              {/* Focus Keyword */}
              <div>
                <label className="text-gray-400 text-xs mb-1 block">
                  Focus Keyword
                  <span className="text-gray-600 ml-1">(optional)</span>
                </label>
                <Input
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  placeholder="e.g., classroom management philippines"
                  maxLength={100}
                  className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-600 text-sm"
                />
                <p className="text-gray-600 text-xs mt-1">
                  Target search term for this article
                </p>
              </div>
            </div>
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
                  className="w-full border-[#3a3a3a] bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] hover:border-[#4a4a4a] mb-2"
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
                  className="w-full border-[#3a3a3a] bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] hover:border-[#4a4a4a] mb-2"
                >
                  <EyeOff size={16} className="mr-2" />
                  Unpublish Article
                </Button>
              )}

              <Button
                onClick={handleDelete}
                disabled={isSaving}
                variant="outline"
                className="w-full border-red-900/50 bg-[#1a1a1a] text-red-400 hover:bg-red-900/30 hover:border-red-800"
              >
                <Trash2 size={16} className="mr-2" />
                Delete Article
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Floating Action Buttons - Only visible on mobile */}
      <div className="md:hidden fixed bottom-6 right-4 flex flex-col gap-3 z-30">
        <Button
          onClick={() => handleSave(status, true)}
          disabled={isSaving}
          className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] shadow-lg rounded-full w-14 h-14 p-0 flex items-center justify-center"
          title="Save Draft"
        >
          {isSaving && savingAs === status ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Save size={20} />
          )}
        </Button>
        <Button
          onClick={() => handleSave(status === 'draft' ? 'published' : status)}
          disabled={isSaving}
          variant="admin"
          className="shadow-lg rounded-full w-14 h-14 p-0 flex items-center justify-center"
          title={status === 'draft' ? 'Publish' : 'Update Live'}
        >
          {isSaving && savingAs !== status ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Upload size={20} />
          )}
        </Button>
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

            {/* Heading Styles */}
            <style>{`
              .preview-content h1 {
                font-size: 2.25rem;
                font-weight: 700;
                margin-top: 2rem;
                margin-bottom: 1rem;
                color: #ffffff;
                line-height: 1.2;
              }
              .preview-content h2 {
                font-size: 1.875rem;
                font-weight: 700;
                margin-top: 1.75rem;
                margin-bottom: 0.875rem;
                color: #ffffff;
                line-height: 1.3;
              }
              .preview-content h3 {
                font-size: 1.5rem;
                font-weight: 600;
                margin-top: 1.5rem;
                margin-bottom: 0.75rem;
                color: #ffffff;
                line-height: 1.4;
              }
              .preview-content h4 {
                font-size: 1.25rem;
                font-weight: 600;
                margin-top: 1.25rem;
                margin-bottom: 0.625rem;
                color: #f1f5f9;
                line-height: 1.4;
              }
              .preview-content h5 {
                font-size: 1.125rem;
                font-weight: 600;
                margin-top: 1rem;
                margin-bottom: 0.5rem;
                color: #f1f5f9;
                line-height: 1.5;
              }
              .preview-content h6 {
                font-size: 1rem;
                font-weight: 600;
                margin-top: 1rem;
                margin-bottom: 0.5rem;
                color: #cbd5e1;
                line-height: 1.5;
              }
            `}</style>

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
              <div className="prose prose-lg prose-invert max-w-none preview-content">
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
