import { NextResponse } from 'next/server'

export const revalidate = 3600

// Category slugs mapped in app/category/[slug]/page.js
const CATEGORY_SLUGS = [
  'chochox',
  'scout69',
  'comxxx',
  'lesbify',
  'milfnut',
  'badwap',
  'sex-sister',
  'sex18',
  'desi49',
  'dehati-sex',
  'boobs-pressing',
  'blueflim',
  'aunt-sex',
  'famili-sex-com',
  'teen-sex',
  'small-tits',
  'fullporner',
]

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hexmy.com'
  const currentDate = new Date().toISOString().split('T')[0]

  const urlEntries = CATEGORY_SLUGS.map((slug) => `
  <url>
    <loc>${siteUrl}/category/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
