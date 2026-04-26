import { useState, useRef, useEffect } from 'react'
import './App.css'
import Info from './Info'

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedMode, setSelectedMode] = useState('resonant') // 'resonant' or 'pns'
  const [showInfo, setShowInfo] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [sessionCount, setSessionCount] = useState(0)
  const [sessionTime, setSessionTime] = useState(0) // Current session time in seconds
  const [timerEnabled, setTimerEnabled] = useState(false)
  const [timerMinutes, setTimerMinutes] = useState(5)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0) // Remaining time when countdown is active
  const audioRef = useRef(null)
  const timerRef = useRef(null)

  const breathingModes = {
    resonant: {
      name: 'Resonant',
      audioFile: '/breathing-audio.mp3',
      videoId: null
    },
    pns: {
      name: 'Parasympathetic',
      audioFile: '/pns-breathing.mp3',
      videoId: null
    },
    sleep: {
      name: 'Sleep',
      audioFile: '/sleep-headspace.mp3',
      videoId: null
    },
    sandy: {
      name: 'Before bed',
      audioFile: '/sandy-before-bed.mp3',
      videoId: null
    },
    morning: {
      name: 'Morning',
      audioFile: '/morning.mp3',
      videoId: null
    },
    yognidra: {
      name: 'Yoga Nidra',
      audioFile: null,
      videoId: '_noquwycq78'
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

    // Set audio volume based on mode
    if (audioRef.current) {
      audioRef.current.volume = selectedMode === 'resonant' ? 1.0 : 0.85
    }
  }, [])

  // Timer logic - counts up for stopwatch or down for countdown
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setSessionTime((prev) => prev + 1)

        // Countdown logic if timer is enabled
        if (timerEnabled) {
          setRemainingTime((prev) => {
            if (prev <= 1) {
              // Timer has ended - stop playback
              setIsPlaying(false)
              if (audioRef.current) {
                audioRef.current.pause()
              }
              // Count as session
              const newSessionCount = sessionCount + 1
              setSessionCount(newSessionCount)
              localStorage.setItem('resonantBreathingSessions', newSessionCount.toString())
              return 0
            }
            return prev - 1
          })
        }
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
  }, [isPlaying, timerEnabled])

  // Save total time whenever session time changes and is playing
  useEffect(() => {
    if (isPlaying && sessionTime > 0) {
      const newTotalSeconds = totalSeconds + 1
      setTotalSeconds(newTotalSeconds)
      localStorage.setItem('resonantBreathingTotalSeconds', newTotalSeconds.toString())
    }
  }, [sessionTime, isPlaying])

  const selectMode = (mode) => {
    // If Yoga Nidra, just open video
    if (mode === 'yognidra') {
      setSelectedMode(mode)
      setShowVideo(true)
      return
    }
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
      audioRef.current.volume = selectedMode === 'resonant' ? 1.0 : 0.85
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
      // Play - initialize timer if enabled
      if (timerEnabled) {
        const totalTimeSeconds = timerMinutes * 60 + timerSeconds
        if (totalTimeSeconds <= 0) {
          alert('Please set a timer duration greater than 0')
          return
        }
        setRemainingTime(totalTimeSeconds)
      }
      setIsPlaying(true)
      if (audioRef.current) {
        audioRef.current.play().catch(err => {
          console.error('Audio playback failed:', err)
          setIsPlaying(false)
        })
      }
    }
  }

  const handleTimerMinutesChange = (e) => {
    const value = parseInt(e.target.value) || 0
    setTimerMinutes(Math.max(0, Math.min(99, value)))
  }

  const handleTimerSecondsChange = (e) => {
    const value = parseInt(e.target.value) || 0
    setTimerSeconds(Math.max(0, Math.min(59, value)))
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

  if (showInfo) {
    return <Info onBack={() => setShowInfo(false)} />
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
          <button
            className={`mode-button ${selectedMode === 'yognidra' ? 'active' : ''}`}
            onClick={() => selectMode('yognidra')}
          >
            {breathingModes.yognidra.name}
          </button>
        </div>

        <div className="timer">
          {timerEnabled && isPlaying ? formatTime(remainingTime) : formatTime(sessionTime)}
        </div>

        <div className="timer-controls">
          <label className="timer-toggle">
            <input
              type="checkbox"
              checked={timerEnabled}
              onChange={(e) => setTimerEnabled(e.target.checked)}
              disabled={isPlaying}
            />
            <span className="timer-toggle-label">Set Timer</span>
          </label>

          {timerEnabled && !isPlaying && (
            <div className="timer-inputs">
              <div className="timer-input-group">
                <input
                  type="number"
                  className="timer-input"
                  value={timerMinutes}
                  onChange={handleTimerMinutesChange}
                  min="0"
                  max="99"
                  disabled={isPlaying}
                />
                <span className="timer-unit">min</span>
              </div>
              <span className="timer-separator">:</span>
              <div className="timer-input-group">
                <input
                  type="number"
                  className="timer-input"
                  value={timerSeconds.toString().padStart(2, '0')}
                  onChange={handleTimerSecondsChange}
                  min="0"
                  max="59"
                  disabled={isPlaying}
                />
                <span className="timer-unit">sec</span>
              </div>
            </div>
          )}
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

        <div className="action-buttons">
          {breathingModes[selectedMode].videoId && (
            <button className="icon-button" onClick={() => setShowVideo(true)} title={`Watch ${breathingModes[selectedMode].name} Video`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </button>
          )}
          <button className="icon-button" onClick={() => setShowInfo(true)} title="Learn about breathing techniques">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
          </button>

          <a href="/install.html" className="icon-button" title="Install app">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </a>
        </div>

        {showVideo && (
          <div className="modal-overlay" onClick={() => setShowVideo(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowVideo(false)}>×</button>
              <h2>{breathingModes[selectedMode].name} Video</h2>
              <div className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${breathingModes[selectedMode].videoId || 'mPOB8a6llyE'}`}
                  title={breathingModes[selectedMode].name + ' Guide'}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {breathingModes[selectedMode].audioFile && (
          <audio key={selectedMode} ref={audioRef} loop>
            <source src={breathingModes[selectedMode].audioFile} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  )
}

export default App
