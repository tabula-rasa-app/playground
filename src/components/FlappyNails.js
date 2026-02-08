'use client'

import { useState, useEffect, useRef } from 'react'

export default function FlappyNails() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [rating, setRating] = useState('') // Rating message
  const [bells, setBells] = useState([]) // Prayer bells to collect
  const [monk, setMonk] = useState({ x: 50, y: 50 }) // Monk position
  const [isChanting, setIsChanting] = useState(false)
  const gameLoopRef = useRef(null)
  const bellTimerRef = useRef(null)
  const containerRef = useRef(null)

  const BELL_SPAWN_INTERVAL = 2000 // New bell every 2 seconds
  const BELL_LIFETIME = 5000 // Bells disappear after 5 seconds
  const PERFECT_DISTANCE = 30 // Distance for "Perfect" rating
  const GOOD_DISTANCE = 60 // Distance for "Good" rating

  const startGame = () => {
    setIsPlaying(true)
    setScore(0)
    setRating('')
    setBells([])
    setMonk({ x: 50, y: 50 })
  }

  const handleMouseMove = (e) => {
    if (!isPlaying || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setMonk({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
  }

  const handleTouchMove = (e) => {
    if (!isPlaying || !containerRef.current) return
    e.preventDefault()

    const touch = e.touches[0]
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((touch.clientX - rect.left) / rect.width) * 100
    const y = ((touch.clientY - rect.top) / rect.height) * 100

    setMonk({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
  }

  const collectBell = (bell) => {
    const distance = Math.sqrt(
      Math.pow(monk.x - bell.x, 2) + Math.pow(monk.y - bell.y, 2)
    )

    let ratingText = ''
    let points = 0

    if (distance < PERFECT_DISTANCE) {
      ratingText = 'Enlightened! 🙏'
      points = 10
    } else if (distance < GOOD_DISTANCE) {
      ratingText = 'Blessed! 🕉️'
      points = 5
    } else {
      ratingText = 'Mindful! 🔔'
      points = 1
    }

    setRating(ratingText)
    setScore((s) => s + points)

    // Remove the collected bell
    setBells((prev) => prev.filter((n) => n.id !== bell.id))

    // Clear rating after 1 second
    setTimeout(() => setRating(''), 1000)
  }

  // Spawn bells
  useEffect(() => {
    if (!isPlaying) return

    bellTimerRef.current = setInterval(() => {
      const newBell = {
        id: Date.now(),
        x: Math.random() * 70 + 15, // Random x position (15-85%)
        y: Math.random() * 70 + 15, // Random y position (15-85%)
        type: ['prayer', 'lotus', 'om', 'dharma', 'mandala'][
          Math.floor(Math.random() * 5)
        ],
        collected: false,
      }
      setBells((prev) => [...prev, newBell])

      // Auto-remove bell after lifetime
      setTimeout(() => {
        setBells((prev) => prev.filter((n) => n.id !== newBell.id))
      }, BELL_LIFETIME)
    }, BELL_SPAWN_INTERVAL)

    return () => clearInterval(bellTimerRef.current)
  }, [isPlaying])

  // Check if monk is near any bell
  useEffect(() => {
    if (!isPlaying || bells.length === 0) return

    const nearBell = bells.find((bell) => {
      const distance = Math.sqrt(
        Math.pow(monk.x - bell.x, 2) + Math.pow(monk.y - bell.y, 2)
      )
      return distance < GOOD_DISTANCE
    })

    setIsChanting(!!nearBell)
  }, [monk, bells, isPlaying])

  return (
    <div className="w-full mb-8">
      <div
        ref={containerRef}
        className="relative w-full h-[350px] sm:h-[450px] bg-gradient-to-b from-amber-200 via-orange-100 to-stone-300 rounded-lg overflow-hidden shadow-2xl select-none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        style={{ touchAction: 'none' }}
      >
        {/* Score Display */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg">
            <span className="text-2xl sm:text-3xl font-bold text-amber-700">
              Karma: {score}
            </span>
          </div>
        </div>

        {/* Rating Display */}
        {rating && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white px-6 py-3 rounded-full shadow-lg font-bold text-xl">
              {rating}
            </div>
          </div>
        )}

        {/* Instructions */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 backdrop-blur-sm">
            <div className="text-center bg-white/90 rounded-xl p-6 sm:p-8 shadow-2xl max-w-xs sm:max-w-sm mx-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-amber-700 mb-4">
                🕉️ Borobudur Temple 🙏
              </h2>
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                Guide the monk to collect sacred bells!<br/>
                Get close for enlightenment!
              </p>
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-amber-600 to-orange-700 text-white px-6 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
              >
                Begin Journey
              </button>
            </div>
          </div>
        )}

        {/* Monk Cursor */}
        {isPlaying && (
          <div
            className="absolute w-10 h-10 sm:w-12 sm:h-12 pointer-events-none z-30 transition-transform duration-75"
            style={{
              left: `${monk.x}%`,
              top: `${monk.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className={`relative w-full h-full ${isChanting ? 'scale-125' : ''} transition-transform`}>
              {/* Monk Body */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-10 bg-gradient-to-b from-orange-600 to-orange-700 rounded-lg shadow-md"></div>
              {/* Monk Head */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-amber-200 rounded-full shadow-sm"></div>
              {/* Prayer Hands */}
              {isChanting && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xl animate-pulse">🙏</div>
              )}
            </div>
          </div>
        )}

        {/* Sacred Bells to Collect */}
        {bells.map((bell) => {
          const bellIcons = {
            prayer: '🔔',
            lotus: '🪷',
            om: '🕉️',
            dharma: '☸️',
            mandala: '🪬'
          }

          return (
            <div
              key={bell.id}
              className="absolute w-14 h-14 sm:w-16 sm:h-16 cursor-pointer z-10 animate-fade-in"
              style={{
                left: `${bell.x}%`,
                top: `${bell.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => collectBell(bell)}
            >
              {/* Bell Container */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full opacity-50 blur-sm animate-pulse"></div>
                {/* Bell Icon */}
                <div className="relative text-4xl sm:text-5xl animate-bounce" style={{ animationDuration: '2s' }}>
                  {bellIcons[bell.type]}
                </div>
              </div>
            </div>
          )
        })}

        {/* Temple Base */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-stone-600 to-stone-400 border-t-4 border-stone-700"></div>

        {/* Temple Stupas (decorative) */}
        {isPlaying && (
          <>
            <div className="absolute top-10 left-10 w-6 h-6 sm:w-8 sm:h-8 bg-stone-500 rounded-full opacity-30"></div>
            <div className="absolute top-10 right-10 w-6 h-6 sm:w-8 sm:h-8 bg-stone-500 rounded-full opacity-30"></div>
            <div className="absolute bottom-20 left-1/4 w-8 h-8 sm:w-10 sm:h-10 bg-stone-500 rounded-full opacity-30"></div>
            <div className="absolute bottom-20 right-1/4 w-8 h-8 sm:w-10 sm:h-10 bg-stone-500 rounded-full opacity-30"></div>
          </>
        )}

        {/* Spiritual Particles when playing */}
        {isPlaying && (
          <>
            <div className="absolute top-10 left-10 w-4 h-4 text-amber-400 animate-ping">✨</div>
            <div className="absolute top-20 right-20 w-4 h-4 text-orange-400 animate-ping" style={{ animationDelay: '0.5s' }}>✨</div>
            <div className="absolute bottom-20 left-20 w-4 h-4 text-yellow-400 animate-ping" style={{ animationDelay: '1s' }}>✨</div>
          </>
        )}
      </div>
    </div>
  )
}
