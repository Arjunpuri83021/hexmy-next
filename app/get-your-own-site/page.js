import OwnSiteContent from './OwnSiteContent'

export const metadata = {
  title: 'Create Your Own Porn Website & Earn More Than $1000 Daily',
  description: 'Launch your own automated porn website in less than 24 hours and earn $1,000–$50,000+ daily from ads. Complete design, setup & secure offshore hosting done for you.',
  openGraph: {
    title: 'Create Your Own Porn Website & Earn More Than $1000 Daily',
    description: 'Launch your own automated porn website in less than 24 hours and earn $1,000–$50,000+ daily from ads. Complete design, setup & secure offshore hosting done for you.',
  },
  alternates: {
    canonical: '/get-your-own-site',
  },
}

async function getDemos() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
  try {
    const res = await fetch(`${apiUrl}/demos`, { next: { revalidate: 60 } })
    if (res.ok) {
      const data = await res.json()
      return data.filter(d => d.active)
    }
  } catch (err) {
    console.error('Failed to fetch demos server-side:', err)
  }
  return []
}

export default async function Page() {
  const initialNiches = await getDemos()
  return <OwnSiteContent initialNiches={initialNiches} />
}
