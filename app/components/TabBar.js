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

          {/* Get Your Own Site link below */}
          <Link
            href="/get-your-own-site"
            className="mt-1 flex items-center space-x-1.5 px-4 py-1 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500 text-white font-extrabold text-xs rounded-full border border-amber-300/20 shadow-md hover:scale-105 transition-all duration-300"
          >
            <span>Get Your Own Porn Website ⭐</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
