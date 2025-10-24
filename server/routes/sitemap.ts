import express, { Request, Response } from 'express';
import { Article } from '../models/article';

const router = express.Router();

console.log('✅ Sitemap routes loaded');

/**
 * GET /test-sitemap
 * Test route to verify router is working
 */
router.get('/test-sitemap', (_req: Request, res: Response): void => {
  res.send('Sitemap router is working!');
});

/**
 * GET /sitemap.xml
 * Generate XML sitemap with all published articles and static pages
 * @access Public
 */
router.get('/sitemap.xml', async (req: Request, res: Response): Promise<void> => {
  console.log('🔍 Sitemap route handler called!');
  try {
    // Get base URL from environment or request
    const baseUrl = process.env.SITE_URL || `${req.protocol}://${req.get('host')}`;

    // Fetch all published articles from MongoDB
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const articles = await (Article as any)
      .find({ status: 'published' })
      .sort({ updatedAt: -1 })
      .select('slug updatedAt createdAt')
      .lean();

    // Define static pages (marketing pages)
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'weekly' },
      { url: '/blog', priority: '0.9', changefreq: 'daily' },
      { url: '/aboutus', priority: '0.7', changefreq: 'monthly' },
      { url: '/services', priority: '0.8', changefreq: 'monthly' },
      { url: '/pricing', priority: '0.8', changefreq: 'monthly' },
      { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    ];

    // Build XML string
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static pages
    staticPages.forEach(page => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += '  </url>\n';
    });

    // Add all published articles
    articles.forEach((article: { slug: string; updatedAt?: Date; createdAt: Date }) => {
      const lastmod = (article.updatedAt || article.createdAt).toISOString().split('T')[0];
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/blog/${article.slug}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += '  </url>\n';
    });

    xml += '</urlset>';

    // Set proper headers and send response
    res.header('Content-Type', 'application/xml');
    res.header('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.send(xml);

  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});

/**
 * GET /robots.txt
 * Tell search engines where sitemap is and crawling rules
 * @access Public
 */
router.get('/robots.txt', (req: Request, res: Response): void => {
  const baseUrl = process.env.SITE_URL || `${req.protocol}://${req.get('host')}`;

  const robotsTxt = `# Better Teaching Solutions - Robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;

  res.header('Content-Type', 'text/plain');
  res.send(robotsTxt);
});

export default router;
