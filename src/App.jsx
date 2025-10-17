import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedMode, setSelectedMode] = useState('resonant') // 'resonant' or 'pns'
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [sessionCount, setSessionCount] = useState(0)
  const [sessionTime, setSessionTime] = useState(0) // Current session time in seconds
  const audioRef = useRef(null)
  const timerRef = useRef(null)

  const breathingModes = {
    resonant: {
      name: 'Resonant',
      audioFile: '/breathing-audio.mp3'
    },
    pns: {
      name: 'PNS',
      audioFile: '/pns-breathing.mp3'
    },
    sleep: {
      name: 'Sleep',
      audioFile: '/sleep-headspace.mp3'
    },
    sandy: {
      name: 'Before bed',
      audioFile: '/sandy-before-bed.mp3'
    },
    morning: {
      name: 'Morning',
      audioFile: '/morning.mp3'
    }
  }

  // Load total time and session count from localStorage on mount and set volume
  useEffect(() => {
    const savedSeconds = localStorage.getItem('resonantBreathingTotalSeconds')
    if (savedSeconds) {
      setTotalSeconds(parseInt(savedSeconds, 10))
    }

    const savedSessions = localStorage.getItem('resonantBreathingSessions')
    if (savedSessions) {
      setSessionCount(parseInt(savedSessions, 10))
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
      const newTotalSeconds = totalSeconds + 1
      setTotalSeconds(newTotalSeconds)
      localStorage.setItem('resonantBreathingTotalSeconds', newTotalSeconds.toString())
    }
  }, [sessionTime, isPlaying])

  const selectMode = (mode) => {
    // Stop current playback if switching modes
    if (isPlaying) {
      setIsPlaying(false)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      // Count as session if time was recorded
      if (sessionTime > 0) {
        const newSessionCount = sessionCount + 1
        setSessionCount(newSessionCount)
        localStorage.setItem('resonantBreathingSessions', newSessionCount.toString())
        setSessionTime(0)
      }
    }
    setSelectedMode(mode)
  }

  // Reload audio when mode changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
      audioRef.current.volume = 0.85
    }
  }, [selectedMode])

  const togglePlay = () => {
    if (isPlaying) {
      // Pause - count as a session when pausing
      setIsPlaying(false)
      if (audioRef.current) {
        audioRef.current.pause()
      }
      // Increment session count
      if (sessionTime > 0) {
        const newSessionCount = sessionCount + 1
        setSessionCount(newSessionCount)
        localStorage.setItem('resonantBreathingSessions', newSessionCount.toString())
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

  const formatTotalTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Breathe</h1>

        <div className="mode-selector">
          <button
            className={`mode-button ${selectedMode === 'resonant' ? 'active' : ''}`}
            onClick={() => selectMode('resonant')}
          >
            {breathingModes.resonant.name}
          </button>
          <button
            className={`mode-button ${selectedMode === 'pns' ? 'active' : ''}`}
            onClick={() => selectMode('pns')}
          >
            {breathingModes.pns.name}
          </button>
          <button
            className={`mode-button ${selectedMode === 'sandy' ? 'active' : ''}`}
            onClick={() => selectMode('sandy')}
          >
            {breathingModes.sandy.name}
          </button>
          <button
            className={`mode-button ${selectedMode === 'sleep' ? 'active' : ''}`}
            onClick={() => selectMode('sleep')}
          >
            {breathingModes.sleep.name}
          </button>
          <button
            className={`mode-button ${selectedMode === 'morning' ? 'active' : ''}`}
            onClick={() => selectMode('morning')}
          >
            {breathingModes.morning.name}
          </button>
        </div>

        <div className="timer">
          {formatTime(sessionTime)}
        </div>

        <button className="play-button" onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <div className="stats">
          <div className="stat-item">
            <p className="stat-label">Total Time</p>
            <p className="stat-value">{formatTotalTime(totalSeconds)}</p>
          </div>
          <div className="stat-item">
            <p className="stat-label">Sessions</p>
            <p className="stat-value">{sessionCount}</p>
          </div>
        </div>

        <a href="/install.html" className="install-button">
          Install App
        </a>

        <audio key={selectedMode} ref={audioRef} loop>
          <source src={breathingModes[selectedMode].audioFile} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  )
}

export default App
