import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import bgImage from "../assets/images/bg/btshome1.jpg"

import Footer from "../components/footer";
import Switcher from "../components/switcher";
import NavLight from "../components/navlight";
import { Breadcrumb } from "../components/Breadcrumb";

import { getPublishedArticles, getPublicCategories } from "../services/publicArticleService";
import { getAuthors } from "../services/authorService";
import type { Article, Category, Author } from "../types/admin";
import { FiClock, FiCalendar } from '../assets/icons/vander'

// Default images
import defaultBlogImage from "../assets/images/blog/1.jpg";

// BTS logo fallback (public folder)
const btsLogo = "/btsolutions.png";

export default function Blog(): JSX.Element {
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const articlesPerPage = 9; // Show 9 articles per page (3x3 grid)

    useEffect(() => {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    }, []);

    // Fetch articles, categories, and authors when page loads
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [articlesData, categoriesData, authorsData] = await Promise.all([
                    getPublishedArticles(),
                    getPublicCategories(),
                    getAuthors()
                ]);
                setArticles(articlesData);
                setCategories(categoriesData);
                setAuthors(authorsData);
                setError(null);
            } catch (err) {
                console.error('Error fetching blog data:', err);
                setError('Failed to load articles. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Helper: Get category from ID
    const getCategory = (categoryId: string) => {
        return categories.find(cat => cat.id === categoryId);
    };

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

    // Helper: Calculate reading time
    const calculateReadTime = (content: string | undefined): string => {
        if (!content) return '1 min read';
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
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

    // Pagination calculations
    const totalPages = Math.ceil(articles.length / articlesPerPage);
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    // Generate page numbers to display
    const getPageNumbers = (): number[] => {
        const pageNumbers: number[] = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    // Handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // SEO data
    const pageTitle = "Blog | Better Teaching Solutions";
    const pageDescription = "Read the latest articles about teaching methods, classroom management, and educational resources from Better Teaching Solutions. Empowering educators with practical insights.";
    const canonicalUrl = window.location.origin + window.location.pathname;

    // Pagination URLs for SEO
    const prevPageUrl = currentPage > 1 ? `${canonicalUrl}?page=${currentPage - 1}` : null;
    const nextPageUrl = currentPage < totalPages ? `${canonicalUrl}?page=${currentPage + 1}` : null;

    return (
        <>
            <Helmet>
                {/* Primary Meta Tags */}
                <title>{pageTitle}</title>
                <meta name="title" content={pageTitle} />
                <meta name="description" content={pageDescription} />
                <link rel="canonical" href={canonicalUrl} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:site_name" content="Better Teaching Solutions" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={canonicalUrl} />
                <meta property="twitter:title" content={pageTitle} />
                <meta property="twitter:description" content={pageDescription} />

                {/* Pagination */}
                {prevPageUrl && <link rel="prev" href={prevPageUrl} />}
                {nextPageUrl && <link rel="next" href={nextPageUrl} />}

                {/* Robots */}
                <meta name="robots" content="index, follow" />
            </Helmet>

            <NavLight />
            <section className="relative md:py-44 py-32 bg-no-repeat bg-bottom bg-cover" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-slate-900/70"></div>
                <div className="container relative">
                    <div className="grid grid-cols-1 text-center mt-6">
                        <div>
                            <h5 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold text-white mb-0">Latest Blogs & News</h5>
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
                            { label: 'Blog' },
                        ]}
                    />


                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
                            <p className="mt-4 text-slate-400">Loading articles...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <p className="text-red-500">{error}</p>
                        </div>
                    ) : articles.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-slate-400">No articles published yet. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                            {currentArticles.map((article) => {
                                const category = getCategory(article.categoryId);
                                const categoryName = category?.name || 'Uncategorized';
                                const categorySlug = category?.slug;
                                const readTime = calculateReadTime(article.content);
                                const formattedDate = formatDate(article.createdAt);
                                const articleImage = article.featuredImage || defaultBlogImage;
                                const articleSlug = article.slug || article.id;
                                const authorInfo = getAuthorInfo(article.author);

                                return (
                                    <div className="relative bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-700 overflow-hidden flex flex-col h-full" key={article.id}>
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
                                            {/* Section 1: Category Tag | Read Time */}
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
                                                <div className="flex items-center text-slate-400 text-sm flex-shrink-0 whitespace-nowrap">
                                                    <FiClock className="h-4 w-4" />
                                                    <span className="ml-1">{readTime}</span>
                                                </div>
                                            </div>

                                            {/* Section 2: Title */}
                                            <div className="mb-4 flex-grow">
                                                <Link to={`/blog/${articleSlug}`} className="text-lg font-semibold hover:text-amber-400 line-clamp-2 block">
                                                    {article.title}
                                                </Link>
                                            </div>

                                            {/* Section 3: Author Info | Date Posted */}
                                            <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
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
                                                <div className="flex items-center text-slate-400 text-sm flex-shrink-0 ml-2">
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

                    {totalPages > 1 && (
                        <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                            <div className="md:col-span-12 text-center">
                                <nav aria-label="Page navigation example">
                                    <ul className="inline-flex items-center -space-x-px">
                                        {/* Previous button */}
                                        <li>
                                            <button
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className="w-9 h-9 inline-flex text-sm justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-amber-400 dark:hover:border-amber-400 hover:bg-amber-400 dark:hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <i className="mdi mdi-chevron-left text-[20px] rtl:rotate-180 rtl:-mt-1"></i>
                                            </button>
                                        </li>

                                        {/* Page numbers */}
                                        {getPageNumbers().map((pageNumber) => (
                                            <li key={pageNumber}>
                                                <button
                                                    onClick={() => handlePageChange(pageNumber)}
                                                    className={
                                                        currentPage === pageNumber
                                                            ? "z-10 w-9 h-9 inline-flex text-sm justify-center items-center text-white bg-amber-400 border border-amber-400"
                                                            : "w-9 h-9 inline-flex text-sm justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-amber-400 dark:hover:border-amber-400 hover:bg-amber-400 dark:hover:bg-amber-400"
                                                    }
                                                    aria-current={currentPage === pageNumber ? "page" : undefined}
                                                >
                                                    {pageNumber}
                                                </button>
                                            </li>
                                        ))}

                                        {/* Next button */}
                                        <li>
                                            <button
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                className="w-9 h-9 inline-flex text-sm justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-amber-400 dark:hover:border-amber-400 hover:bg-amber-400 dark:hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <i className="mdi mdi-chevron-right text-[20px] rtl:rotate-180 rtl:-mt-1"></i>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
            <Switcher />
        </>
    )
}
