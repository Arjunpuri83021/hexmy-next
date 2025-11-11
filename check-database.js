// Check what's actually in the database
async function checkDatabase() {
  try {
    const apiUrl = 'http://localhost:5000';
    const url = `${apiUrl}/seo-meta?page=1&limit=100`;
    
    console.log('Fetching all SEO entries from:', url);
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.success && data.seoMetas) {
      console.log(`\n✅ Found ${data.seoMetas.length} SEO entries:\n`);
      
      data.seoMetas.forEach((entry, index) => {
        console.log(`${index + 1}. Page Path: "${entry.pagePath}"`);
        console.log(`   Meta Title: "${entry.metaTitle}"`);
        console.log(`   Is Active: ${entry.isActive}`);
        console.log(`   Created: ${new Date(entry.createdAt).toLocaleString()}`);
        console.log('');
      });
      
      // Check if straight-hair exists
      const straightHair = data.seoMetas.find(e => 
        e.pagePath.includes('straight-hair') || 
        e.pageTitle.includes('straight-hair')
      );
      
      if (straightHair) {
        console.log('✅ Found straight-hair entry:');
        console.log('   Exact path:', straightHair.pagePath);
      } else {
        console.log('❌ No straight-hair entry found!');
        console.log('   Expected path: /tag/straight-hair');
        console.log('   Make sure you entered this EXACTLY in admin panel');
      }
    } else {
      console.log('❌ No SEO entries found in database!');
    }
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

checkDatabase();
