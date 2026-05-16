'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Eye, Clock, Heart, MessageCircle, Share2, Volume2, Loader2, X, Send, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function ReelsPage() {
  const [reels, setReels] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [playingReel, setPlayingReel] = useState(null)
  const [likedReels, setLikedReels] = useState(new Set())
  const [showCommentOverlay, setShowCommentOverlay] = useState(null)
  const [showCommentInput, setShowCommentInput] = useState(false)
  const [comments, setComments] = useState({})
  const [commentForm, setCommentForm] = useState({ name: '', comment: '', commentType: 'normal' })
  const [submittingComment, setSubmittingComment] = useState(false)
  const [videoLoadingStates, setVideoLoadingStates] = useState({})
  const [videoErrors, setVideoErrors] = useState({})
  const videoRefs = useRef({})
  const loaderRef = useRef(null)

  useEffect(() => {
    fetchReels()

    // Load liked reels from localStorage
    const savedLikedReels = localStorage.getItem('likedReels')
    if (savedLikedReels) {
      setLikedReels(new Set(JSON.parse(savedLikedReels)))
    }
  }, [])

  // Auto-play first video when reels are loaded (using onCanPlay instead of timeout)
  useEffect(() => {
    if (reels.length > 0 && !playingReel) {
      const firstReelId = reels[0]._id
      const firstVideo = videoRefs.current[firstReelId]
      if (firstVideo) {
        // Set playing state when video can play
        const handleCanPlay = () => {
          setPlayingReel(firstReelId)
          firstVideo.play().catch(err => console.log('Autoplay failed:', err))
          firstVideo.removeEventListener('canplay', handleCanPlay)
        }

        // If video is already ready, play immediately
        if (firstVideo.readyState >= 3) { // HAVE_FUTURE_DATA
          handleCanPlay()
        } else {
          firstVideo.addEventListener('canplay', handleCanPlay)
        }

        return () => {
          firstVideo.removeEventListener('canplay', handleCanPlay)
        }
      }
    }
  }, [reels])

  // Intersection Observer for scroll-based video play/pause
  useEffect(() => {
    if (reels.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoElement = entry.target
          const reelId = videoElement.dataset.reelId
          const video = videoRefs.current[reelId]
          
          if (!video) return
          
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Video is visible (50%+), play it
            console.log('Video visible, playing:', reelId)
            if (video.paused) {
              video.play().then(() => {
                setPlayingReel(reelId)
              }).catch(err => console.log('Play on scroll failed:', err))
            }
          } else {
            // Video is not visible, pause it
            console.log('Video hidden, pausing:', reelId)
            if (!video.paused) {
              video.pause()
            }
            if (playingReel === reelId) {
              setPlayingReel(null)
            }
          }
        })
      },
      {
        threshold: [0.5], // Play when 50% visible
        rootMargin: '0px'
      }
    )

    // Observe all video containers
    const videoContainers = document.querySelectorAll('[data-reel-id]')
    videoContainers.forEach(container => {
      observer.observe(container)
    })

    return () => {
      observer.disconnect()
    }
  }, [reels])

  const fetchReels = useCallback(async (page = 1, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      const API_BASE = process.env.NEXT_PUBLIC_API_URL || window.location.origin

      // Add timeout to fetch
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

      const response = await fetch(`${API_BASE}/reels?page=${page}&limit=12`, {
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error('Failed to fetch reels')
      }

      const data = await response.json()

      if (data.success) {
        if (isLoadMore) {
          setReels(prev => [...prev, ...data.reels])
        } else {
          setReels(data.reels)
        }

        // Initialize video loading states
        const loadingStates = {}
        const errors = {}
        data.reels.forEach(reel => {
          loadingStates[reel._id] = true
          errors[reel._id] = null
        })
        setVideoLoadingStates(prev => ({ ...prev, ...loadingStates }))
        setVideoErrors(prev => ({ ...prev, ...errors }))

        // Initialize comments state with database comment counts
        const commentsData = {}
        data.reels.forEach(reel => {
          commentsData[reel._id] = reel.comments || []
        })
        setComments(prev => ({ ...prev, ...commentsData }))

        // Check if there are more pages
        const totalPages = data.pagination.total
        setHasMore(page < totalPages)
        setCurrentPage(page)
      } else {
        throw new Error(data.message || 'Failed to fetch reels')
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timed out. Please try again.')
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (loadingMore || !hasMore) return

      const scrollPosition = window.innerHeight + window.scrollY
      const documentHeight = document.documentElement.offsetHeight
      
      // Load more when user is 500px from bottom
      if (scrollPosition >= documentHeight - 500) {
        fetchReels(currentPage + 1, true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentPage, loadingMore, hasMore, fetchReels])

  const handleVideoClick = (reelId, event) => {
    const video = videoRefs.current[reelId]
    if (video) {
      // Prevent event bubbling
      if (event) event.stopPropagation()

      // Simple toggle logic
      if (video.paused) {
        // Pause all other videos first
        Object.values(videoRefs.current).forEach(v => {
          if (v && v !== video && !v.paused) {
            v.pause()
          }
        })
        // Play this video
        const playPromise = video.play()
        setPlayingReel(reelId)
        playPromise.catch(err => console.log('Play failed:', err))
      } else {
        video.pause()
        setPlayingReel(null)
      }
    }
  }

  // Handle video load events
  const handleVideoLoad = (reelId) => {
    setVideoLoadingStates(prev => ({ ...prev, [reelId]: false }))
    setVideoErrors(prev => ({ ...prev, [reelId]: null }))
  }

  // Handle video error
  const handleVideoError = (reelId) => {
    setVideoLoadingStates(prev => ({ ...prev, [reelId]: false }))
    setVideoErrors(prev => ({ ...prev, [reelId]: 'Failed to load video' }))
    console.error(`Video failed to load: ${reelId}`)
  }

  const toggleMute = (reelId, e) => {
    e.stopPropagation()
    const video = videoRefs.current[reelId]
    if (video) {
      video.muted = !video.muted
    }
  }

  // Handle like functionality
  const handleLike = async (reelId, e) => {
    e.stopPropagation()
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || window.location.origin
      const endpoint = likedReels.has(reelId) ? 'unlike' : 'like'
      
      const response = await fetch(`${API_BASE}/reels/${reelId}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          // Update local state
          setReels(prev => prev.map(reel => 
            reel._id === reelId ? { ...reel, likes: data.likes } : reel
          ))
          
          // Update liked state
          setLikedReels(prev => {
            const newSet = new Set(prev)
            if (likedReels.has(reelId)) {
              newSet.delete(reelId)
            } else {
              newSet.add(reelId)
            }
            // Save to localStorage
            localStorage.setItem('likedReels', JSON.stringify([...newSet]))
            return newSet
          })
        }
      }
    } catch (error) {
      console.error('Error liking reel:', error)
    }
  }

  // Handle comment functionality - toggle overlay
  const handleComment = async (reelId, e) => {
    e.stopPropagation()
    const newOverlay = showCommentOverlay === reelId ? null : reelId
    setShowCommentOverlay(newOverlay)
    
    // Reset comment input when overlay closes or opens different reel
    if (newOverlay !== reelId) {
      setShowCommentInput(false)
      setCommentForm({ name: '', comment: '' })
    }
  }

  // Submit comment
  const submitComment = async (reelId) => {
    // Strict validation - both name and comment are required
    if (!commentForm.name || commentForm.name.trim() === '') {
      alert('Please enter your name before commenting')
      return
    }
    
    if (!commentForm.comment || commentForm.comment.trim() === '') {
      alert('Please enter a comment')
      return
    }

    setSubmittingComment(true)
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || window.location.origin
      const response = await fetch(`${API_BASE}/reels/${reelId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: commentForm.name.trim(),
          comment: commentForm.comment.trim()
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          // Instant display new comment
          const newComment = {
            ...data.comment,
            createdAt: new Date().toISOString()
          }
          
          setComments(prev => ({ 
            ...prev, 
            [reelId]: [newComment, ...(prev[reelId] || [])] 
          }))
          
          // Update reel's comment count
          setReels(prev => prev.map(reel => 
            reel._id === reelId 
              ? { ...reel, comments: [newComment, ...(reel.comments || [])] }
              : reel
          ))
          
          // Reset form completely and hide input
          setCommentForm({ name: '', comment: '' })
          setShowCommentInput(false)
        }
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
    } finally {
      setSubmittingComment(false)
    }
  }

  // Handle share functionality
  const handleShare = async (reelId, e) => {
    e.stopPropagation()
    
    try {
      const reel = reels.find(r => r._id === reelId)
      if (!reel) return
      
      const shareUrl = `${window.location.origin}/reels/${reelId}`
      const shareText = `Check out this amazing reel: ${reel.titel || 'Untitled Reel'}`
      
      if (navigator.share) {
        // Use Web Share API if available
        await navigator.share({
          title: reel.titel || 'Untitled Reel',
          text: shareText,
          url: shareUrl
        })
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing reel:', error)
    }
  }

  // Send comment to admin/owner
  const sendCommentToAdmin = async (reelId, name, comment) => {
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || window.location.origin
      
      // Create notification data for admin
      const notificationData = {
        reelId: reelId,
        name: name,
        comment: comment,
        timestamp: new Date().toISOString(),
        type: 'comment_notification'
      }
      
      // Send notification to admin endpoint
      const response = await fetch(`${API_BASE}/admin/comment-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notificationData)
      })
      
      if (response.ok) {
        // Show success message to user
        alert('Comment sent to admin/owner successfully!')
      } else {
        // Show error message to user
        alert('Failed to send comment to admin/owner. Please try again.')
      }
    } catch (error) {
      console.error('Error sending comment notification:', error)
      alert('Error sending comment to admin/owner. Please try again.')
    }
  }

  const formatViews = (views) => {
    if (!views) return '0'
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
    return views.toString()
  }

  const formatLikes = (likes) => {
    if (!likes) return '0'
    if (likes >= 1000000) return `${(likes / 1000000).toFixed(1)}M`
    if (likes >= 1000) return `${(likes / 1000).toFixed(1)}K`
    return likes.toString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading viral reels...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error: {error}</p>
          <button 
            onClick={() => fetchReels()}
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Reels Container */}
      <div>
        {reels.length === 0 && !loading ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No reels available at moment.</p>
            <p className="text-gray-500 text-sm mt-2">Check back later for new content!</p>
          </div>
        ) : (
          <>
            {/* Mobile: Full-screen vertical scroll, Desktop: Grid */}
            <div className="md:max-w-7xl md:mx-auto md:px-4 md:py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 md:gap-6">
              {reels.map((reel, index) => (
                <div key={reel._id} className="relative group" data-reel-id={reel._id}>
                  {/* Video Container */}
                  <div className="relative aspect-[9/16] bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                    {/* Video Element */}
                    <div className="absolute inset-0 z-0">
                      {reel.previewImage ? (
                        <>
                          <video
                            ref={(el) => { videoRefs.current[reel._id] = el }}
                            src={reel.previewImage}
                            className="w-full h-full object-cover"
                            controls={false}
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            onCanPlay={() => handleVideoLoad(reel._id)}
                            onError={() => handleVideoError(reel._id)}
                            onClick={(e) => handleVideoClick(reel._id, e)}
                            style={{ display: 'block' }}
                          />
                          {/* Loading indicator */}
                          {videoLoadingStates[reel._id] && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                              <Loader2 className="w-8 h-8 text-white animate-spin" />
                            </div>
                          )}
                          {/* Error indicator */}
                          {videoErrors[reel._id] && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                              <div className="text-center text-white">
                                <p className="text-sm">Failed to load video</p>
                                <p className="text-xs text-gray-400 mt-1">Try refreshing the page</p>
                              </div>
                            </div>
                          )}
                        </>
                      ) : null}
                    </div>

                    {/* Mute/Unmute Button - only show when playing */}
                    {playingReel === reel._id && (
                      <button
                        onClick={(e) => toggleMute(reel._id, e)}
                        className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-3 hover:bg-black/70 transition-colors z-10 md:p-2"
                      >
                        <Volume2 className="w-6 h-6 text-white md:w-4 md:h-4" />
                      </button>
                    )}

                    {/* Instagram-style Action Buttons - Right Side */}
                    <div className="absolute bottom-4 right-4 flex flex-col space-y-4 z-20">
                      <button
                        onClick={(e) => handleLike(reel._id, e)}
                        className="flex flex-col items-center space-y-1 text-white hover:scale-110 transition-transform"
                      >
                        <div className={`bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors ${likedReels.has(reel._id) ? 'bg-red-500/30' : ''}`}>
                          <Heart className={`w-5 h-5 ${likedReels.has(reel._id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </div>
                        <span className="text-xs">{formatLikes(reel.likes || 0)}</span>
                      </button>
                      <button
                        onClick={(e) => handleComment(reel._id, e)}
                        className="flex flex-col items-center space-y-1 text-white hover:scale-110 transition-transform"
                      >
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                        </div>
                        <span className="text-xs">{reel.commentCount || 0}</span>
                      </button>
                      <button
                        onClick={(e) => handleShare(reel._id, e)}
                        className="flex flex-col items-center space-y-1 text-white hover:scale-110 transition-transform"
                      >
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                          <Share2 className="w-5 h-5" />
                        </div>
                        <span className="text-xs">Share</span>
                      </button>
                      <Link
                        href={`/video/${reel._id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex flex-col items-center space-y-1 text-white hover:scale-110 transition-transform"
                      >
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-sm rounded-full p-2 hover:from-purple-600 hover:to-pink-600 transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-medium">Watch Full</span>
                      </Link>
                    </div>

                    {/* Overlay Info - Always Visible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 pointer-events-none">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                          {reel.titel || 'Untitled Reel'}
                        </h3>

                        {/* Video Stats */}
                        <div className="flex items-center justify-between text-white/80 text-xs">
                          <div className="flex items-center space-x-3">
                            {reel.views && (
                              <div className="flex items-center space-x-1">
                                <Eye className="w-3 h-3" />
                                <span>{formatViews(reel.views)}</span>
                              </div>
                            )}
                            {reel.minutes && (
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{reel.minutes}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Tags */}
                        {reel.tags && reel.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {reel.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 bg-purple-500/30 text-purple-300 text-xs rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Comment Overlay - Instagram Style */}
                  {showCommentOverlay === reel._id && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-none z-30 flex flex-col">
                      <div className="flex-1 flex flex-col justify-end">
                        <div className="bg-black/95 border-t border-gray-800">
                          {/* Header */}
                          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                            <h4 className="text-white font-medium text-sm">Comments</h4>
                            <button
                              onClick={() => setShowCommentOverlay(null)}
                              className="text-gray-400 hover:text-white transition-colors p-1"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          
                          {/* Comment Input Section - Toggle Based */}
                          <div className="px-4 py-3 border-b border-gray-800">
                            {!showCommentInput ? (
                              // Add Comment Button
                              <div className="flex items-center justify-center">
                                <button
                                  onClick={() => setShowCommentInput(true)}
                                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-colors"
                                >
                                  Add Comment
                                </button>
                              </div>
                            ) : (
                              // Comment Input Fields
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0"></div>
                                <div className="flex-1 space-y-3">
                                  <input
                                    type="text"
                                    placeholder="Add your name..."
                                    value={commentForm.name || ''}
                                    onChange={(e) => setCommentForm(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm border-b border-gray-600 focus:border-white pb-1"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    value={commentForm.comment || ''}
                                    onChange={(e) => setCommentForm(prev => ({ ...prev, comment: e.target.value }))}
                                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm border-b border-gray-600 focus:border-white pb-1"
                                  />
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => submitComment(reel._id)}
                                      disabled={submittingComment || !commentForm.name?.trim() || !commentForm.comment?.trim()}
                                      className="text-blue-400 hover:text-blue-300 font-medium text-sm disabled:opacity-50"
                                    >
                                      {submittingComment ? 'Posting...' : 'Post'}
                                    </button>
                                    <button
                                      onClick={() => setShowCommentInput(false)}
                                      className="text-gray-400 hover:text-gray-300 font-medium text-sm"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Comments List */}
                          <div className="max-h-48 overflow-y-auto">
                            {reel.comments && reel.comments.length > 0 ? (
                              reel.comments.map((comment, index) => (
                                <div key={index} className="px-4 py-2 border-b border-gray-800/50 hover:bg-gray-900/50 transition-colors">
                                  <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 mt-1"></div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h5 className="text-white font-medium text-sm">{comment.name}</h5>
                                        <span className="text-gray-400 text-xs">
                                          {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                      </div>
                                      <p className="text-gray-200 text-sm leading-relaxed">{comment.comment}</p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="px-4 py-8 text-center">
                                <p className="text-gray-400 text-sm">No comments yet.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Infinite Scroll Loading Indicator */}
            {loadingMore && (
              <div className="flex justify-center py-8">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Loading more reels...</span>
                </div>
              </div>
            )}

            {/* No More Content Message */}
            {!hasMore && reels.length > 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">You've reached the end! 🎬</p>
                <p className="text-gray-600 text-sm mt-1">No more reels to load</p>
              </div>
            )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
