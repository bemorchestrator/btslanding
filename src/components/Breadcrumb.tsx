import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet';

type BreadcrumbItem = {
  label: string;
  href?: string; // Optional: last item usually has no href
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  const baseUrl = window.location.origin;

  // Generate Schema.org BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `${baseUrl}${item.href}` }),
    })),
  };

  return (
    <>
      {/* Schema.org Breadcrumb Markup */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Visual Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={index} className="flex items-center">
              {item.href ? (
                <Link
                  to={item.href}
                  className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 dark:text-gray-200 font-medium">
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="mx-2 w-4 h-4 text-gray-400" />
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
