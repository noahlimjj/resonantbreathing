import { useState } from 'react'
import './Info.css'

function Info({ onBack }) {
  return (
    <div className="info-page">
      <div className="info-container">
        <button className="back-button" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>

        <h1 className="info-title">Breathing Techniques Guide</h1>

        <div className="info-section">
          <h2>Resonant Breathing</h2>
          <p>
            Breathing at 5-6 breaths per minute (5 seconds in, 5 seconds out) creates cardiac coherence -
            your heart rate, blood pressure, and breathing synchronize in a harmonious pattern.
          </p>

          <h3>Heart Rate Variability (HRV)</h3>
          <p>
            HRV measures the variation between heartbeats. A healthy heart speeds up slightly when you inhale
            and slows when you exhale. Higher HRV means a more resilient nervous system.
          </p>
          <p>
            Resonant breathing maximizes HRV, leading to reduced stress, better emotional regulation,
            improved focus, lower blood pressure, enhanced athletic recovery, and better sleep.
            Studies show slow breathing at 6 breaths per minute significantly increases HRV and reduces anxiety.
          </p>

          <h3>How to Use</h3>
          <p>
            <strong>Best for:</strong> Daily stress management, building resilience, improving recovery
          </p>
          <p>
            <strong>Practice:</strong> 10-20 minutes daily. Sit comfortably, breathe through your nose,
            keep it smooth and effortless.
          </p>
        </div>

        <div className="info-section">
          <h2>Parasympathetic Breathing</h2>
          <p>
            Longer exhales than inhales (4 seconds in, 6-8 seconds out) activate your "rest and digest"
            nervous system. Extended exhales stimulate the vagus nerve, telling your body it's safe to relax.
          </p>

          <h3>When to Use</h3>
          <p>
            <strong>After Exercise:</strong> Shifts you from fight-or-flight into recovery mode.
            Practice 5-10 minutes post-workout for faster recovery.
          </p>
          <p>
            <strong>After Stress:</strong> Your reset button after difficult meetings, traffic, or conflict.
            Helps discharge stress hormones. Practice 3-5 minutes as needed.
          </p>
          <p>
            <strong>Before Sleep or During Anxiety:</strong> Transitions nervous system from "on" to "off."
          </p>

          <h3>How to Practice</h3>
          <p>
            Inhale 4 counts, exhale 6-8 counts. The exhale should feel like a gentle sigh of relief.
            If lightheaded, breathe more gently.
          </p>
        </div>

        <div className="info-section">
          <h2>Sleep Breathing</h2>
          <p>
            Guided practice combining extended exhales with body awareness to prepare for deep sleep.
            Use when lying in bed or during mid-night awakenings.
          </p>
        </div>

        <div className="info-section">
          <h2>Before Bed</h2>
          <p>
            Calming routine to wind down from the day and signal your body it's time to transition into sleep mode.
            Practice 30-60 minutes before bedtime.
          </p>
        </div>

        <div className="info-section">
          <h2>Morning Breathing</h2>
          <p>
            Energizing practice to start your day feeling awake and focused. Gently activates your nervous
            system without the jitters of caffeine. Use first thing in the morning or when you need an energy boost.
          </p>
        </div>

        <div className="info-section">
          <h2>Tips</h2>
          <ul>
            <li>Consistency matters: 5 minutes daily beats 30 minutes once a week</li>
            <li>Breathe through your nose when possible for better oxygen absorption</li>
            <li>Keep it comfortable - breathing should feel calming, not stressful</li>
            <li>Be patient - benefits compound over 2-3 weeks of consistent practice</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Info
