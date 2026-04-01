import { productToCategory, categoryTitles } from './productCategories';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export function generateSitemapXML(baseURL: string): string {
  const entries: SitemapEntry[] = [];
  const now = new Date().toISOString().split('T')[0];

  entries.push({
    loc: baseURL,
    lastmod: now,
    changefreq: 'monthly',
    priority: 1.0,
  });

  entries.push({
    loc: `${baseURL}/ceiling`,
    lastmod: now,
    changefreq: 'weekly',
    priority: 0.9,
  });

  Object.keys(categoryTitles).forEach((category) => {
    entries.push({
      loc: `${baseURL}/ceiling/${category}`,
      lastmod: now,
      changefreq: 'weekly',
      priority: 0.8,
    });
  });

  const uniqueProducts = new Set(Object.keys(productToCategory));
  uniqueProducts.forEach((product) => {
    const category = productToCategory[product];
    entries.push({
      loc: `${baseURL}/ceiling/${category}/${product}`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.7,
    });
  });

  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const urlsetClose = '</urlset>';

  const urlEntries = entries
    .map(
      (entry) =>
        `  <url>\n` +
        `    <loc>${escapeXML(entry.loc)}</loc>\n` +
        `    <lastmod>${entry.lastmod}</lastmod>\n` +
        `    <changefreq>${entry.changefreq}</changefreq>\n` +
        `    <priority>${entry.priority}</priority>\n` +
        `  </url>\n`
    )
    .join('');

  return xmlHeader + urlsetOpen + urlEntries + urlsetClose;
}

function escapeXML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function getSitemapEntries(baseURL: string): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const now = new Date().toISOString().split('T')[0];

  entries.push({
    loc: baseURL,
    lastmod: now,
    changefreq: 'monthly',
    priority: 1.0,
  });

  entries.push({
    loc: `${baseURL}/ceiling`,
    lastmod: now,
    changefreq: 'weekly',
    priority: 0.9,
  });

  Object.keys(categoryTitles).forEach((category) => {
    entries.push({
      loc: `${baseURL}/ceiling/${category}`,
      lastmod: now,
      changefreq: 'weekly',
      priority: 0.8,
    });
  });

  const uniqueProducts = new Set(Object.keys(productToCategory));
  uniqueProducts.forEach((product) => {
    const category = productToCategory[product];
    entries.push({
      loc: `${baseURL}/ceiling/${category}/${product}`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.7,
    });
  });

  return entries;
}
