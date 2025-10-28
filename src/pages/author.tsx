import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import bgImage from "../assets/images/bg/btshome1.jpg"

import Footer from "../components/footer";
import Switcher from "../components/switcher";
import NavLight from "../components/navlight";
import { Breadcrumb } from "../components/Breadcrumb";

import { getPublishedArticles } from "../services/publicArticleService";
import { getAuthors } from "../services/authorService";
import type { Article, Author } from "../types/admin";
import { FiClock, FiCalendar, FiMail, FiGlobe } from '../assets/icons/vander'
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

// Default images
import defaultBlogImage from "../assets/images/blog/1.jpg";

// Helper function to ensure URL has protocol
const ensureHttps = (url: string): string => {
  if (!url) return url;
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

export default function AuthorPage(): JSX.Element {
    const { slug } = useParams<{ slug: string }>();
    const [author, setAuthor] = useState<Author | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Dark mode is now handled globally by StyleManager

    // Fetch author and their articles
    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;

            try {
                setLoading(true);
                const [authorsData, articlesData] = await Promise.all([
                    getAuthors(),
                    getPublishedArticles()
                ]);

                // Find the author by slug
                const decodedSlug = slug;
                const foundAuthor = authorsData.find(a => a.slug === decodedSlug);

                if (!foundAuthor) {
                    setError('Author not found');
                    setLoading(false);
                    return;
                }

                setAuthor(foundAuthor);

                // Filter articles by this author
                const authorArticles = articlesData.filter(article => article.author === foundAuthor.name);
                setArticles(authorArticles);
                setError(null);
            } catch (err) {
                console.error('Error fetching author data:', err);
                setError('Failed to load author information. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    // Helper: Calculate reading time
    const calculateReadTime = (content: string): string => {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return `${minutes} min read`;
    };

    // Helper: Format date nicely
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <>
                <NavLight />
                <section className="relative md:py-44 py-32 bg-no-repeat bg-bottom bg-cover" style={{ backgroundImage: `url(${bgImage})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-slate-900/70"></div>
                </section>
                <section className="relative md:py-24 py-16">
                    <div className="container relative">
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
                            <p className="mt-4 text-slate-400">Loading author...</p>
                        </div>
                    </div>
                </section>
                <Footer />
                <Switcher />
            </>
        );
    }

    if (error || !author) {
        return (
            <>
                <NavLight />
                <section className="relative md:py-44 py-32 bg-no-repeat bg-bottom bg-cover" style={{ backgroundImage: `url(${bgImage})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-slate-900/70"></div>
                </section>
                <section className="relative md:py-24 py-16">
                    <div className="container relative">
                        <div className="text-center py-12">
                            <p className="text-red-500">{error || 'Author not found'}</p>
                            <Link to="/blog" className="mt-4 inline-block text-amber-400 hover:text-amber-300">
                                ← Back to Blog
                            </Link>
                        </div>
                    </div>
                </section>
                <Footer />
                <Switcher />
            </>
        );
    }

    // SEO data
    const pageTitle = `${author.name} | Better Teaching Solutions`;
    const pageDescription = author.bio || `Read all articles by ${author.name} on Better Teaching Solutions. Discover educational insights and teaching resources.`;
    const canonicalUrl = `${window.location.origin}/author/${author.slug}`;

    return (
        <>
            <Helmet>
                {/* Primary Meta Tags */}
                <title>{pageTitle}</title>
                <meta name="title" content={pageTitle} />
                <meta name="description" content={pageDescription} />
                <meta name="author" content={author.name} />
                <link rel="canonical" href={canonicalUrl} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="profile" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={author.profilePicture} />
                <meta property="og:site_name" content="Better Teaching Solutions" />
                <meta property="profile:first_name" content={author.name.split(' ')[0]} />
                {author.name.split(' ').length > 1 && (
                    <meta property="profile:last_name" content={author.name.split(' ').slice(1).join(' ')} />
                )}

                {/* Twitter */}
                <meta property="twitter:card" content="summary" />
                <meta property="twitter:url" content={canonicalUrl} />
                <meta property="twitter:title" content={pageTitle} />
                <meta property="twitter:description" content={pageDescription} />
                <meta property="twitter:image" content={author.profilePicture} />

                {/* Robots */}
                <meta name="robots" content="index, follow" />

                {/* Schema.org Person markup */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": author.name,
                        "description": author.bio,
                        "image": author.profilePicture,
                        "url": canonicalUrl,
                        ...(author.email && { "email": author.email }),
                        "sameAs": [
                            author.social?.twitter,
                            author.social?.linkedin,
                            author.social?.facebook,
                            author.social?.website
                        ].filter(Boolean)
                    })}
                </script>
            </Helmet>

            <NavLight />
            <section className="relative md:py-44 py-32 bg-no-repeat bg-bottom bg-cover" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-slate-900/70"></div>
                <div className="container relative">
                    <div className="grid grid-cols-1 text-center mt-6">
                        <div>
                            <h5 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold text-white mb-0">
                                {author.name}
                            </h5>
                        </div>
                    </div>
                </div>
            </section>
            <div className="relative">
                <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-black">
                    <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--tw-text-opacity, 1)', fill: 'currentColor' }}>
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>

            <section className="relative md:py-24 py-16">
                <div className="container relative">
                    {/* Breadcrumb */}
                    <Breadcrumb
                        items={[
                            { label: 'Home', href: '/' },
                            { label: 'Blog', href: '/blog' },
                            { label: author.name },
                        ]}
                    />

                    {/* Author Profile Card */}
                    <div className="mb-12 bg-slate-200 dark:bg-slate-900 rounded-lg shadow dark:shadow-gray-700 overflow-hidden">
                        <div className="p-8">
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Profile Picture */}
                                <div className="flex-shrink-0">
                                    <img
                                        src={author.profilePicture}
                                        alt={author.name}
                                        className="w-32 h-32 rounded-full object-cover border-4 border-amber-400/20"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128?text=Author';
                                        }}
                                    />
                                </div>

                                {/* Author Info */}
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                                        {author.name}
                                    </h1>
                                    <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                                        {author.bio}
                                    </p>

                                    {/* Contact & Social Links */}
                                    <div className="flex flex-wrap gap-4 items-center">
                                        {author.email && (
                                            <a
                                                href={`mailto:${author.email}`}
                                                className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-amber-400 transition-colors"
                                            >
                                                <FiMail size={18} />
                                                <span>{author.email}</span>
                                            </a>
                                        )}

                                        {author.social?.twitter && (
                                            <a
                                                href={ensureHttps(author.social.twitter)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-amber-400 transition-colors"
                                            >
                                                <FaTwitter size={18} />
                                                <span>Twitter</span>
                                            </a>
                                        )}

                                        {author.social?.linkedin && (
                                            <a
                                                href={ensureHttps(author.social.linkedin)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-amber-400 transition-colors"
                                            >
                                                <FaLinkedin size={18} />
                                                <span>LinkedIn</span>
                                            </a>
                                        )}

                                        {author.social?.facebook && (
                                            <a
                                                href={ensureHttps(author.social.facebook)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-amber-400 transition-colors"
                                            >
                                                <FaFacebook size={18} />
                                                <span>Facebook</span>
                                            </a>
                                        )}

                                        {author.social?.website && (
                                            <a
                                                href={ensureHttps(author.social.website)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-amber-400 transition-colors"
                                            >
                                                <FiGlobe size={18} />
                                                <span>Website</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Articles by Author */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Articles by {author.name} ({articles.length})
                        </h2>
                    </div>

                    {articles.length === 0 ? (
                        <div className="text-center py-12 bg-slate-200 dark:bg-slate-900 rounded-lg">
                            <p className="text-slate-400">No articles published yet by this author.</p>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                            {articles.map((article) => {
                                const readTime = calculateReadTime(article.content);
                                const formattedDate = formatDate(article.createdAt);
                                const articleImage = article.featuredImage || defaultBlogImage;
                                const articleSlug = article.slug || article.id;

                                return (
                                    <div className="relative bg-slate-200 dark:bg-slate-900 rounded-md shadow dark:shadow-gray-700 overflow-hidden flex flex-col h-full" key={article.id}>
                                        {/* Featured Image */}
                                        <Link to={`/blog/${articleSlug}`} className="relative w-full aspect-[5/3] overflow-hidden block group">
                                            <img
                                                src={articleImage}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                alt={article.title}
                                            />
                                        </Link>

                                        {/* Card Content */}
                                        <div className="p-4 flex flex-col flex-grow">
                                            {/* Read Time */}
                                            <div className="flex justify-end items-center mb-4">
                                                <div className="flex items-center text-slate-400 text-sm">
                                                    <FiClock className="h-4 w-4" />
                                                    <span className="ml-1">{readTime}</span>
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <div className="mb-4 flex-grow">
                                                <Link to={`/blog/${articleSlug}`} className="text-lg font-semibold hover:text-amber-400 line-clamp-2 block">
                                                    {article.title}
                                                </Link>
                                            </div>

                                            {/* Date Posted */}
                                            <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                                                <div className="flex items-center text-slate-400 text-sm">
                                                    <FiCalendar className="h-4 w-4" />
                                                    <span className="ml-1">{formattedDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
            <Footer />
            <Switcher />
        </>
    )
}
