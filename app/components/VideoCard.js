'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play, Clock, Eye, Star } from 'lucide-react'
import { api } from '../lib/api'

export default function VideoCard({ video, priority = false }) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef(null)
  const observerRef = useRef(null)
  const videoElementRef = useRef(null)
  
  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Intersection Observer for scroll-based video preview (mobile only)
  useEffect(() => {
    if (!videoRef.current || !video?.previewImage) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
          } else {
            setIsInView(false)
          }
        })
      },
      {
        threshold: 1.0, // 100% visible for mobile
        rootMargin: '0px', // No margin for precise 100% detection
      }
    )

    observer.observe(videoRef.current)
    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [video?.previewImage])

  // Control video playback based on visibility and hover state
  useEffect(() => {
    if (!videoElementRef.current || !video?.previewImage) return

    const shouldPlay = video.previewImage && !videoError && (
      (isMobile && isInView) || // Mobile: play when in view
      (!isMobile && isHovered)   // Desktop: play on hover
    )

    if (shouldPlay) {
      videoElementRef.current.play().catch(e => console.log('Video play failed:', e))
    } else {
      videoElementRef.current.pause()
      if (isMobile && !isInView) {
        videoElementRef.current.currentTime = 0
      }
    }
  }, [isHovered, isInView, isMobile, video?.previewImage, videoError])

  // Get video number with multiple fallbacks
  const getVideoNumber = () => {
    return video.dynamicVideoNo || video.videoNo || null;
  }

  // Format view count
  const formatViews = (views) => {
    if (!views) return '0'
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
    return views.toString()
  }

  // Format duration with random seconds
  const formatDuration = (minutes) => {
    if (!minutes) return '0:00'
    const mins = parseInt(minutes)
    const hours = Math.floor(mins / 60)
    const remainingMins = mins % 60
    
    // Generate random seconds (0-59) based on video ID for consistency
    const videoId = video._id || video.id || '0'
    const seed = videoId.slice(-2) // Use last 2 characters of ID as seed
    const randomSeconds = parseInt(seed, 16) % 60 // Convert to number and get 0-59
    const formattedSeconds = randomSeconds.toString().padStart(2, '0')
    
    if (hours > 0) {
      return `${hours}:${remainingMins.toString().padStart(2, '0')}:${formattedSeconds}`
    }
    return `${mins}:${formattedSeconds}`
  }

  // Build URL segment: {id}-{title-slug}
  const slugify = (str = '') => String(str).toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const getVideoUrlSegment = () => {
    const id = video._id || video.id || ''
    const title = video.titel || video.title || ''
    const s = slugify(title)
    return s ? `${id}-${s}` : id
  }

  // Get video title
  const getVideoTitle = () => {
    return video.titel || video.title || 'Untitled Video'
  }

  // Get pornstar names
  const getPornstarNames = () => {
    if (Array.isArray(video.name)) {
      return video.name.slice(0, 2) // Show max 2 names
    }
    return []
  }

  // Get tags
  const getTags = () => {
    if (Array.isArray(video.tags)) {
      return video.tags.slice(0, 3) // Show max 3 tags
    }
    return []
  }

  // Handle video click to update views
  const handleVideoClick = async () => {
    try {
      const videoId = video._id || video.id
      const currentViews = parseInt(video.views) || 0
      
      // Update views in background (don't wait for response)
      api.updateViews(videoId, currentViews).catch(error => {
        console.log('Failed to update views:', error)
      })
    } catch (error) {
      console.log('Error updating views:', error)
    }
  }

  // Determine if preview video should be shown (hover for desktop, in-view for mobile)
  const shouldShowPreviewVideo = video.previewImage && !videoError && (
    (isMobile && isInView) || // Mobile: play when in view
    (!isMobile && isHovered)   // Desktop: play on hover
  )

  return (
    <div ref={videoRef} className="video-card bg-gray-800 rounded-lg overflow-hidden shadow-lg group">
      <Link href={`/video/${getVideoUrlSegment()}`} onClick={handleVideoClick}>
        <div 
          className="relative aspect-video bg-gray-700"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Preview Video (always rendered but visibility controlled) */}
          {video.previewImage && !videoError && (
            <video
              ref={videoElementRef}
              src={video.previewImage}
              muted
              loop
              playsInline
              preload="metadata"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                shouldShowPreviewVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onError={() => setVideoError(true)}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
          )}
          
          {/* Thumbnail Image (hidden when preview video is playing) */}
          {(!shouldShowPreviewVideo || !video.previewImage || videoError) && !imageError && video.imageUrl ? (
            <>
              <Image
                src={video.imageUrl}
                alt={getVideoTitle()}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                priority={priority}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Loading placeholder */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </>
          ) : (
            // Fallback placeholder (shown when no image or video)
            (!shouldShowPreviewVideo || !video.previewImage || videoError) && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                <Play className="w-12 h-12 text-gray-500" />
              </div>
            )
          )}

          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
              <Play className="w-6 h-6 text-white ml-1" />
            </div>
          </div>

          {/* Duration Badge */}
          {video.minutes && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
              <Clock size={12} />
              <span>{formatDuration(video.minutes)}</span>
            </div>
          )}

          {/* Views Badge */}
          {video.views && (
            <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
              <Eye size={12} />
              <span>{formatViews(video.views)}</span>
            </div>
          )}


          {/* Quality Badge */}
          <div className="absolute top-2 left-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-2 py-1 rounded font-semibold shadow-lg">
            HD
          </div>
        </div>
      </Link>

      {/* Video Info */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Link href={`/video/${getVideoUrlSegment()}`} onClick={handleVideoClick}>
          <h3 className="text-white font-medium text-sm line-clamp-2 hover:text-cyan-400 transition-colors duration-200">
            {getVideoTitle()}
          </h3>
        </Link>

        {/* Pornstars */}
        {getPornstarNames().length > 0 && (
          <div className="flex flex-wrap gap-1">
            {getPornstarNames().map((name, index) => (
              <Link
                key={index}
                href={`/pornstar/${name.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-xs text-pink-400 hover:text-pink-300 transition-colors duration-200 flex items-center space-x-1"
              >
                <Star size={10} />
                <span>{name}</span>
              </Link>
            ))}
          </div>
        )}

        {/* Tags */}
        {getTags().length > 0 && (
          <div className="flex flex-wrap gap-1">
            {getTags().map((tag, index) => (
              <Link
                key={index}
                href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-xs bg-gray-700 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-emerald-500 text-gray-300 hover:text-white px-2 py-1 rounded transition-all duration-200"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-3">
            {video.views && (
              <div className="flex items-center space-x-1">
                <Eye size={12} />
                <span>{formatViews(video.views)} views</span>
              </div>
            )}
            {video.createdAt && (
              <div className="flex items-center space-x-1">
                <Clock size={12} />
                <span>{new Date(video.createdAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
          
          {/* Video Code - Right Side */}
          {getVideoNumber() && (
            <div className="flex items-center space-x-1">
              <span className="text-blue-400 font-semibold">Video code #{getVideoNumber()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
