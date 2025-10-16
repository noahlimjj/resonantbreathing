import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [totalHours, setTotalHours] = useState(0)
  const [sessionTime, setSessionTime] = useState(0) // Current session time in seconds
  const audioRef = useRef(null)
  const timerRef = useRef(null)

  // Load total time from localStorage on mount and set volume
  useEffect(() => {
    const savedHours = localStorage.getItem('resonantBreathingTotalHours')
    if (savedHours) {
      setTotalHours(parseFloat(savedHours))
    }

    // Set audio volume to 85% (slightly louder)
    if (audioRef.current) {
      audioRef.current.volume = 0.85
    }
  }, [])

  // Stopwatch logic - counts up when playing
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setSessionTime((prev) => prev + 1)
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
  }, [isPlaying])

  // Save total time whenever session time changes and is playing
  useEffect(() => {
    if (isPlaying && sessionTime > 0) {
      // Update total hours (sessionTime is in seconds, convert to hours)
      const hoursToAdd = 1 / 3600 // 1 second in hours
      const newTotalHours = totalHours + hoursToAdd
      setTotalHours(newTotalHours)
      localStorage.setItem('resonantBreathingTotalHours', newTotalHours.toString())
    }
  }, [sessionTime, isPlaying])

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
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatHours = (hours) => {
    return hours.toFixed(2)
  }

  return (
    <div className="app">
      <div className="container">
        <a href="/" className="home-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </a>

        <h1 className="title">Resonant Breathing</h1>

        <div className="timer">
          {formatTime(sessionTime)}
        </div>

        <button className="play-button" onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <div className="session-counter">
          <p className="counter-label">Total Hours</p>
          <p className="counter-value">{formatHours(totalHours)}</p>
        </div>

        <a href="/install.html" className="install-link">
          How to Install
        </a>

        <audio ref={audioRef} loop>
          <source src="/breathing-audio.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  )
}

export default App
