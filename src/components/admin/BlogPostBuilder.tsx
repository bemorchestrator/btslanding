import { useState } from 'react';
import { ArrowLeft, Trash2, Image as ImageIcon, Type, AlignLeft, Quote, Eye, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import type { Article, ArticleContent, Category } from '../../types/admin';

type BlogPostBuilderProps = {
  article: Article | null;
  categoryId: string;
  categories: Category[];
  onSave: (article: Article) => void;
  onCancel: () => void;
};

export function BlogPostBuilder({ article, categoryId, categories, onSave, onCancel }: BlogPostBuilderProps) {
  const [title, setTitle] = useState(article?.title || '');
  const [author, setAuthor] = useState(article?.author || '');
  const [status, setStatus] = useState<'draft' | 'published'>(article?.status || 'draft');
  const [selectedCategory, setSelectedCategory] = useState(article?.categoryId || categoryId);
  const [featuredImage, setFeaturedImage] = useState(article?.featuredImage || '');
  const [contentBlocks, setContentBlocks] = useState<ArticleContent[]>(
    article?.contentBlocks || [
      { type: 'paragraph', content: 'Start writing your article here...' }
    ]
  );

  const addBlock = (type: ArticleContent['type']) => {
    const newBlock: ArticleContent = {
      type,
      content: type === 'image' ? 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f' : '',
      style: {}
    };
    setContentBlocks([...contentBlocks, newBlock]);
  };

  const updateBlock = (index: number, content: string) => {
    const updated = [...contentBlocks];
    updated[index].content = content;
    setContentBlocks(updated);
  };

  const updateBlockStyle = (index: number, style: ArticleContent['style']) => {
    const updated = [...contentBlocks];
    updated[index].style = { ...updated[index].style, ...style };
    setContentBlocks(updated);
  };

  const deleteBlock = (index: number) => {
    setContentBlocks(contentBlocks.filter((_, i) => i !== index));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === contentBlocks.length - 1)
    ) {
      return;
    }
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...contentBlocks];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setContentBlocks(updated);
  };

  const handleSave = () => {
    const savedArticle: Article = {
      id: article?.id || Date.now().toString(),
      title,
      categoryId: selectedCategory,
      content: contentBlocks.map(block => block.content).join('\n'),
      contentBlocks,
      author,
      status,
      createdAt: article?.createdAt || new Date().toISOString().split('T')[0],
      featuredImage,
    };
    onSave(savedArticle);
  };

  const renderBlockEditor = (block: ArticleContent, index: number) => {
    switch (block.type) {
      case 'heading':
        return (
          <div className="space-y-2">
            <Input
              value={block.content}
              onChange={(e) => updateBlock(index, e.target.value)}
              placeholder="Enter heading text..."
              className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500 text-2xl"
            />
            <div className="flex gap-2">
              <Select
                value={block.style?.textAlign || 'left'}
                onValueChange={(value: 'left' | 'center' | 'right') => updateBlockStyle(index, { textAlign: value })}
              >
                <SelectTrigger className="bg-[#2a2a2a] border-[#3a3a3a] text-white w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a]">
                  <SelectItem value="left" className="text-white focus:bg-[#3a3a3a] focus:text-white">Left</SelectItem>
                  <SelectItem value="center" className="text-white focus:bg-[#3a3a3a] focus:text-white">Center</SelectItem>
                  <SelectItem value="right" className="text-white focus:bg-[#3a3a3a] focus:text-white">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 'paragraph':
        return (
          <Textarea
            value={block.content}
            onChange={(e) => updateBlock(index, e.target.value)}
            placeholder="Enter paragraph text..."
            className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500 min-h-[100px]"
          />
        );
      case 'image':
        return (
          <div className="space-y-2">
            <Input
              value={block.content}
              onChange={(e) => updateBlock(index, e.target.value)}
              placeholder="Enter image URL..."
              className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500"
            />
            {block.content && (
              <img
                src={block.content}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded"
              />
            )}
          </div>
        );
      case 'quote':
        return (
          <Textarea
            value={block.content}
            onChange={(e) => updateBlock(index, e.target.value)}
            placeholder="Enter quote text..."
            className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500 italic min-h-[80px]"
          />
        );
    }
  };

  const renderBlockPreview = (block: ArticleContent) => {
    const style: React.CSSProperties = {
      textAlign: block.style?.textAlign || 'left',
    };

    switch (block.type) {
      case 'heading':
        return (
          <h2 style={style} className="text-white text-3xl mb-4">
            {block.content || 'Heading'}
          </h2>
        );
      case 'paragraph':
        return (
          <p style={style} className="text-gray-300 mb-4">
            {block.content || 'Paragraph'}
          </p>
        );
      case 'image':
        return block.content ? (
          <img
            src={block.content}
            alt=""
            className="w-full max-h-96 object-cover rounded mb-4"
          />
        ) : (
          <div className="w-full h-48 bg-[#2a2a2a] rounded flex items-center justify-center mb-4">
            <ImageIcon className="text-gray-600" size={48} />
          </div>
        );
      case 'quote':
        return (
          <blockquote className="border-l-4 border-[#d4af37] pl-4 italic text-gray-300 mb-4">
            {block.content || 'Quote'}
          </blockquote>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Articles
          </Button>
          <h1 className="text-white text-3xl">
            {article ? 'Edit Article' : 'Create New Article'}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setStatus(status === 'draft' ? 'published' : 'draft')}
            className="border-[#3a3a3a] bg-transparent text-white hover:bg-[#2a2a2a] hover:text-white"
          >
            {status === 'draft' ? 'Save as Draft' : 'Published'}
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#d4af37] text-black hover:bg-[#c49d2f]"
          >
            <Save size={20} className="mr-2" />
            Save Article
          </Button>
        </div>
      </div>

      {/* Article Settings */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-6">
        <h2 className="text-white text-xl mb-4">Article Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title" className="text-gray-300 mb-2 block">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter article title..."
              className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500"
            />
          </div>
          <div>
            <Label htmlFor="author" className="text-gray-300 mb-2 block">Author</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name..."
              className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500"
            />
          </div>
          <div>
            <Label htmlFor="category" className="text-gray-300 mb-2 block">Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                <SelectValue />
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
          <div>
            <Label htmlFor="featured-image" className="text-gray-300 mb-2 block">Featured Image URL</Label>
            <Input
              id="featured-image"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="Enter image URL..."
              className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Content Builder */}
      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="bg-[#1a1a1a] border border-[#2a2a2a]">
          <TabsTrigger value="edit" className="text-gray-400 data-[state=active]:bg-[#d4af37] data-[state=active]:text-black">
            Edit
          </TabsTrigger>
          <TabsTrigger value="preview" className="text-gray-400 data-[state=active]:bg-[#d4af37] data-[state=active]:text-black">
            <Eye size={16} className="mr-2" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-4 mt-4">
          {/* Add Block Buttons */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-3">Add Content Block:</p>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => addBlock('heading')}
                variant="outline"
                className="border-[#3a3a3a] bg-transparent text-white hover:bg-[#2a2a2a] hover:text-white"
              >
                <Type size={16} className="mr-2" />
                Heading
              </Button>
              <Button
                onClick={() => addBlock('paragraph')}
                variant="outline"
                className="border-[#3a3a3a] bg-transparent text-white hover:bg-[#2a2a2a] hover:text-white"
              >
                <AlignLeft size={16} className="mr-2" />
                Paragraph
              </Button>
              <Button
                onClick={() => addBlock('image')}
                variant="outline"
                className="border-[#3a3a3a] bg-transparent text-white hover:bg-[#2a2a2a] hover:text-white"
              >
                <ImageIcon size={16} className="mr-2" />
                Image
              </Button>
              <Button
                onClick={() => addBlock('quote')}
                variant="outline"
                className="border-[#3a3a3a] bg-transparent text-white hover:bg-[#2a2a2a] hover:text-white"
              >
                <Quote size={16} className="mr-2" />
                Quote
              </Button>
            </div>
          </div>

          {/* Content Blocks */}
          {contentBlocks.map((block, index) => (
            <div key={index} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[#d4af37] text-sm uppercase">{block.type}</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => moveBlock(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-white disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveBlock(index, 'down')}
                    disabled={index === contentBlocks.length - 1}
                    className="p-1 text-gray-400 hover:text-white disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => deleteBlock(index)}
                    className="p-1 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {renderBlockEditor(block, index)}
            </div>
          ))}
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8">
            {featuredImage && (
              <img
                src={featuredImage}
                alt={title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            <h1 className="text-white text-4xl mb-2">{title || 'Untitled Article'}</h1>
            <p className="text-gray-400 mb-6">
              By {author || 'Unknown Author'} •{' '}
              {categories.find(c => c.id === selectedCategory)?.name || 'Uncategorized'}
            </p>
            <div className="prose prose-invert max-w-none">
              {contentBlocks.map((block, index) => (
                <div key={index}>{renderBlockPreview(block)}</div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
