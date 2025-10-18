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
          <h3>What is it?</h3>
          <p>
            Resonant breathing, also called coherent breathing, involves breathing at a rate of about 5-6 breaths per minute
            (inhaling for 5 seconds, exhaling for 5 seconds). This specific rhythm creates a powerful physiological effect.
          </p>

          <h3>The Science: Heart Rate Variability (HRV)</h3>
          <p>
            When you breathe at this resonant frequency, something remarkable happens in your body. Your heart rate,
            blood pressure, and breathing rhythm begin to synchronize in a harmonious pattern. This is called "cardiac coherence."
          </p>
          <p>
            Heart Rate Variability (HRV) is the variation in time between each heartbeat. Think of it like this:
            a healthy heart doesn't beat like a metronome - instead, it naturally speeds up slightly when you inhale
            and slows down when you exhale. Higher HRV is a sign of a healthy, resilient nervous system.
          </p>
          <p>
            Research shows that resonant breathing maximizes your HRV. When your heart rate variability increases,
            it means your autonomic nervous system (the part that controls automatic functions like heartbeat and digestion)
            is more balanced and flexible. This has been linked to:
          </p>
          <ul>
            <li>Reduced stress and anxiety</li>
            <li>Better emotional regulation</li>
            <li>Improved focus and mental clarity</li>
            <li>Lower blood pressure</li>
            <li>Enhanced athletic performance and recovery</li>
            <li>Better sleep quality</li>
          </ul>

          <h3>The Evidence</h3>
          <p>
            Multiple scientific studies have demonstrated the benefits of resonant breathing:
          </p>
          <ul>
            <li>A 2017 study published in <em>Frontiers in Psychology</em> found that slow breathing at 6 breaths per minute
            significantly increased HRV and reduced anxiety.</li>
            <li>Research from the Cleveland Clinic showed that resonant breathing can lower blood pressure and improve
            cardiovascular health.</li>
            <li>Studies on athletes have shown that regular HRV training through resonant breathing improves recovery
            and performance.</li>
          </ul>

          <h3>How to Use It</h3>
          <p>
            <strong>Best for:</strong> Daily stress management, improving HRV, building resilience, pre-performance preparation
          </p>
          <p>
            <strong>Recommended practice:</strong> 10-20 minutes daily, ideally at the same time each day. Many people
            practice in the morning to start their day centered, or in the evening to unwind.
          </p>
          <p>
            <strong>Tips:</strong> Sit comfortably with your spine straight. Breathe through your nose if possible.
            Focus on making the breath smooth and effortless - you're not trying to take the deepest breath possible,
            just a comfortable, rhythmic breath.
          </p>
        </div>

        <div className="info-section">
          <h2>Parasympathetic Breathing</h2>
          <h3>What is it?</h3>
          <p>
            Parasympathetic breathing features longer exhales than inhales (typically inhaling for 4 seconds and exhaling
            for 6-8 seconds). This pattern specifically activates your parasympathetic nervous system - your body's
            "rest and digest" mode.
          </p>

          <h3>How It Works</h3>
          <p>
            Your autonomic nervous system has two branches: sympathetic (fight-or-flight) and parasympathetic (rest-and-digest).
            When you're stressed, exercising, or in danger, your sympathetic system activates - heart rate increases,
            breathing quickens, muscles tense.
          </p>
          <p>
            The parasympathetic system does the opposite: it slows your heart rate, promotes digestion, and helps your
            body recover and heal. Extended exhales stimulate the vagus nerve, the main nerve of the parasympathetic system,
            telling your body it's safe to relax.
          </p>

          <h3>When to Use It</h3>
          <p>
            <strong>After Exercise:</strong> After a workout, your body is in a sympathetic (activated) state.
            Parasympathetic breathing helps shift you into recovery mode, allowing your muscles to repair and your
            heart rate to return to baseline more efficiently. Practice for 5-10 minutes post-workout.
          </p>
          <p>
            <strong>After Stressful Periods:</strong> Had a difficult meeting? Stuck in traffic? Argument with a loved one?
            Parasympathetic breathing is your reset button. It helps discharge the stress hormones (like cortisol and adrenaline)
            and brings you back to a calm, centered state. Practice for 3-5 minutes whenever you notice stress lingering in your body.
          </p>
          <p>
            <strong>Before Sleep:</strong> If you're wired and tired, parasympathetic breathing can help transition your
            nervous system from "on" to "off," making it easier to fall asleep.
          </p>
          <p>
            <strong>During Anxiety:</strong> When you feel anxious, your sympathetic system is overactive. The extended
            exhales in parasympathetic breathing act as a physiological brake, calming your nervous system.
          </p>

          <h3>How to Practice</h3>
          <p>
            Find a comfortable position. Inhale gently through your nose for 4 counts, then exhale slowly through your
            nose or mouth for 6-8 counts. The exhale should feel like a gentle sigh of relief.
          </p>
          <p>
            You should feel your body soften and relax with each breath. If you feel lightheaded, you're breathing too
            forcefully - make it gentler and more natural.
          </p>
        </div>

        <div className="info-section">
          <h2>Sleep Breathing</h2>
          <p>
            This guided practice uses specific breathing patterns and relaxation techniques to prepare your body and
            mind for deep sleep. It combines extended exhales with body awareness to activate your parasympathetic
            nervous system and release physical tension.
          </p>
          <p>
            <strong>Best for:</strong> Use when lying in bed and ready to sleep. Can also help with mid-night awakenings.
          </p>
        </div>

        <div className="info-section">
          <h2>Before Bed</h2>
          <p>
            A calming breathwork routine designed to help you wind down from the day. This practice helps create a
            buffer between the activity of your day and the restfulness of sleep, signaling to your body that it's
            time to transition into sleep mode.
          </p>
          <p>
            <strong>Best for:</strong> Practice 30-60 minutes before bedtime as part of your wind-down routine.
          </p>
        </div>

        <div className="info-section">
          <h2>Morning Breathing</h2>
          <p>
            An energizing breathwork practice to help you start your day feeling awake, focused, and centered.
            This routine gently activates your nervous system and increases oxygen flow, helping you feel more
            alert without the jitters of caffeine.
          </p>
          <p>
            <strong>Best for:</strong> First thing in the morning or whenever you need an energy boost during the day.
          </p>
        </div>

        <div className="info-section">
          <h2>General Tips</h2>
          <ul>
            <li><strong>Consistency matters more than duration:</strong> 5 minutes daily is better than 30 minutes once a week</li>
            <li><strong>Nose breathing is ideal:</strong> When possible, breathe through your nose - it filters air, regulates temperature, and produces nitric oxide which improves oxygen absorption</li>
            <li><strong>Don't force it:</strong> Breathing exercises should feel calming, not stressful. If you feel uncomfortable, lighten the effort</li>
            <li><strong>Track your progress:</strong> Notice how you feel before and after practice. Many people report feeling calmer, more focused, and sleeping better after just a few weeks</li>
            <li><strong>Be patient:</strong> Like any practice, the benefits compound over time. Give it at least 2-3 weeks of consistent practice</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Info
