import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { getPublishedArticleBySlug, getPublicCategories } from '../services/publicArticleService';
import type { Article, ArticleContent, Category } from '../types/admin';

export default function ArticlePreview(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');

    const fetchData = async (articleSlug: string) => {
      try {
        setLoading(true);
        setError(null);
        const [articleData, categoriesData] = await Promise.all([
          getPublishedArticleBySlug(articleSlug),
          getPublicCategories()
        ]);
        setArticle(articleData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Article not found');
        console.error('Error fetching article:', err);
        // Redirect to homepage after a moment
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData(slug);
    } else {
      navigate('/');
    }
  }, [slug, navigate]);

  const renderContentBlock = (block: ArticleContent, index: number) => {
    const style: React.CSSProperties = {
      textAlign: block.style?.textAlign || 'left',
    };

    switch (block.type) {
      case 'heading':
        return (
          <h2 key={index} style={style} className="text-3xl font-semibold md:tracking-normal tracking-normal md:leading-normal leading-normal mt-6 mb-4">
            {block.content}
          </h2>
        );
      case 'paragraph':
        return (
          <p key={index} style={style} className="text-slate-400 text-lg mt-4 leading-relaxed">
            {block.content}
          </p>
        );
      case 'image':
        return block.content ? (
          <img
            key={index}
            src={block.content}
            alt=""
            className="rounded-md w-full my-6"
          />
        ) : null;
      case 'quote':
        return (
          <div key={index} className="relative rounded-md border-s-4 border-amber-400 px-6 py-8 my-6 bg-gray-50 dark:bg-slate-800">
            <p className="text-2xl font-medium italic">{block.content}</p>
            <div className="absolute text-8xl -top-0 start-4 text-amber-500/10 dark:text-amber-500/20 -z-1">
              <i className="mdi mdi-format-quote-open"></i>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatISODate = (dateString: string) => {
    return new Date(dateString).toISOString();
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const getCategoryName = (categoryId: string): string => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  const getMetaDescription = (article: Article): string => {
    if (article.content) {
      const plainText = stripHtml(article.content);
      return plainText.substring(0, 160) + (plainText.length > 160 ? '...' : '');
    }
    return `Read ${article.title} by ${article.author} on Better Teaching Solutions`;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <section className="relative md:pt-44 pt-36">
          <div className="container relative">
            <div className="flex items-center justify-center h-96">
              <Loader2 className="h-12 w-12 text-amber-400 animate-spin" />
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (error || !article) {
    return (
      <>
        <Navbar />
        <section className="relative md:pt-44 pt-36">
          <div className="container relative">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
              <p className="text-slate-400 text-lg">
                {error || 'The article you are looking for does not exist or is not published yet.'}
              </p>
              <p className="text-slate-400 text-sm mt-2">Redirecting to home page...</p>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const canonicalUrl = `https://betterteachingsolutions.com/articles/${slug}`;
  const siteUrl = 'https://betterteachingsolutions.com';

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{article.title} | Better Teaching Solutions</title>
        <meta name="title" content={article.title} />
        <meta name="description" content={getMetaDescription(article)} />
        <meta name="author" content={article.author} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={getMetaDescription(article)} />
        {article.featuredImage && <meta property="og:image" content={article.featuredImage} />}
        <meta property="og:site_name" content="Better Teaching Solutions" />
        <meta property="article:published_time" content={formatISODate(article.createdAt)} />
        {article.updatedAt && <meta property="article:modified_time" content={formatISODate(article.updatedAt)} />}
        <meta property="article:author" content={article.author} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={article.title} />
        <meta property="twitter:description" content={getMetaDescription(article)} />
        {article.featuredImage && <meta property="twitter:image" content={article.featuredImage} />}

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: article.title,
            description: getMetaDescription(article),
            image: article.featuredImage || `${siteUrl}/logo.png`,
            author: {
              '@type': 'Person',
              name: article.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Better Teaching Solutions',
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo.png`,
              },
            },
            datePublished: formatISODate(article.createdAt),
            dateModified: article.updatedAt ? formatISODate(article.updatedAt) : formatISODate(article.createdAt),
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': canonicalUrl,
            },
          })}
        </script>
      </Helmet>
      <Navbar />
      <section className="relative md:pt-44 pt-36 bg-gradient-to-b from-amber-400/20 dark:from-amber-400/40 to-transparent">
        <div className="container relative">
          <div className="md:flex justify-center">
            <div className="lg:w-2/3 md:w-4/5">
              {/* Category Badge */}
              <span className="bg-amber-400/10 text-amber-500 dark:text-amber-400 text-[12px] font-semibold px-2.5 py-0.5 rounded inline-block whitespace-nowrap overflow-hidden text-ellipsis">
                {getCategoryName(article.categoryId)}
              </span>

              {/* Title */}
              <h1 className="md:text-4xl text-3xl font-bold md:tracking-normal tracking-normal md:leading-normal leading-normal mt-3">
                {article.title}
              </h1>

              {/* Meta Information */}
              <div className="flex items-center mt-5">
                <div className="ms-0">
                  <h6 className="font-medium text-lg">{article.author}</h6>
                  <span className="text-slate-400 text-sm">
                    {formatDate(article.createdAt)}
                    {article.updatedAt && article.updatedAt !== article.createdAt && (
                      <span className="ml-2">(Updated {formatDate(article.updatedAt)})</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative md:pb-24 pb-16 pt-7">
        <div className="container relative">
          <div className="md:flex justify-center">
            <div className="lg:w-2/3 md:w-4/5">
              {/* Featured Image */}
              {article.featuredImage && (
                <img src={article.featuredImage} className="rounded-md mb-6" alt={article.title} />
              )}

              {/* Article Content */}
              {article.contentBlocks && article.contentBlocks.length > 0 ? (
                // Legacy: Block-based content
                <div className="prose prose-lg prose-invert max-w-none">
                  {article.contentBlocks.map((block, index) => renderContentBlock(block, index))}
                </div>
              ) : (
                // New: Rich HTML content from WYSIWYG editor
                <>
                  <style>{`
                    .article-content blockquote {
                      position: relative;
                      padding: 2rem 2.5rem;
                      margin: 2rem 0;
                      background: linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, rgba(251, 191, 36, 0.02) 100%);
                      border-radius: 0.5rem;
                      font-size: 1.25rem;
                      line-height: 1.8;
                      font-style: italic;
                      font-weight: 400;
                      color: #f1f5f9;
                      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                      transition: all 0.3s ease;
                    }

                    .article-content blockquote:hover {
                      transform: translateX(4px);
                      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    }

                    .article-content blockquote::before {
                      content: '"';
                      position: absolute;
                      top: -10px;
                      left: -2px;
                      font-size: 4rem;
                      color: #fbbf24;
                      font-family: Georgia, serif;
                      font-weight: bold;
                      line-height: 1;
                    }

                    .article-content blockquote::after {
                      content: '"';
                      position: absolute;
                      bottom: -30px;
                      right: 20px;
                      font-size: 4rem;
                      color: #fbbf24;
                      font-family: Georgia, serif;
                      font-weight: bold;
                      line-height: 1;
                      transform: rotate(180deg);
                    }

                    .article-content blockquote p {
                      position: relative;
                      z-index: 1;
                      margin: 0;
                      padding-left: 1.5rem;
                    }

                    .article-content blockquote p:first-child::first-letter {
                      font-size: 1.5em;
                      font-weight: 500;
                      color: #fbbf24;
                      float: left;
                      line-height: 1;
                      margin-right: 0.1em;
                      margin-top: -0.1em;
                    }

                    /* Link styling in articles */
                    .article-content a {
                      color: #fbbf24 !important;
                      text-decoration: none;
                      transition: all 0.2s ease;
                    }

                    .article-content a:hover {
                      color: #fcd34d !important;
                      text-decoration: underline;
                    }
                  `}</style>
                  <div
                    className="article-content prose prose-lg prose-invert max-w-none text-slate-300"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
