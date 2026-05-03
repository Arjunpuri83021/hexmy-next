// API Warming Script - Run every 5 minutes via cron
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.majehimaje.life'

async function warmAPI() {
  try {
    // Warm up home page data
    await fetch(`${API_URL}/api/posts?page=1&limit=10`, {
      method: 'HEAD',
      cache: 'no-store'
    })
    
    console.log(`[${new Date().toISOString()}] API warmed successfully`)
  } catch (error) {
    console.error(`[${new Date().toISOString()}] API warm failed:`, error.message)
  }
}

// Run immediately
warmAPI()

// Run every 4 minutes (240 seconds)
setInterval(warmAPI, 240000)

console.log('API warming service started...')
