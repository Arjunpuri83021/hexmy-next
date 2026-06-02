// SEO Helper - Fetch and apply SEO meta tags dynamically
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Fetch SEO meta data for a specific page path
 * @param {string} pagePath - The page path (e.g., '/', '/about', '/category/indian')
 * @returns {Promise<Object|null>} SEO meta data or null if not found
 */
export async function fetchSeoMeta(pagePath) {
  try {
    // Encode the page path for URL
    const encodedPath = encodeURIComponent(pagePath);
    const response = await fetch(`${apiUrl}/seo-meta/path/${encodedPath}`, {
      cache: 'no-store' // Always fetch fresh data
    });
    
    if (!response.ok) {
      console.log(`No SEO meta found for path: ${pagePath}`);
      return null;
    }
    
    const data = await response.json();
    
    if (data.success && data.seoMeta && data.seoMeta.isActive) {
      return data.seoMeta;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching SEO meta:', error);
    return null;
  }
}

/**
 * Generate metadata object for Next.js pages
 * @param {string} pagePath - The page path
 * @param {Object} defaultMeta - Default metadata to use if no custom SEO found
 * @returns {Promise<Object>} Next.js metadata object
 */
export async function generateSeoMetadata(pagePath, defaultMeta = {}) {
  const seoMeta = await fetchSeoMeta(pagePath);
  const normalizedPath = pagePath.startsWith('/') ? pagePath : `/${pagePath}`;

  if (!seoMeta) {
    return defaultMeta;
  }

  const metadata = {
    title: seoMeta.metaTitle,
    description: seoMeta.metaDescription,
    // Override root layout canonical ('/') — admin SEO must keep the page URL
    alternates: { canonical: normalizedPath },
  };

  if (seoMeta.metaKeywords) {
    metadata.keywords = seoMeta.metaKeywords;
  }

  metadata.openGraph = {
    title: seoMeta.ogTitle || seoMeta.metaTitle,
    description: seoMeta.ogDescription || seoMeta.metaDescription,
    url: normalizedPath,
  };

  if (seoMeta.ogImage) {
    metadata.openGraph.images = [seoMeta.ogImage];
  }

  metadata.twitter = {
    card: 'summary_large_image',
    title: seoMeta.ogTitle || seoMeta.metaTitle,
    description: seoMeta.ogDescription || seoMeta.metaDescription,
  };

  if (seoMeta.ogImage) {
    metadata.twitter.images = [seoMeta.ogImage];
  }

  return {
    ...defaultMeta,
    ...metadata,
    alternates: {
      ...defaultMeta?.alternates,
      canonical: normalizedPath,
    },
    openGraph: {
      ...defaultMeta?.openGraph,
      ...metadata.openGraph,
      url: normalizedPath,
    },
    twitter: {
      ...defaultMeta?.twitter,
      ...metadata.twitter,
    },
  };
}

/**
 * Get SEO meta for client-side rendering (use in useEffect)
 * @param {string} pagePath - The page path
 * @returns {Promise<Object|null>} SEO meta data
 */
export async function getClientSeoMeta(pagePath) {
  return await fetchSeoMeta(pagePath);
}
