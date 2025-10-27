import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Breadcrumb } from '../components/Breadcrumb';
import { getPublishedArticleBySlug, getPublicCategories, getPublishedArticles } from '../services/publicArticleService';
import { getAuthors } from '../services/authorService';
import type { Article, ArticleContent, Category, Author } from '../types/admin';

// Fallback logo
const btsLogo = '/btsolutions.png';

// Helper function to ensure URL has protocol
const ensureHttps = (url: string): string => {
  if (!url) return url;
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

// FAQ Item Component - Collapsible
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-start justify-between text-left hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white pr-4 flex-1">
          {question}
        </h3>
        <span className="flex-shrink-0 mt-1">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-amber-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 pt-2 border-t border-slate-200 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function ArticlePreview(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
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
        const [articleData, categoriesData, authorsData, allArticles] = await Promise.all([
          getPublishedArticleBySlug(articleSlug),
          getPublicCategories(),
          getAuthors(),
          getPublishedArticles()
        ]);
        setArticle(articleData);
        setCategories(categoriesData);
        setAuthors(authorsData);

        // Get related articles from the same category, excluding current article
        const related = allArticles
          .filter(a => a.categoryId === articleData.categoryId && a.id !== articleData.id)
          .slice(0, 3); // Get up to 3 related articles
        setRelatedArticles(related);
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

  // Helper: Get author info from name
  const getAuthorInfo = (authorName: string): { name: string; profilePicture: string; slug?: string } => {
    const author = authors.find(a => a.name === authorName);
    if (author) {
      // Found author in database, use their profile picture and slug
      return {
        name: author.name,
        profilePicture: author.profilePicture,
        slug: author.slug
      };
    } else {
      // Custom/guest author - use BTS logo as fallback
      return {
        name: authorName,
        profilePicture: btsLogo,
        slug: undefined
      };
    }
  };

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

  const getCategory = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId);
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

  const canonicalUrl = `https://betterteachingsolutions.com/blog/${slug}`;
  const siteUrl = 'https://betterteachingsolutions.com';

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{article.metaTitle || `${article.title} | Better Teaching Solutions`}</title>
        <meta name="title" content={article.metaTitle || article.title} />
        <meta name="description" content={article.metaDescription || getMetaDescription(article)} />
        <meta name="author" content={article.author} />
        {article.focusKeyword && <meta name="keywords" content={article.focusKeyword} />}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={article.metaTitle || article.title} />
        <meta property="og:description" content={article.metaDescription || getMetaDescription(article)} />
        {article.featuredImage && <meta property="og:image" content={article.featuredImage} />}
        <meta property="og:site_name" content="Better Teaching Solutions" />
        <meta property="article:published_time" content={formatISODate(article.createdAt)} />
        {article.updatedAt && <meta property="article:modified_time" content={formatISODate(article.updatedAt)} />}
        <meta property="article:author" content={article.author} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={article.metaTitle || article.title} />
        <meta property="twitter:description" content={article.metaDescription || getMetaDescription(article)} />
        {article.featuredImage && <meta property="twitter:image" content={article.featuredImage} />}

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: article.metaTitle || article.title,
            description: article.metaDescription || getMetaDescription(article),
            keywords: article.focusKeyword,
            image: article.featuredImage || `${siteUrl}/logo.png`,
            author: {
              '@type': 'Person',
              name: article.author,
              url: (() => {
                const authorObj = authors.find(a => a.name === article.author);
                return authorObj?.slug
                  ? `${siteUrl}/author/${authorObj.slug}`
                  : `${siteUrl}/author/${encodeURIComponent(article.author)}`;
              })(),
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

        {/* FAQPage JSON-LD Schema */}
        {article.faqs && article.faqs.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: article.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            })}
          </script>
        )}
      </Helmet>
      <Navbar />
      <section className="relative md:pt-44 pt-36 bg-gradient-to-b from-amber-400/20 dark:from-amber-400/40 to-transparent">
        <div className="container relative">
          <div className="md:flex justify-center">
            <div className="lg:w-2/3 md:w-4/5">
              {/* Breadcrumb */}
              <Breadcrumb
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Blog', href: '/blog' },
                  { label: article.title },
                ]}
              />

              {/* Category Badge */}
              {(() => {
                const category = getCategory(article.categoryId);
                const categoryName = category?.name || 'Uncategorized';
                const categorySlug = category?.slug;

                return categorySlug ? (
                  <Link
                    to={`/category/${categorySlug}`}
                    className="bg-amber-400/10 text-amber-500 dark:text-amber-400 hover:bg-amber-400/20 text-[12px] font-semibold px-2.5 py-0.5 rounded inline-block whitespace-nowrap overflow-hidden text-ellipsis transition-colors"
                  >
                    {categoryName}
                  </Link>
                ) : (
                  <span className="bg-amber-400/10 text-amber-500 dark:text-amber-400 text-[12px] font-semibold px-2.5 py-0.5 rounded inline-block whitespace-nowrap overflow-hidden text-ellipsis">
                    {categoryName}
                  </span>
                );
              })()}

              {/* Title */}
              <h1 className="md:text-4xl text-3xl font-bold md:tracking-normal tracking-normal md:leading-normal leading-normal mt-3">
                {article.title}
              </h1>

              {/* Meta Information */}
              <div className="flex items-center mt-5">
                {(() => {
                  const authorInfo = getAuthorInfo(article.author);
                  return (
                    <>
                      <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-gray-200 mr-4">
                        <img
                          src={authorInfo.profilePicture}
                          className={`${authorInfo.profilePicture === btsLogo ? 'h-6 w-6 object-contain' : 'h-full w-full object-cover'}`}
                          alt={authorInfo.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = btsLogo;
                            (e.target as HTMLImageElement).className = 'h-6 w-6 object-contain';
                          }}
                        />
                      </div>
                      <div className="ms-0">
                        <h6 className="font-medium text-lg">{authorInfo.name}</h6>
                        <span className="text-slate-400 text-sm">
                          {formatDate(article.createdAt)}
                          {article.updatedAt && article.updatedAt !== article.createdAt && (
                            <span className="ml-2">(Updated {formatDate(article.updatedAt)})</span>
                          )}
                        </span>
                      </div>
                    </>
                  );
                })()}
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
                    /* Heading styles */
                    .article-content h1 {
                      font-size: 2.25rem;
                      font-weight: 700;
                      margin-top: 2rem;
                      margin-bottom: 1rem;
                      color: #ffffff;
                      line-height: 1.2;
                    }

                    .article-content h2 {
                      font-size: 1.875rem;
                      font-weight: 700;
                      margin-top: 1.75rem;
                      margin-bottom: 0.875rem;
                      color: #ffffff;
                      line-height: 1.3;
                    }

                    .article-content h3 {
                      font-size: 1.5rem;
                      font-weight: 600;
                      margin-top: 1.5rem;
                      margin-bottom: 0.75rem;
                      color: #ffffff;
                      line-height: 1.4;
                    }

                    .article-content h4 {
                      font-size: 1.25rem;
                      font-weight: 600;
                      margin-top: 1.25rem;
                      margin-bottom: 0.625rem;
                      color: #f1f5f9;
                      line-height: 1.4;
                    }

                    .article-content h5 {
                      font-size: 1.125rem;
                      font-weight: 600;
                      margin-top: 1rem;
                      margin-bottom: 0.5rem;
                      color: #f1f5f9;
                      line-height: 1.5;
                    }

                    .article-content h6 {
                      font-size: 1rem;
                      font-weight: 600;
                      margin-top: 1rem;
                      margin-bottom: 0.5rem;
                      color: #cbd5e1;
                      line-height: 1.5;
                    }

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

      {/* FAQ Section - Collapsible Accordion */}
      {article.faqs && article.faqs.length > 0 && (
        <section className="relative py-16 bg-white dark:bg-slate-900">
          <div className="container relative max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {article.faqs.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Author Bio Section */}
      <section className="relative py-16 bg-slate-50 dark:bg-slate-800">
        <div className="container relative max-w-4xl">
          {(() => {
            const authorInfo = getAuthorInfo(article.author);
            const author = authors.find(a => a.name === article.author);

            return (
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow dark:shadow-gray-700 p-8 flex flex-col md:flex-row gap-6 items-start border border-slate-200 dark:border-slate-700">
                {/* Author Profile Picture */}
                <div className="flex-shrink-0">
                  <img
                    src={authorInfo.profilePicture}
                    alt={authorInfo.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-amber-400/20"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = btsLogo;
                    }}
                  />
                </div>

                {/* Author Info */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    About {authorInfo.name}
                  </h3>

                  {author ? (
                    <>
                      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                        {author.bio}
                      </p>

                      {/* Social Links & Contact */}
                      <div className="flex flex-wrap gap-4 items-center mb-4">
                        {author.email && (
                          <a
                            href={`mailto:${author.email}`}
                            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-amber-400 transition-colors text-sm"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Email
                          </a>
                        )}

                        {author.social?.twitter && (
                          <a
                            href={ensureHttps(author.social.twitter)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-amber-400 transition-colors text-sm"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                            </svg>
                            Twitter
                          </a>
                        )}

                        {author.social?.linkedin && (
                          <a
                            href={ensureHttps(author.social.linkedin)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-amber-400 transition-colors text-sm"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            LinkedIn
                          </a>
                        )}

                        {author.social?.facebook && (
                          <a
                            href={ensureHttps(author.social.facebook)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-amber-400 transition-colors text-sm"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Facebook
                          </a>
                        )}

                        {author.social?.website && (
                          <a
                            href={ensureHttps(author.social.website)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-amber-400 transition-colors text-sm"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                            Website
                          </a>
                        )}
                      </div>

                      {/* View More Articles Link */}
                      <Link
                        to={`/author/${author.slug || encodeURIComponent(author.name)}`}
                        className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium transition-colors"
                      >
                        View all articles by {author.name}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </>
                  ) : (
                    <p className="text-slate-600 dark:text-slate-400">
                      Guest contributor for Better Teaching Solutions.
                    </p>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="relative py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container relative">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
              {relatedArticles.map((relatedArticle) => {
                const category = getCategory(relatedArticle.categoryId);
                const categoryName = category?.name || 'Uncategorized';
                const categorySlug = category?.slug;
                const articleSlug = relatedArticle.slug || relatedArticle.id;
                const authorInfo = getAuthorInfo(relatedArticle.author);

                return (
                  <div className="relative bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-700 overflow-hidden flex flex-col h-full" key={relatedArticle.id}>
                    {/* Featured Image */}
                    <Link to={`/blog/${articleSlug}`} className="relative w-full aspect-[5/3] overflow-hidden block group">
                      <img
                        src={relatedArticle.featuredImage || '/default-blog-image.jpg'}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        alt={relatedArticle.title}
                      />
                    </Link>

                    {/* Card Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      {/* Category Badge */}
                      <div className="flex justify-between items-center gap-2 mb-4">
                        <div className="flex-shrink-0 min-w-0">
                          {categorySlug ? (
                            <Link
                              to={`/category/${categorySlug}`}
                              className="bg-amber-400/10 text-amber-500 dark:text-amber-400 hover:bg-amber-400/20 text-[12px] font-semibold px-2.5 py-0.5 rounded inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-full transition-colors"
                            >
                              {categoryName}
                            </Link>
                          ) : (
                            <span className="bg-amber-400/10 text-amber-500 dark:text-amber-400 text-[12px] font-semibold px-2.5 py-0.5 rounded inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                              {categoryName}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <div className="mb-4 flex-grow">
                        <Link to={`/blog/${articleSlug}`} className="text-lg font-semibold hover:text-amber-400 line-clamp-2 block">
                          {relatedArticle.title}
                        </Link>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                        <Link
                          to={`/author/${authorInfo.slug || encodeURIComponent(authorInfo.name)}`}
                          className="flex items-center flex-shrink-0 group"
                        >
                          <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center overflow-hidden border border-gray-200">
                            <img
                              src={authorInfo.profilePicture}
                              className={`${authorInfo.profilePicture === btsLogo ? 'h-4 w-4 object-contain' : 'h-full w-full object-cover'}`}
                              alt={authorInfo.name}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = btsLogo;
                                (e.target as HTMLImageElement).className = 'h-4 w-4 object-contain';
                              }}
                            />
                          </div>
                          <span className="ml-2 text-slate-400 text-sm group-hover:text-amber-400 transition-colors">{authorInfo.name}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
