import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [sessionCount, setSessionCount] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes in seconds
  const audioRef = useRef(null)
  const timerRef = useRef(null)

  // Load session count from localStorage on mount
  useEffect(() => {
    const savedCount = localStorage.getItem('resonantBreathingSessions')
    if (savedCount) {
      setSessionCount(parseInt(savedCount, 10))
    }
  }, [])

  // Timer logic
  useEffect(() => {
    if (isPlaying && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Session completed
            handleSessionComplete()
            return 300
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPlaying, timeRemaining])

  const handleSessionComplete = () => {
    const newCount = sessionCount + 1
    setSessionCount(newCount)
    localStorage.setItem('resonantBreathingSessions', newCount.toString())
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const togglePlay = () => {
    if (isPlaying) {
      // Pause
      setIsPlaying(false)
      if (audioRef.current) {
        audioRef.current.pause()
      }
    } else {
      // Play
      setIsPlaying(true)
      if (audioRef.current) {
        audioRef.current.play().catch(err => {
          console.error('Audio playback failed:', err)
          setIsPlaying(false)
        })
      }
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Resonant Breathing</h1>

        <div className="timer">
          {formatTime(timeRemaining)}
        </div>

        <button className="play-button" onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <div className="session-counter">
          <p className="counter-label">Completed Sessions</p>
          <p className="counter-value">{sessionCount}</p>
        </div>

        <audio ref={audioRef} loop>
          <source src="/breathing-audio.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  )
}

export default App
