import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedArticles } from '../services/publicArticleService';
import type { Article } from '../types/admin';

export default function ArticlesDropdown(): JSX.Element {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const articlesData = await getPublishedArticles();
        // Get only the 3 most recent articles
        const recentArticles = articlesData.slice(0, 3);
        setArticles(recentArticles);
        setError(null);
      } catch (err) {
        console.error('Error fetching articles for dropdown:', err);
        setError('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Helper: Truncate text to max characters
  const truncateText = (text: string, maxLength: number = 45): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  if (loading) {
    return (
      <ul className="submenu">
        <li className="px-4 py-3">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-400"></div>
          </div>
        </li>
      </ul>
    );
  }

  if (error || articles.length === 0) {
    return (
      <ul className="submenu">
        <li>
          <Link to="/blog" className="sub-menu-item">
            View All Articles
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className="submenu">
      {articles.map((article) => {
        const articleSlug = article.slug || article.id;
        return (
          <li key={article.id}>
            <Link to={`/blog/${articleSlug}`} className="sub-menu-item">
              {truncateText(article.title)}
            </Link>
          </li>
        );
      })}
      <li>
        <Link to="/blog" className="sub-menu-item">
          View All Articles
        </Link>
      </li>
    </ul>
  );
}
