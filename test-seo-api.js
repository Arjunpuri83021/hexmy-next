// Test SEO API endpoint
const testPath = '/tag/straight-hair';

async function testSeoApi() {
  try {
    const apiUrl = 'http://localhost:5000';
    const encodedPath = encodeURIComponent(testPath);
    const url = `${apiUrl}/seo-meta/path/${encodedPath}`;
    
    console.log('Testing URL:', url);
    
    const response = await fetch(url);
    console.log('Response status:', response.status);
    
    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));
    
    if (data.success && data.seoMeta) {
      console.log('\n✅ SUCCESS! SEO Meta found:');
      console.log('  Page Path:', data.seoMeta.pagePath);
      console.log('  Meta Title:', data.seoMeta.metaTitle);
      console.log('  Is Active:', data.seoMeta.isActive);
    } else {
      console.log('\n❌ FAILED! No SEO meta found');
    }
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

testSeoApi();
