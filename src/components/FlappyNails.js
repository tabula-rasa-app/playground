'use client'

import { useState, useEffect, useRef } from 'react'

export default function FlappyNails() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [nailPosition, setNailPosition] = useState(50) // percentage from top
  const [obstacles, setObstacles] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [velocity, setVelocity] = useState(0)
  const gameLoopRef = useRef(null)
  const obstacleTimerRef = useRef(null)

  const GRAVITY = 0.5
  const JUMP_STRENGTH = -8
  const OBSTACLE_SPEED = 2
  const OBSTACLE_GAP = 180
  const NAIL_SIZE = 40

  const startGame = () => {
    setIsPlaying(true)
    setGameOver(false)
    setScore(0)
    setNailPosition(50)
    setVelocity(0)
    setObstacles([])
  }

  const handleClick = () => {
    if (!isPlaying && !gameOver) {
      startGame()
    } else if (isPlaying) {
      setVelocity(JUMP_STRENGTH)
    } else if (gameOver) {
      startGame()
    }
  }

  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver) return

    gameLoopRef.current = setInterval(() => {
      // Update nail position with gravity
      setVelocity((prev) => prev + GRAVITY)
      setNailPosition((prev) => {
        const newPos = prev + velocity
        if (newPos < 0 || newPos > 100) {
          setGameOver(true)
          setIsPlaying(false)
          return prev
        }
        return newPos
      })

      // Move obstacles
      setObstacles((prev) =>
        prev
          .map((obs) => ({ ...obs, x: obs.x - OBSTACLE_SPEED }))
          .filter((obs) => {
            // Score when passing obstacle
            if (obs.x + 60 < 15 && !obs.scored) {
              setScore((s) => s + 1)
              return { ...obs, scored: true }
            }
            return obs.x > -60
          })
      )

      // Check collision
      setObstacles((prev) => {
        const nailLeft = 15
        const nailRight = 15 + NAIL_SIZE / 4
        const nailTop = nailPosition
        const nailBottom = nailPosition + NAIL_SIZE / 4

        for (let obs of prev) {
          const obsLeft = obs.x
          const obsRight = obs.x + 60

          if (nailRight > obsLeft && nailLeft < obsRight) {
            const topObsBottom = obs.gap
            const bottomObsTop = obs.gap + OBSTACLE_GAP

            if (nailTop < topObsBottom || nailBottom > bottomObsTop) {
              setGameOver(true)
              setIsPlaying(false)
            }
          }
        }
        return prev
      })
    }, 1000 / 60) // 60 FPS

    return () => clearInterval(gameLoopRef.current)
  }, [isPlaying, gameOver, velocity, nailPosition])

  // Spawn obstacles
  useEffect(() => {
    if (!isPlaying || gameOver) return

    obstacleTimerRef.current = setInterval(() => {
      const gap = Math.random() * 40 + 30 // Random gap position (30-70%)
      setObstacles((prev) => [...prev, { x: 100, gap, scored: false }])
    }, 2000)

    return () => clearInterval(obstacleTimerRef.current)
  }, [isPlaying, gameOver])

  return (
    <div className="w-full mb-8">
      <div
        className="relative w-full h-[350px] sm:h-[450px] bg-gradient-to-b from-pink-200 via-rose-100 to-purple-200 rounded-lg overflow-hidden shadow-2xl cursor-pointer"
        onClick={handleClick}
      >
        {/* Score Display */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg">
            <span className="text-2xl sm:text-3xl font-bold text-purple-600">
              {score} {score === 1 ? 'Nail' : 'Nails'} Painted
            </span>
          </div>
        </div>

        {/* Instructions / Game Over */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 backdrop-blur-sm">
            <div className="text-center bg-white/90 rounded-xl p-6 sm:p-8 shadow-2xl max-w-xs sm:max-w-sm mx-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-4">
                💅 Flappy Nails 💅
              </h2>
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                Click to paint nails and fly through the obstacles!
              </p>
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg">
                Start Painting
              </button>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/30 backdrop-blur-sm">
            <div className="text-center bg-white/95 rounded-xl p-6 sm:p-8 shadow-2xl max-w-xs sm:max-w-sm mx-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-rose-600 mb-2">
                Game Over!
              </h2>
              <p className="text-xl sm:text-2xl text-purple-600 font-bold mb-4">
                {score} {score === 1 ? 'Nail' : 'Nails'} Painted! 💅
              </p>
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg">
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Flying Nail */}
        <div
          className="absolute w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-100 z-10"
          style={{
            left: '15%',
            top: `${nailPosition}%`,
            transform: `rotate(${Math.min(Math.max(velocity * 3, -30), 30)}deg)`,
          }}
        >
          <div className="relative w-full h-full">
            {/* Nail Polish Bottle */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg shadow-lg">
              {/* Cap */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-3 bg-gray-800 rounded-t"></div>
              {/* Label */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white/40 rounded-full"></div>
              {/* Shine */}
              <div className="absolute top-1 right-1 w-2 h-2 bg-white/60 rounded-full"></div>
            </div>
            {/* Paint Trail */}
            {isPlaying && velocity < 0 && (
              <div className="absolute left-1/2 top-full w-1 h-4 bg-pink-400/60 animate-fade-out"></div>
            )}
          </div>
        </div>

        {/* Obstacles (Nail Files) */}
        {obstacles.map((obs, idx) => (
          <div key={idx} className="absolute h-full" style={{ left: `${obs.x}%` }}>
            {/* Top Obstacle */}
            <div
              className="absolute left-0 w-12 sm:w-16 bg-gradient-to-r from-amber-300 to-amber-400 border-2 border-amber-500 rounded-b-lg shadow-lg"
              style={{
                top: 0,
                height: `${obs.gap}%`,
              }}
            >
              {/* Nail File Texture */}
              <div className="absolute inset-1 bg-gradient-to-b from-yellow-200 to-amber-300 opacity-50"></div>
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]"></div>
            </div>

            {/* Bottom Obstacle */}
            <div
              className="absolute left-0 w-12 sm:w-16 bg-gradient-to-r from-amber-300 to-amber-400 border-2 border-amber-500 rounded-t-lg shadow-lg"
              style={{
                bottom: 0,
                height: `${100 - obs.gap - OBSTACLE_GAP / 4.5}%`,
              }}
            >
              {/* Nail File Texture */}
              <div className="absolute inset-1 bg-gradient-to-b from-amber-300 to-yellow-200 opacity-50"></div>
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]"></div>
            </div>
          </div>
        ))}

        {/* Ground Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-purple-300 border-t-4 border-purple-400"></div>
      </div>
    </div>
  )
}
