import { NextResponse } from 'next/server'
import { api } from '../../../lib/api'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const videoId = searchParams.get('id')
  
  if (!videoId) {
    return NextResponse.json({ error: 'Video ID required' }, { status: 400 })
  }

  try {
    const video = await api.getVideoById(videoId)
    
    if (!video || !video.previewImage) {
      return NextResponse.json({ error: 'Video not found or no preview available' }, { status: 404 })
    }

    // Generate HTML for Twitter player
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${video.titel || video.title || 'Video'}</title>
  <meta property="og:title" content="${video.titel || video.title || 'Video'}">
  <meta property="og:description" content="${video.desc || video.metatitel || 'Watch premium video on Hexmy'}">
  <meta property="og:video" content="${video.previewImage}">
  <meta property="og:video:type" content="video/mp4">
  <meta property="og:video:width" content="1280">
  <meta property="og:video:height" content="720">
  <meta name="twitter:card" content="player">
  <meta name="twitter:player:width" content="1280">
  <meta name="twitter:player:height" content="720">
  <meta name="twitter:player:stream" content="${video.previewImage}">
  <meta name="twitter:player:stream:content_type" content="video/mp4">
</head>
<body style="margin:0;padding:0;background:#000;">
  <video 
    width="100%" 
    height="100%" 
    controls 
    autoplay 
    muted 
    loop 
    style="width:100%;height:100vh;object-fit:contain;"
  >
    <source src="${video.previewImage}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</body>
</html>
    `

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch video' }, { status: 500 })
  }
}
