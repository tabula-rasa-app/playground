'use client'

import { useState, useEffect, useRef } from 'react'

export default function FlappyNails() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [rating, setRating] = useState('') // Rating message
  const [nails, setNails] = useState([]) // Nails to paint
  const [paintBrush, setPaintBrush] = useState({ x: 50, y: 50 }) // Brush position
  const [isPainting, setIsPainting] = useState(false)
  const gameLoopRef = useRef(null)
  const nailTimerRef = useRef(null)
  const containerRef = useRef(null)

  const NAIL_SPAWN_INTERVAL = 2000 // New nail every 2 seconds
  const NAIL_LIFETIME = 5000 // Nails disappear after 5 seconds
  const PERFECT_DISTANCE = 30 // Distance for "Perfect" rating
  const GOOD_DISTANCE = 60 // Distance for "Good" rating

  const startGame = () => {
    setIsPlaying(true)
    setScore(0)
    setRating('')
    setNails([])
    setPaintBrush({ x: 50, y: 50 })
  }

  const handleMouseMove = (e) => {
    if (!isPlaying || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setPaintBrush({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
  }

  const handleTouchMove = (e) => {
    if (!isPlaying || !containerRef.current) return
    e.preventDefault()

    const touch = e.touches[0]
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((touch.clientX - rect.left) / rect.width) * 100
    const y = ((touch.clientY - rect.top) / rect.height) * 100

    setPaintBrush({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
  }

  const paintNail = (nail) => {
    const distance = Math.sqrt(
      Math.pow(paintBrush.x - nail.x, 2) + Math.pow(paintBrush.y - nail.y, 2)
    )

    let ratingText = ''
    let points = 0

    if (distance < PERFECT_DISTANCE) {
      ratingText = 'Perfect! ⭐'
      points = 10
    } else if (distance < GOOD_DISTANCE) {
      ratingText = 'Good! 👍'
      points = 5
    } else {
      ratingText = 'Nice Try! 💅'
      points = 1
    }

    setRating(ratingText)
    setScore((s) => s + points)

    // Remove the painted nail
    setNails((prev) => prev.filter((n) => n.id !== nail.id))

    // Clear rating after 1 second
    setTimeout(() => setRating(''), 1000)
  }

  // Spawn nails
  useEffect(() => {
    if (!isPlaying) return

    nailTimerRef.current = setInterval(() => {
      const newNail = {
        id: Date.now(),
        x: Math.random() * 70 + 15, // Random x position (15-85%)
        y: Math.random() * 70 + 15, // Random y position (15-85%)
        color: ['#FF69B4', '#FF1493', '#FF6347', '#FF4500', '#DC143C'][
          Math.floor(Math.random() * 5)
        ],
        painted: false,
      }
      setNails((prev) => [...prev, newNail])

      // Auto-remove nail after lifetime
      setTimeout(() => {
        setNails((prev) => prev.filter((n) => n.id !== newNail.id))
      }, NAIL_LIFETIME)
    }, NAIL_SPAWN_INTERVAL)

    return () => clearInterval(nailTimerRef.current)
  }, [isPlaying])

  // Check if brush is near any nail
  useEffect(() => {
    if (!isPlaying || nails.length === 0) return

    const nearNail = nails.find((nail) => {
      const distance = Math.sqrt(
        Math.pow(paintBrush.x - nail.x, 2) + Math.pow(paintBrush.y - nail.y, 2)
      )
      return distance < GOOD_DISTANCE
    })

    setIsPainting(!!nearNail)
  }, [paintBrush, nails, isPlaying])

  return (
    <div className="w-full mb-8">
      <div
        ref={containerRef}
        className="relative w-full h-[350px] sm:h-[450px] bg-gradient-to-b from-pink-200 via-rose-100 to-purple-200 rounded-lg overflow-hidden shadow-2xl select-none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        style={{ touchAction: 'none' }}
      >
        {/* Score Display */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg">
            <span className="text-2xl sm:text-3xl font-bold text-purple-600">
              Score: {score}
            </span>
          </div>
        </div>

        {/* Rating Display */}
        {rating && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg font-bold text-xl">
              {rating}
            </div>
          </div>
        )}

        {/* Instructions */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 backdrop-blur-sm">
            <div className="text-center bg-white/90 rounded-xl p-6 sm:p-8 shadow-2xl max-w-xs sm:max-w-sm mx-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-4">
                💅 ValuValu Paints 💅
              </h2>
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                Move your cursor or finger to paint the nails!<br/>
                Get close for a better rating!
              </p>
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
              >
                Start Painting
              </button>
            </div>
          </div>
        )}

        {/* Paint Brush Cursor */}
        {isPlaying && (
          <div
            className="absolute w-8 h-8 sm:w-10 sm:h-10 pointer-events-none z-30 transition-transform duration-75"
            style={{
              left: `${paintBrush.x}%`,
              top: `${paintBrush.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className={`relative w-full h-full ${isPainting ? 'scale-125' : ''} transition-transform`}>
              {/* Brush Handle */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-6 bg-amber-700 rounded-t"></div>
              {/* Brush Bristles */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-pink-500 rounded-full"></div>
              {/* Paint Drip */}
              {isPainting && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-3 bg-pink-400 rounded-b-full animate-pulse"></div>
              )}
            </div>
          </div>
        )}

        {/* Nails to Paint */}
        {nails.map((nail) => (
          <div
            key={nail.id}
            className="absolute w-12 h-16 sm:w-14 sm:h-18 cursor-pointer z-10 animate-fade-in"
            style={{
              left: `${nail.x}%`,
              top: `${nail.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onClick={() => paintNail(nail)}
          >
            {/* Finger */}
            <div className="relative w-full h-full">
              {/* Fingertip */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-10 bg-gradient-to-b from-amber-100 to-amber-200 rounded-t-full shadow-md"></div>
              {/* Nail */}
              <div
                className="absolute top-6 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full shadow-lg border-2 border-white/50 animate-pulse"
                style={{ backgroundColor: nail.color }}
              >
                {/* Shine */}
                <div className="absolute top-1 right-1 w-2 h-2 bg-white/60 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-purple-300 border-t-4 border-purple-400"></div>

        {/* Sparkles when playing */}
        {isPlaying && (
          <>
            <div className="absolute top-10 left-10 w-4 h-4 text-yellow-300 animate-ping">✨</div>
            <div className="absolute top-20 right-20 w-4 h-4 text-pink-300 animate-ping" style={{ animationDelay: '0.5s' }}>✨</div>
            <div className="absolute bottom-20 left-20 w-4 h-4 text-purple-300 animate-ping" style={{ animationDelay: '1s' }}>✨</div>
          </>
        )}
      </div>
    </div>
  )
}
