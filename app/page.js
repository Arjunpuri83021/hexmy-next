import Link from 'next/link'
import { api } from './lib/api'
import VideoCard from './components/VideoCard'
import PromoCard from './components/PromoCard'
import Pagination from './components/Pagination'
import { generateSeoMetadata } from './utils/seoHelper'

export const revalidate = 60

// Generate metadata dynamically from SEO Meta or use defaults
export async function generateMetadata({ searchParams }) {
  const page = Number(searchParams?.page || 1)
  const seoMeta = await generateSeoMetadata('/', {
    title: 'Hexmy Free XXXHD Adult Content Videos And Free Porn Videos',
    description: 'fry99 hqpornee freeomovie 3gp king adelt movies auntymaza badwap com bf full hd bf hd video bfxxx bigfucktv xxxhd spanbank borwap com pornve wowuncut| Hexmy',
    alternates: { canonical: '/' },
  });
  
  if (page > 1) {
    return {
      ...seoMeta,
      robots: {
        index: false,
        follow: true
      }
    }
  }
  
  return seoMeta;
}

export default async function HomePage({ searchParams }) {
  const page = Number(searchParams?.page || 1)
  const limit = 16
  const res = await api.getAllPosts(page, limit).catch(() => ({ records: [], data: [], totalPages: 1, totalRecords: 0 }))
  const list = res.records || res.data || []
  const totalPages = res.totalPages || (res.totalRecords ? Math.max(1, Math.ceil(Number(res.totalRecords) / limit)) : 1)

  // Insert PromoCard every 4 video cards
  const PROMO_INTERVAL = 4
  const gridItems = []
  list.forEach((v, idx) => {
    gridItems.push({ type: 'video', data: v, idx })
    if ((idx + 1) % PROMO_INTERVAL === 0) {
      gridItems.push({ type: 'promo', idx })
    }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Hexmy Free XXXHD Adult Content Videos And Free Porn Videos</h1>

      {/* All Videos (Newest first handled by API) */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">All Videos</h2>
        </div>
        <div className="grid video-grid">
          {gridItems.map((item) =>
            item.type === 'promo'
              ? <PromoCard key={`promo-${item.idx}`} />
              : <VideoCard key={item.data._id || item.idx} video={item.data} priority={item.idx < 6} />
          )}
        </div>
        <div className="mt-6">
          <Pagination basePath="/?" currentPage={page} totalPages={totalPages} />
        </div>
      </section>
    </div>
  )
}

