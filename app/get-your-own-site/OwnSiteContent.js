'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Star, Shield, HelpCircle, Check, X, Timer, Zap, Play, Eye,
  Settings, Heart, Flame, AlertCircle, Award, Grid, ChevronDown, ChevronUp, MessageSquare,
  Globe, Search, PlayCircle, Lock, DollarSign
} from 'lucide-react'

export default function OwnSiteContent({ initialNiches = [] }) {
  const [openFaqs, setOpenFaqs] = useState({})
  const [showMoreBenefits, setShowMoreBenefits] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 })
  const [niches, setNiches] = useState(initialNiches)
  const [nichesLoading, setNichesLoading] = useState(initialNiches.length === 0)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

  // Real-time ticking countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else {
          return { hours: 23, minutes: 59, seconds: 59 }
        }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Fetch demos from API
  useEffect(() => {
    if (initialNiches && initialNiches.length > 0) {
      setNiches(initialNiches)
      setNichesLoading(false)
      return
    }
    const fetchDemos = async () => {
      try {
        setNichesLoading(true)
        const res = await fetch(`${apiUrl}/demos`)
        if (res.ok) {
          const data = await res.json()
          // Only show active demos
          setNiches(data.filter(d => d.active))
        }
      } catch (err) {
        console.error('Failed to fetch demos:', err)
      } finally {
        setNichesLoading(false)
      }
    }
    fetchDemos()
  }, [initialNiches])

  const toggleFaq = (index) => {
    setOpenFaqs(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  // niches are now fetched from API (see useEffect above)

  const plugins = [
    {
      title: 'Broken Video Finder',
      desc: 'Automatically scans external embedded players daily and tags broken links, protecting your site from dead pages.',
      val: '$39 Value'
    },
    {
      title: 'HTML5 Video Player',
      desc: 'Highly responsive player supporting MP4, HLS, pre-roll VAST ads, logo overlays, and custom poster loading.',
      val: '$49 Value'
    },
    {
      title: 'Mass Video Grabber',
      desc: 'Automatically query APIs of major tube sites to import thousands of videos matching tags, length, and categories.',
      val: '$59 Value'
    },
    {
      title: 'Mass Video Embedder',
      desc: 'Allows bulk pasting of video links and automatically parses player targets, creating video posts instantly.',
      val: '$29 Value'
    },
    {
      title: 'Single Video Embedder',
      desc: 'Quickly embed single external videos or self-hosted files directly inside page posts in seconds.',
      val: '$19 Value'
    },
    {
      title: 'Premium Plans Paywall',
      desc: 'Built-in subscription gateway configuration to paywall content, manage tokens, and restrict HD clips for premium users.',
      val: '$49 Value'
    },
  ]

  const features = [
    { title: 'Completely Customizable', desc: 'Over 150 Options in the WordPress Customizer to toggle features easily.' },
    { title: 'Featured Carousel', desc: 'Display trending, hot, or sponsored videos in a gorgeous homepage slider.' },
    { title: 'Photos & Gifs', desc: 'Supports custom image galleries, model photo books, and autoplaying GIF thumbnails.' },
    { title: 'Built-in Advertisements', desc: 'Optimized banners, pop-unders, and link placements configured straight from options.' },
    { title: 'Video Trailers', desc: 'Previews video clips on thumbnail hover, keeping visitors engaged on video grids.' },
    { title: 'SEO Optimized', desc: 'Clean HTML, structured schema tags, and fast assets ensure high rank on search engines.' },
    { title: 'Advanced Filtering', desc: 'Enables users to filter lists by length, actor, tags, quality, or release date.' },
    { title: 'User Uploads Area', desc: 'Allows community members, creators, and models to register and upload content.' },
    { title: 'Responsive Design', desc: 'Perfect grids and player alignments that look striking on phones, tablets, & desktops.' },
    { title: 'Community Social Feed', desc: 'Users can publish posts, like content, follow models, and build personal profiles.' },
    { title: 'Actor & Stars Pages', desc: 'Custom dedicated layouts for models containing bios, social links, and uploaded items.' },
    { title: 'Automated Setup', desc: 'Import demo content and settings with one click to get your site ready in 5 minutes.' },
  ]

  const comparisonItems = [
    { name: 'Complete Legal Compliance (18+ disclaimer, cookies)', pornx: true, other: false },
    { name: 'Advanced Theme Customizer (150+ custom options)', pornx: true, other: false },
    { name: 'Customizable Popups (Confirmations, ads, redirects)', pornx: true, other: false },
    { name: 'Auto-import 1,000+ HD Videos instantly', pornx: true, other: false },
    { name: 'Built-in Premium Paywall & Membership Plan System', pornx: true, other: false },
    { name: 'Automated Email notification templates (20+ types)', pornx: true, other: false },
    { name: 'Community Social portal (Feed wall, user posts)', pornx: true, other: false },
    { name: 'Watch history, bookmarks, and custom playlists', pornx: true, other: false },
    { name: 'User upload dashboard (View stats, edit uploaded clips)', pornx: true, other: false },
    { name: 'Advanced sidebar search filters (Length, orientation, stars)', pornx: true, other: false },
    { name: 'Model subscription notifications for users', pornx: true, other: false },
    { name: 'Report system, support tickets, and direct member ban panel', pornx: true, other: false },
    { name: 'Pre-written legal agreements and terms files', pornx: true, other: false },
    { name: 'Custom post analytics (Manually adjust views/likes per clip)', pornx: true, other: false },
    { name: 'Mass grabber, player, embedder plugins included free', pornx: true, other: false },
  ]

  const faqItems = [
    {
      q: 'Can I use HexTheme on more than one domain?',
      a: 'Each purchase grants a license valid for a single domain name. However, if you are looking to build a large tube network across multiple domains, you can reach out to our team to get a multi-purchase discount!'
    },
    {
      q: 'Why should I pick HexTheme over WP-Script?',
      a: 'Unlike generic themes like WP-Script, HexTheme includes all essential plugins (grabbers, players, paywall tools) directly in the package instead of billing you extra for them. It is fully GDPR/18+ compliant, supports deep customization, and includes a full social community system.'
    },
    {
      q: 'Will you really make my porn website ready within hours?',
      a: 'Yes! Using our one-click demo content importer, you can set up any of the 9 niche layouts along with over a thousand videos in less than an hour. If you buy our hosting plans, our support team can handle the entire setup for you free of charge!'
    },
    {
      q: 'Can I switch between the different demos after I buy?',
      a: 'Absolutely! You are not restricted to one look. You can toggle between Default, Hentai, Light UI, Fetish, and other niche styles instantly from your WordPress dashboard admin options.'
    },
    {
      q: 'Can you help me customize the HexTheme theme?',
      a: 'Yes. Our dedicated support team can help you adjust the theme, set up custom colors, configure player settings, and optimize ad placements. We also offer custom development services if you need unique custom features.'
    },
    {
      q: 'What are the hosting requirements for HexTheme?',
      a: 'HexTheme runs smoothly on standard WordPress servers. However, since video sites generate a lot of traffic and embed queries, we highly recommend hosting your site on an offshore VPS (like our Blessed Elf or Mischievous Noble plans) to avoid DMCA takedowns and maintain fast speeds.'
    },
    {
      q: 'Will the theme package include everything I need to start my site?',
      a: 'The package includes the HexTheme theme, 9 niche demos, and all premium plugins. To make it live, you will only need a domain name and an offshore hosting plan. All features and media imports will work immediately after activation.'
    },
    {
      q: 'Is the theme purchase refundable?',
      a: 'Due to the digital nature of the software and single-domain license activations, theme purchases are non-refundable. However, we provide complete setup assistance and support to ensure your site is running exactly how you want.'
    },
    {
      q: 'Can I change the HexTheme source code myself?',
      a: 'Yes, the theme source code is open-source, and you can make modifications. However, custom modifications might block you from installing automated theme updates. We suggest using child themes or reaching out to our support team for code tweaks.'
    }
  ]

  const testimonials = [
    {
      name: 'Amir Haddad',
      site: 'www.slutseason.com',
      quote: 'They created my site and set up everything for me. I could not be happier with how the design turned out, and the custom layouts are extremely responsive.'
    },
    {
      name: 'James Morgan',
      site: 'www.porntrex.com',
      quote: 'Super experienced support team. They resolved my hosting firewall issue in minutes, migrated my old database, and set up all grabber plugins free of charge.'
    },
    {
      name: 'Krish Roshan',
      site: 'www.sinful.co.uk',
      quote: 'I own six adult tubes and experiment with different scripts. The HexTheme theme was by far the easiest and fastest package to set up and scale.'
    }
  ]

  const adminFeatures = [
    {
      title: '1-Click Mass Video Importer',
      desc: 'Import thousands of videos matching tags, categories, or keywords in just one click from top adult websites like Pornhub, XVideos, xHamster, and more.',
      icon: Zap,
      badge: 'Mass Grabber'
    },
    {
      title: 'Single Video Importer',
      desc: 'Easily import single videos by pasting their URLs or iframe embed codes. Supports full custom player configurations, tags, and actor settings.',
      icon: Play,
      badge: 'Single Import'
    },
    {
      title: 'Secure Admin Access (ID/Password)',
      desc: 'Comes with a private, dedicated admin login. You can create administrator accounts, customize login details, and change credentials anytime.',
      icon: Lock,
      badge: 'Security'
    },
    {
      title: 'Ad Network URL Manager',
      desc: 'Integrate ad scripts and redirect URLs from providers like HilltopAds, Adsterra, ExoClick, and others directly from the dashboard to start earning.',
      icon: DollarSign,
      badge: 'Monetization'
    },
    {
      title: 'Detailed Video Walkthrough Guide',
      desc: 'Includes a step-by-step video guide explaining exactly how to log in, configure tags, fetch videos, edit titles, and place ad banners.',
      icon: PlayCircle,
      badge: 'Walkthrough'
    },
    {
      title: 'Unlimited Categories & Tag Manager',
      desc: 'Easily manage, create, and customize categories, adult star profiles, and tags to keep your videos perfectly organized.',
      icon: Grid,
      badge: 'Manager'
    }
  ]

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-cyan-500 selection:text-white">
      {/* Glow overlays */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-cyan-500/10 via-emerald-500/5 to-transparent pointer-events-none z-0" />
      <div className="absolute top-[1200px] right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 md:px-8 max-w-7xl mx-auto z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400/15 via-orange-500/15 to-rose-600/15 border border-amber-500/30 text-amber-400 font-extrabold text-xs tracking-wider uppercase mb-6 animate-pulse">
          <DollarSign size={14} className="text-amber-400" />
          <span>💰 Start Earning Passive Income: Earn $1,000–$50,000+ Daily from Ads</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight max-w-5xl mx-auto">
          Create Your Own{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400">
            Porn Website
          </span>{' '}
          & Earn More Than{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 animate-pulse">
            $1000 Daily
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
          Turn adult traffic into pure passive income! We deliver a fully automated, compliance-ready adult video portal pre-loaded with 3,000+ HD videos. Simply integrate ad networks and start making <strong className="text-emerald-400 font-black">$1,000–$50,000+ per day</strong>. Full design, setup & secure offshore hosting done for you in under 24 hours!
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <a
            href="#pricing-countdown"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:via-teal-400 hover:to-emerald-400 text-white font-extrabold text-base rounded-lg shadow-xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Claim Offer ($75 Only)
          </a>
          <a
            href="#demos-grid"
            className="px-8 py-4 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/50 hover:border-slate-600 font-bold text-base rounded-lg backdrop-blur-sm transition-all duration-300"
          >
            Explore {nichesLoading ? '' : niches.length > 0 ? `${niches.length} ` : ''}Demos
          </a>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { label: '9 Niche Layouts', desc: 'Classic, Hentai, Light, etc.', color: 'from-cyan-400 to-blue-500' },
            { label: '6 Premium Plugins', desc: 'Grabbers & player pre-packed', color: 'from-cyan-400 to-emerald-500' },
            { label: 'Legal Compliance', desc: '18+ Disclaimer & cookies ready', color: 'from-amber-400 to-orange-500' },
            { label: 'Instant Importer', desc: 'Import 1000+ HD videos in 1-click', color: 'from-emerald-400 to-teal-500' }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-xl hover:border-slate-700/80 transition-all duration-300">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center font-bold text-white mb-4 mx-auto shadow-md`}>
                {idx + 1}
              </div>
              <h3 className="font-extrabold text-sm text-slate-100">{item.label}</h3>
              <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Video Demonstration Section */}
      <section id="demo-video" className="py-16 px-4 md:px-8 max-w-5xl mx-auto border-t border-slate-900 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-black tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            Live System Demo
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-100 mt-4">
            See the Website & Admin Panel in Action
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-3 leading-relaxed">
            Watch our step-by-step walkthrough to see how easily you can manage your website, import thousands of HD videos, customize themes, and configure ad networks using the advanced admin panel.
          </p>
        </div>

        {/* Video Player Box with Premium Neon Glow */}
        <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-slate-850 bg-slate-950 p-2 md:p-3 shadow-2xl shadow-cyan-500/5 group hover:border-cyan-500/30 transition-all duration-500">
          {/* Glow backdrop effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-emerald-500/5 opacity-50 pointer-events-none rounded-3xl" />
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-cyan-500/25 to-emerald-500/25 opacity-0 group-hover:opacity-100 transition-opacity blur duration-700 pointer-events-none" />
          
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900">
            <video
              className="w-full h-full object-contain"
              src="https://res.cloudinary.com/dhdwfueqh/video/upload/v1782296783/video_20260624_153842_edit_1_kbhfia.mp4"
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </div>

        {/* Quick Video Highlights/Features */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-center">
          <div className="p-4 bg-slate-900/30 border border-slate-850 rounded-xl">
            <h4 className="text-sm font-bold text-slate-200">🛠️ Admin Panel Tour</h4>
            <p className="text-xs text-slate-500 mt-1">See the secure login & dashboard options</p>
          </div>
          <div className="p-4 bg-slate-900/30 border border-slate-850 rounded-xl">
            <h4 className="text-sm font-bold text-slate-200">⚡ Instant 1-Click Import</h4>
            <p className="text-xs text-slate-500 mt-1">Watch 1,000+ HD videos loaded instantly</p>
          </div>
          <div className="p-4 bg-slate-900/30 border border-slate-850 rounded-xl">
            <h4 className="text-sm font-bold text-slate-200">🤑 Monetization Setup</h4>
            <p className="text-xs text-slate-500 mt-1">Learn how to easily integrate ad networks</p>
          </div>
        </div>
      </section>

      {/* Niches / Demos Section */}
      <section id="demos-grid" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Our Premium Demos
          </h2>
          <p className="text-slate-400 mt-4">
            Swap layouts inside your administration area instantly. No code tweaks required, just select the niche styling you want and launch!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {nichesLoading ? (
            // Skeleton loading cards
            [...Array(6)].map((_, idx) => (
              <div key={idx} className="group bg-slate-900/30 border border-slate-800/80 rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-slate-800" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-slate-700 rounded w-3/4" />
                  <div className="h-3 bg-slate-800 rounded w-full" />
                  <div className="h-3 bg-slate-800 rounded w-5/6" />
                  <div className="mt-4 flex gap-3">
                    <div className="h-8 bg-slate-700 rounded flex-1" />
                    <div className="h-8 bg-slate-700 rounded flex-1" />
                  </div>
                </div>
              </div>
            ))
          ) : niches.length === 0 ? (
            <div className="col-span-3 text-center text-slate-500 py-12">
              <p>No demos available yet. Check back soon!</p>
            </div>
          ) : (
            niches.map((niche, idx) => (
              <div key={niche._id || idx} className="group bg-slate-900/30 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700/80 hover:shadow-2xl hover:shadow-cyan-500/5 transition-all duration-300">
                <div className="relative overflow-hidden aspect-video bg-slate-800">
                  <img
                    src={`${apiUrl}/uploads/${niche.image}`}
                    alt={niche.websiteTitle}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-200">
                    {niche.websiteTitle}
                  </h3>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                    {niche.websiteDesc}
                  </p>

                  <div className="mt-6 flex gap-3">
                    {niche.livePreviewUrl && (
                      <a
                        href={niche.livePreviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700/50 hover:border-slate-600 text-xs font-bold transition-all duration-200"
                      >
                        <Eye size={14} />
                        <span>Live Preview</span>
                      </a>
                    )}
                    <a
                      href={
                        niche.telegramUrl
                          ? niche.telegramUrl
                          : `https://t.me/hexTheme?text=${encodeURIComponent(
                              `Hi, I'm interested in the "${niche.websiteTitle}" theme! Can you set it up for me? 🚀`
                            )}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-md shadow-emerald-600/10 transition-all duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16" className="shrink-0">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
                      </svg>
                      <span>Get Layout</span>
                    </a>
                  </div>

                  {/* Admin Demo Button — only shows if websiteDemoUrl is set */}
                  {niche.websiteDemoUrl && (
                    <a
                      href={niche.websiteDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all duration-200"
                      style={{
                        background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(109,40,217,0.1) 100%)',
                        border: '1px solid rgba(139,92,246,0.35)',
                        color: '#c4b5fd',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139,92,246,0.25) 0%, rgba(109,40,217,0.2) 100%)'
                        e.currentTarget.style.borderColor = 'rgba(139,92,246,0.6)'
                        e.currentTarget.style.color = '#ddd6fe'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(109,40,217,0.1) 100%)'
                        e.currentTarget.style.borderColor = 'rgba(139,92,246,0.35)'
                        e.currentTarget.style.color = '#c4b5fd'
                      }}
                    >
                      <Settings size={13} />
                      <span>View Admin Demo</span>
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Admin Panel Features Grid */}
        <div className="mt-24 border-t border-slate-900/60 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black tracking-wider uppercase">
              Admin Panel Features
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-100 mt-3 tracking-tight">
              Powerful Custom Admin Panel Functionality
            </h3>
            <p className="text-slate-400 text-sm md:text-base mt-4 leading-relaxed">
              Take full control of your portal with a dedicated admin dashboard built for effortless video importing, secure configuration, and monetization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {adminFeatures.map((feat, idx) => {
              const Icon = feat.icon
              return (
                <div key={idx} className="bg-slate-900/30 border border-slate-800/80 p-6 rounded-2xl hover:border-slate-700/80 hover:shadow-2xl hover:shadow-cyan-500/5 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                        <Icon size={20} />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider">
                        {feat.badge}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-100">{feat.title}</h4>
                    <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Done-For-You Turnkey Section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="bg-gradient-to-br from-cyan-950/20 via-slate-900/60 to-emerald-950/20 border border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-cyan-500/5 blur-[50px] pointer-events-none rounded-full" />
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-black tracking-wider uppercase">
              Done-For-You Turnkey Service
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3">
              We Customize & Host Everything For You!
            </h2>
            <p className="text-slate-400 mt-4 text-sm md:text-base leading-relaxed">
              Whichever niche layout you select, our professional team handles the entire technical setup. 
              Get a fully configured, live website in under 24 hours without touching a line of code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950/60 border border-slate-850 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                <Settings size={20} />
              </div>
              <h3 className="text-base font-extrabold text-slate-100">Full Branding Customization</h3>
              <p className="text-xs text-slate-450 mt-2 leading-relaxed">
                Provide us your site name and logo, and we will update all assets for you. If you don't have a logo, we will create a text logo, change the colors, and brand the website theme fully to your liking.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-850 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
                <Timer size={20} />
              </div>
              <h3 className="text-base font-extrabold text-slate-100">24-Hour Live Delivery</h3>
              <p className="text-xs text-slate-450 mt-2 leading-relaxed">
                No waiting around. We deploy the theme files, configure the database, setup the host, and deliver a fully functional, live website in less than 24 hours.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-850 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
                <Globe size={20} />
              </div>
              <h3 className="text-base font-extrabold text-slate-100">Host & Domain Packages</h3>
              <p className="text-xs text-slate-450 mt-2 leading-relaxed">
                If you already have a domain, we setup & host the site for just <strong>$75</strong>. If you do not have a domain, we register it for you (approx. <strong>$10 extra</strong>) and deliver the hosted site + domain for <strong>$85</strong>!
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-850 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                <Play size={20} />
              </div>
              <h3 className="text-base font-extrabold text-slate-100">3,000+ Porn Videos Pre-loaded</h3>
              <p className="text-xs text-slate-450 mt-2 leading-relaxed">
                We pre-load your website with over 3,000 high-quality adult video embeds and database tags, so your website is packed with content for visitors right from the start.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-850 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                <Search size={20} />
              </div>
              <h3 className="text-base font-extrabold text-slate-100">100% SEO Friendly</h3>
              <p className="text-xs text-slate-450 mt-2 leading-relaxed">
                Your site comes pre-configured with SEO optimization, title tags, responsive layout files, and Google XML sitemaps to ensure fast search engine indexing and organic traffic rankings.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-850 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
                <Zap size={20} />
              </div>
              <h3 className="text-base font-extrabold text-slate-100">One-Click Multi-Source Importer</h3>
              <p className="text-xs text-slate-450 mt-2 leading-relaxed">
                Easily import content! Access the admin panel dashboard to insert grabber feeds or single video embeds from platforms like XHamster, Pornhub, and XVideos in just one click.
              </p>
            </div>
          </div>

          {/* Delivery Video Guide Callout */}
          <div className="mt-8 border-t border-slate-800/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                <PlayCircle size={20} className="animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-200">Detailed Video Walkthrough Guide Included</h4>
                <p className="text-xs text-slate-500 mt-0.5">Along with your live site credentials, we deliver a recorded guide video explaining step-by-step how to manage, edit, and expand your adult tube portal.</p>
              </div>
            </div>
            <a
              href="#payment-process"
              className="w-full md:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-600 hover:from-cyan-400 hover:to-emerald-500 text-white text-xs font-extrabold text-center shadow-lg transition-all duration-300"
            >
              Get Turnkey Setup Now
            </a>
          </div>
        </div>
      </section>

      {/* Ordering & Payment Process Section */}
      <section id="payment-process" className="py-12 px-4 md:px-8 max-w-7xl mx-auto border-t border-slate-900 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black tracking-wider uppercase">
            Order Process
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3">
            Simple 3-Step Ordering & Payment Process
          </h2>
          <p className="text-slate-400 mt-4 text-sm md:text-base leading-relaxed">
            We work on a transparent 50/50 payment split. Direct message us on Telegram to start building your custom adult portal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="bg-slate-900/30 border border-slate-800/80 p-6 rounded-2xl relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center font-black text-white shadow-lg">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-100 mt-2">Send Details on Telegram</h3>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Click any order button on this page to DM us directly at <a href="https://t.me/hexTheme" target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-bold hover:underline">@hexTheme</a>. 
              Provide us your selected niche theme choice, desired website name, logo files (or text preferences), and server details.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-900/30 border border-slate-800/80 p-6 rounded-2xl relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 flex items-center justify-center font-black text-white shadow-lg">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-100 mt-2">Pay 50% Advance</h3>
            <p className="text-slate-455 text-sm mt-3 leading-relaxed">
              We work on a <strong>50% advance payment</strong> basis to cover offshore hosting and initial setups. Once received, our developers immediately begin customizing your templates, setting up your domain (if needed), configuring your offshore hosting, and loading the 3,000+ video database.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-900/30 border border-slate-800/80 p-6 rounded-2xl relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center font-black text-white shadow-lg">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-100 mt-2">Verify & Pay Remaining 50%</h3>
            <p className="text-slate-455 text-sm mt-3 leading-relaxed">
              Within 24 hours, we will deliver your completed website. You can explore and verify everything is working perfectly. 
              Pay the <strong>remaining 50% balance</strong>, and we will instantly hand over admin credentials and your walkthrough video guide!
            </p>
          </div>
        </div>

        {/* Telegram Direct Order Banner */}
        <div className="mt-12 text-center">
          <a
            href="https://t.me/hexTheme"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-base rounded-lg shadow-xl shadow-cyan-500/15 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <MessageSquare size={18} />
            <span>Chat on Telegram to Order Now</span>
          </a>
          <p className="text-xs text-slate-500 mt-3">
            Have custom requirements or extra queries? Message us directly, we are available 24/7!
          </p>
        </div>
      </section>

      {/* ============ CUSTOM WEBSITE DEVELOPMENT SECTION ============ */}
      <section id="custom-website" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-500/15 via-purple-500/15 to-fuchsia-500/15 border border-violet-500/30 text-violet-400 text-xs font-black tracking-wider uppercase mb-4">
            <Zap size={12} className="text-fuchsia-400" />
            Custom Development
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Want a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">
              100% Custom Website?
            </span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm md:text-base leading-relaxed">
            Beyond our ready-made HexTheme templates, we also build completely custom websites from scratch — any design, any features, any niche. From domain registration to hosting setup, we handle everything end to end.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Card 1 — WordPress Custom */}
          <div className="relative bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 overflow-hidden hover:border-violet-500/40 hover:shadow-2xl hover:shadow-violet-500/5 transition-all duration-300">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-violet-600/8 blur-[60px] rounded-full pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 border border-violet-500/30 flex items-center justify-center">
                <Globe size={22} className="text-violet-400" />
              </div>
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full">WordPress</span>
                <h3 className="text-xl font-extrabold text-slate-100 mt-0.5">Custom WordPress Site</h3>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-end gap-2 mb-6">
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">$500</span>
              <span className="text-slate-500 text-sm mb-2 font-medium">/ one-time</span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Tell us the design, colors, layout, and features you want — we build your entire WordPress website exactly the way you envision it. No hidden charges, no surprises.
            </p>

            {/* Includes */}
            <ul className="space-y-3 mb-8">
              {[
                'Fully custom WordPress design (your choice)',
                'Personal Domain Name included',
                'Hostinger Hosting setup & configured',
                'Adult theme with your niche & branding',
                '3,000+ videos pre-loaded',
                'Full SEO setup & sitemap',
                'Admin panel + video walkthrough guide',
                'Lifetime support on Telegram',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={9} className="text-violet-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={`https://t.me/hexTheme?text=${encodeURIComponent('Hi! I want a Custom WordPress Adult Website. Can you help me? 🚀')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-lg shadow-violet-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquare size={15} />
              Order WordPress Site — $500
            </a>
          </div>

          {/* Card 2 — Custom Coded */}
          <div className="relative bg-slate-900/40 border border-fuchsia-800/40 rounded-3xl p-8 overflow-hidden hover:border-fuchsia-500/50 hover:shadow-2xl hover:shadow-fuchsia-500/8 transition-all duration-300">
            {/* Popular Badge */}
            <div className="absolute top-5 right-5 px-3 py-1 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white text-[10px] font-black tracking-widest uppercase rounded-full shadow-lg shadow-fuchsia-500/30">
              Premium
            </div>

            {/* Glow */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-fuchsia-600/8 blur-[60px] rounded-full pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-pink-600/20 border border-fuchsia-500/30 flex items-center justify-center">
                <Zap size={22} className="text-fuchsia-400" />
              </div>
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase text-fuchsia-400 bg-fuchsia-500/10 px-2 py-0.5 rounded-full">Next.js / React / Node</span>
                <h3 className="text-xl font-extrabold text-slate-100 mt-0.5">Custom Coded Website</h3>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-end gap-2 mb-2">
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400">$700</span>
              <span className="text-slate-400 text-2xl font-black mb-1">– $800</span>
            </div>
            <p className="text-slate-500 text-xs mb-6 font-medium">/ one-time · price depends on complexity</p>

            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              If you want a website beyond WordPress — built with Next.js, React.js, or Node.js — this is the package for you. Lightning-fast performance, fully scalable architecture, and 100% custom design built from the ground up.
            </p>

            {/* Includes */}
            <ul className="space-y-3 mb-8">
              {[
                'Full custom design (Figma to code)',
                'Next.js / React.js / Node.js development',
                'Personal Domain Name included',
                'KVM1 VPS server (dedicated resources)',
                'VPS setup, deployment & SSL configured',
                'Custom admin panel for content management',
                'Full SEO + sitemap + meta tags',
                'Source code ownership — yours forever',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={9} className="text-fuchsia-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={`https://t.me/hexTheme?text=${encodeURIComponent('Hi! I want a Custom Coded Website (Next.js/React). Can you help me? 🚀')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white font-extrabold text-sm shadow-lg shadow-fuchsia-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquare size={15} />
              Order Custom Site — $700–$800
            </a>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-10 max-w-3xl mx-auto bg-slate-900/30 border border-slate-800/60 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <AlertCircle size={22} />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-200">Not sure which package to choose?</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              No worries — just message us on Telegram with your requirements. We offer a free consultation and suggest the best option for your budget and goals, with zero pressure.
            </p>
          </div>
          <a
            href="https://t.me/hexTheme"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 text-xs font-extrabold transition-all duration-200 whitespace-nowrap"
          >
            Free Consultation →
          </a>
        </div>
      </section>

      {/* Countdown Promo Banner */}
      <section id="pricing-countdown" className="py-16 px-4 md:px-8 bg-slate-900/30 border-y border-slate-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-slate-100 tracking-tight">
              Limited Time Special Promo Offer!
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Setup your adult website with instant deployment under 24 hours. Free support included.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-4 text-left">
              <div className="text-slate-500 line-through text-lg font-bold">$149.00</div>
              <div className="text-emerald-400 text-3xl font-black">$75.00</div>
              <div className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold">SAVE $74</div>
            </div>
          </div>

          {/* Real Countdown Timer Widget */}
          <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center font-black text-lg text-cyan-400 border border-slate-800">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase mt-1.5">Hours</span>
            </div>
            <div className="text-slate-700 font-bold text-xl mb-4">:</div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center font-black text-lg text-cyan-400 border border-slate-800">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase mt-1.5">Minutes</span>
            </div>
            <div className="text-slate-700 font-bold text-xl mb-4">:</div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center font-black text-lg text-cyan-400 border border-slate-800">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase mt-1.5">Seconds</span>
            </div>

            <div className="ml-4 border-l border-slate-800 pl-6 hidden sm:block">
              <a
                href="https://t.me/hexTheme"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-emerald-600 hover:from-cyan-400 hover:to-emerald-500 text-white font-extrabold text-xs rounded-lg shadow-md tracking-wider uppercase transition-all duration-200"
              >
                Buy For $75
              </a>
            </div>
          </div>

          <div className="w-full sm:hidden">
            <a
              href="https://t.me/hexTheme"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex justify-center py-4 bg-gradient-to-r from-cyan-500 to-emerald-600 hover:from-cyan-400 hover:to-emerald-500 text-white font-extrabold text-sm rounded-lg shadow-md uppercase transition-all duration-200"
            >
              Get Started For $75
            </a>
          </div>
        </div>
      </section>

      {/* Free Premium Plugins Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-wider uppercase">
            All Addons Included
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3">
            Save Over $200 in Plugin Expenses
          </h2>
          <p className="text-slate-400 mt-4">
            Unlike other platforms that charge extra for grabbers and video players, HexTheme ships with all six essential premium plugins completely free of charge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plugins.map((plug, idx) => (
            <div key={idx} className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl hover:border-slate-700/80 transition-all duration-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 py-1.5 px-3 bg-emerald-500/10 text-emerald-400 font-extrabold text-[10px] rounded-bl-xl border-l border-b border-emerald-500/20">
                {plug.val}
              </div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6">
                <Zap size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-100">{plug.title}</h3>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                {plug.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Grid List */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-slate-950 bg-slate-950">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Packed with Advanced Features
          </h2>
          <p className="text-slate-400 mt-4">
            HexTheme contains everything needed to monetize, grow, and customize your site with simple clicks in the options panel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div key={idx} className="bg-slate-900/20 border border-slate-900 p-5 rounded-xl hover:border-slate-800/80 transition-all duration-200">
              <div className="text-emerald-400 font-bold mb-3">
                <Check size={18} />
              </div>
              <h3 className="font-extrabold text-sm text-slate-200">{feat.title}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            HexTheme vs WP-Script
          </h2>
          <p className="text-slate-400 mt-4">
            See the features that set us apart from competitors. WP-Script charges extra for individual addons, making setup expensive.
          </p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 bg-slate-900/80 p-5 font-bold border-b border-slate-800 text-xs md:text-sm">
            <div className="col-span-6 md:col-span-8 text-slate-300">Feature Highlight</div>
            <div className="col-span-3 md:col-span-2 text-center text-cyan-400 font-black">HexTheme ($75)</div>
            <div className="col-span-3 md:col-span-2 text-center text-slate-500">WP-Script ($421)</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-800/60">
            {comparisonItems
              .slice(0, showMoreBenefits ? comparisonItems.length : 5)
              .map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 p-5 text-xs md:text-sm hover:bg-slate-900/20 transition-all">
                  <div className="col-span-6 md:col-span-8 text-slate-300 font-medium">{item.name}</div>
                  <div className="col-span-3 md:col-span-2 flex justify-center text-emerald-400">
                    <Check size={18} />
                  </div>
                  <div className="col-span-3 md:col-span-2 flex justify-center text-red-500/70">
                    <X size={18} />
                  </div>
                </div>
              ))}
          </div>

          {/* Expand Button */}
          <div className="p-4 bg-slate-900/30 border-t border-slate-800/60 flex justify-center">
            <button
              onClick={() => setShowMoreBenefits(!showMoreBenefits)}
              className="flex items-center gap-1.5 py-2 px-4 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700/50 transition-all duration-200"
            >
              <span>{showMoreBenefits ? 'Show Less' : 'Show All 15 Features'}</span>
              {showMoreBenefits ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        </div>

        {/* Free Extras Callout */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { title: 'Theme Installation', desc: 'Free setup assistance' },
            { title: 'Lifetime Updates', desc: 'Automatic core features' },
            { title: 'Lifelong Support', desc: '24/7 dedicated channels' },
            { title: 'Marketing Consulting', desc: 'Free initial analysis' }
          ].map((extra, idx) => (
            <div key={idx} className="p-4 bg-slate-900/20 border border-slate-900 rounded-xl">
              <div className="text-amber-400 font-extrabold text-sm">{extra.title}</div>
              <div className="text-[11px] text-slate-500 mt-1">{extra.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-8 bg-slate-900/10 border-t border-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-slate-400 mt-4">
              Real feedback from clients hosting turnkey adult platforms with our templates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl relative shadow-lg">
                <div className="flex items-center gap-0.5 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{test.quote}"
                </p>
                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <div className="font-extrabold text-sm text-slate-200">{test.name}</div>
                  <div className="text-xs text-cyan-400 mt-0.5 font-medium">{test.site}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto border-t border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 mt-4">
            Answers to typical inquiries regarding theme licensing, hosting setups, and customization support.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((faq, idx) => {
            const isOpen = !!openFaqs[idx]
            return (
              <div
                key={idx}
                className="bg-slate-900/30 border border-slate-800/80 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm md:text-base font-bold text-slate-200 hover:text-white hover:bg-slate-900/40 transition-all duration-200"
                >
                  <span>{faq.q}</span>
                  <div className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 border-t border-slate-900 text-xs md:text-sm text-slate-400 leading-relaxed bg-slate-950/20">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Final CTA Footer */}
      <section className="relative py-24 px-4 md:px-8 max-w-5xl mx-auto text-center border-t border-slate-900 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-600/10 blur-[80px] pointer-events-none rounded-full" />

        <h2 className="text-3xl md:text-5xl font-black text-slate-100">
          Ready to Start Your Empire?
        </h2>
        <p className="text-slate-400 text-sm md:text-base mt-4 max-w-xl mx-auto leading-relaxed">
          Buy HexTheme today for just $75. Build, launch, and monetize a premium, responsive, and compliance-friendly adult video portal instantly.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <a
            href="https://t.me/hexTheme"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:via-teal-400 hover:to-emerald-400 text-white font-extrabold text-sm rounded-lg shadow-xl shadow-cyan-500/20 transition-all duration-300"
          >
            Buy HexTheme Theme Now ($75)
          </a>
          <Link
            href="/contact"
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/50 hover:border-slate-600 font-bold text-sm rounded-lg flex items-center gap-2 transition-all duration-300"
          >
            <MessageSquare size={16} />
            <span>Contact Support</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
