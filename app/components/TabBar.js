'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, PlayCircle } from 'lucide-react'

export default function TabBar() {
  const router = useRouter()
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState('home')
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const containerRef = useRef(null)

  const isReelsPage = pathname?.startsWith('/reels')

  useEffect(() => {
    if (pathname === '/') {
      setActiveTab('home')
    } else if (pathname.startsWith('/reels')) {
      setActiveTab('reels')
    }
  }, [pathname])

  // Scroll effect - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'reels', label: 'Reels', icon: PlayCircle, href: '/reels' },
  ]

  const handleTabClick = (tabId, href) => {
    setActiveTab(tabId)
    router.push(href)
  }

  // Swipe handling
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(0)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && activeTab === 'home') {
      handleTabClick('reels', '/reels')
    }

    if (isRightSwipe && activeTab === 'reels') {
      handleTabClick('home', '/')
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && activeTab === 'reels') {
        handleTabClick('home', '/')
      }
      if (e.key === 'ArrowRight' && activeTab === 'home') {
        handleTabClick('reels', '/reels')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeTab])

  return (
    <div
      ref={containerRef}
      className={`z-40 transition-transform duration-300 ease-in-out ${isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'} ${isReelsPage ? 'fixed top-0 left-0 right-0 bg-transparent' : 'sticky top-16 bg-gray-900/95 backdrop-blur-md border-b border-gray-800'}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-2">
          {/* Tabs row: Home, Reels */}
          <div className="flex items-center justify-center space-x-2 pb-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id, tab.href)}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all duration-300 relative ${isActive
                      ? 'bg-white text-black font-black'
                      : 'text-white bg-transparent font-bold'
                    }`}
                >
                  <Icon size={18} />
                  <span className="font-black tracking-wide">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Get Your Own Site link below - High engagement CTA */}
          <div className="relative mt-2 flex items-center justify-center">
            <Link
              href="/get-your-own-site"
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #8b5cf6 100%)',
                boxShadow: '0 0 16px rgba(236, 72, 153, 0.5)',
                position: 'relative',
                overflow: 'hidden',
                animation: 'ctaPulse 2.5s ease-in-out infinite',
                willChange: 'transform, opacity',
              }}
              className="relative z-10 flex items-center gap-2 px-5 py-2 text-white font-black text-sm rounded-full border-2 border-yellow-300/50 hover:scale-105 active:scale-95 transition-transform duration-150"
            >
              {/* Shimmer — uses transform instead of left for GPU acceleration */}
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '50%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                  transform: 'translateX(-200%)',
                  animation: 'shimmerGPU 2.5s ease-in-out infinite',
                  willChange: 'transform',
                }}
              />
              <span>🔥</span>
              <span>Get Your Own Porn Website</span>
              <span
                style={{
                  background: '#facc15',
                  color: '#000',
                  fontSize: '9px',
                  fontWeight: 900,
                  padding: '2px 7px',
                  borderRadius: '999px',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                ⭐ $75 ONLY
              </span>
            </Link>
          </div>

          <style>{`
            @keyframes ctaPulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.04); opacity: 0.92; }
            }
            @keyframes shimmerGPU {
              0% { transform: translateX(-200%); }
              60%, 100% { transform: translateX(400%); }
            }
          `}</style>
        </div>
      </div>
    </div>
  )
}
