import { useState, useRef, useEffect } from 'react'
import './App.css'
import Info from './Info'

// Daily verse/quote — same one all day, rotates daily
const verses = [
  { text: "Be still, and know that I am God.", source: "Psalm 46:10 🙏" },
  { text: "I can do all things through Christ who strengthens me.", source: "Philippians 4:13" },
  { text: "The Lord is my shepherd; I shall not want.", source: "Psalm 23:1" },
  { text: "Fear not, for I am with you.", source: "Isaiah 41:10" },
  { text: "Your peace I give to you.", source: "John 14:27" },
  { text: "This is the day the Lord has made; I will rejoice and be glad in it.", source: "Psalm 118:24" },
  { text: "He leads me beside still waters.", source: "Psalm 23:2" },
  { text: "The Lord is near to all who call on him.", source: "Psalm 145:18" },
  { text: "Let your gentleness be evident to all.", source: "Philippians 4:5" },
  { text: "Do not be anxious about anything.", source: "Philippians 4:6" },
  { text: "My grace is sufficient for you.", source: "2 Corinthians 12:9" },
  { text: "You are worthy, Lord, to receive glory.", source: "Revelation 5:12" },
  { text: "Be strong and take heart.", source: "Psalm 27:14" },
  { text: "He calms the storm to a whisper.", source: "Psalm 107:29" },
  { text: "Rest in me, and be still.", source: "Psalm 46:10 (paraphrase)" },
  { text: "Rise after falling. Strength is forged through struggle.", source: "Motivational" },
  { text: "Consistency beats intensity every time.", source: "Motivational" },
  { text: "You don't have to be great to start, but you have to start to be great.", source: "Zig Ziglar" },
  { text: "The only way out is through.", source: "Robert Frost" },
  { text: "Discipline is choosing between what you want now and what you want most.", source: "Abraham Lincoln" },
  { text: "Recovery is not a sign of weakness.", source: "Motivational" },
  { text: "Breathe. It is just a bad day, not a bad life.", source: "Motivational" },
  { text: "Progress, not perfection.", source: "Motivational" },
  { text: "Small daily improvements are the key to staggering long-term results.", source: "Motivational" },
  { text: "You are closer than you think.", source: "Motivational" },
]

const getDailyVerse = () => {
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  return verses[seed % verses.length]
}

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedMode, setSelectedMode] = useState('resonant') // 'resonant' or 'pns'
  const [showInfo, setShowInfo] = useState(false)
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
      audioFile: '/yoga-nidra.mp3',
      videoId: null
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

  const dailyVerse = getDailyVerse()

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

        <div className="daily-verse">
          <p className="verse-text">"{dailyVerse.text}"</p>
          <p className="verse-source">— {dailyVerse.source}</p>
        </div>

        <div className="action-buttons">
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
