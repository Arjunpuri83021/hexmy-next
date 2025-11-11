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
  
  if (!seoMeta) {
    // Return default metadata if no custom SEO found
    return defaultMeta;
  }
  
  // Build metadata object
  const metadata = {
    title: seoMeta.metaTitle,
    description: seoMeta.metaDescription,
  };
  
  // Add keywords if available
  if (seoMeta.metaKeywords) {
    metadata.keywords = seoMeta.metaKeywords;
  }
  
  // Add Open Graph data
  metadata.openGraph = {
    title: seoMeta.ogTitle || seoMeta.metaTitle,
    description: seoMeta.ogDescription || seoMeta.metaDescription,
  };
  
  if (seoMeta.ogImage) {
    metadata.openGraph.images = [seoMeta.ogImage];
  }
  
  // Add Twitter Card data
  metadata.twitter = {
    card: 'summary_large_image',
    title: seoMeta.ogTitle || seoMeta.metaTitle,
    description: seoMeta.ogDescription || seoMeta.metaDescription,
  };
  
  if (seoMeta.ogImage) {
    metadata.twitter.images = [seoMeta.ogImage];
  }
  
  return metadata;
}

/**
 * Get SEO meta for client-side rendering (use in useEffect)
 * @param {string} pagePath - The page path
 * @returns {Promise<Object|null>} SEO meta data
 */
export async function getClientSeoMeta(pagePath) {
  return await fetchSeoMeta(pagePath);
}
