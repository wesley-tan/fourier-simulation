'use client';

import { useState, useEffect } from 'react';
import WaveVisualization from '@/components/WaveVisualization';

export default function Home() {
  const [amplitude, setAmplitude] = useState(50);
  const [frequency, setFrequency] = useState(1);
  const [phase, setPhase] = useState(0);
  const [harmonics, setHarmonics] = useState(1);
  const [speed, setSpeed] = useState(0.05);
  const [waveColor, setWaveColor] = useState('#6366f1');
  const [showEquation, setShowEquation] = useState(true);
  const [activeHarmonics, setActiveHarmonics] = useState<boolean[]>([true]);

  // Update active harmonics array when harmonics count changes
  useEffect(() => {
    setActiveHarmonics(prev => {
      const newArray = [...prev];
      while (newArray.length < harmonics) {
        newArray.push(true);
      }
      return newArray.slice(0, harmonics);
    });
  }, [harmonics]);

  const toggleHarmonic = (index: number) => {
    setActiveHarmonics(prev => {
      const newArray = [...prev];
      newArray[index] = !newArray[index];
      return newArray;
    });
  };

  return (
    <main>
      <div className="container">
        <h1>Fourier Transform Wave Simulation</h1>
        <div className="panel">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ flex: 1, minWidth: 250 }}>
              <label>Amplitude: {amplitude}</label>
              <input
                type="range"
                min="1"
                max="100"
                value={amplitude}
                onChange={(e) => setAmplitude(Number(e.target.value))}
              />

              <label>Frequency: {frequency}</label>
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
              />

              <label>Animation Speed: {speed.toFixed(2)}</label>
              <input
                type="range"
                min="0.01"
                max="0.2"
                step="0.01"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
              />
            </div>
            <div style={{ flex: 1, minWidth: 250 }}>
              <label>Phase: {phase.toFixed(2)}π</label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={phase}
                onChange={(e) => setPhase(Number(e.target.value))}
              />

              <label>Harmonics: {harmonics}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={harmonics}
                onChange={(e) => setHarmonics(Number(e.target.value))}
              />

              <label>Wave Color</label>
              <input
                type="color"
                value={waveColor}
                onChange={(e) => setWaveColor(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={showEquation}
                onChange={(e) => setShowEquation(e.target.checked)}
              />
              Show Equation
            </label>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <span className="label" style={{ fontWeight: 700, color: '#fff' }}>Active Harmonics:</span>
            <div className="toggle-group">
              {activeHarmonics.map((active, index) => (
                <button
                  key={index}
                  onClick={() => toggleHarmonic(index)}
                  className={`toggle-btn${active ? ' active' : ''}`}
                  aria-pressed={active}
                >
                  Harmonic {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        <WaveVisualization
          amplitude={amplitude}
          frequency={frequency}
          phase={phase * Math.PI}
          harmonics={harmonics}
          speed={speed}
          waveColor={waveColor}
          showEquation={showEquation}
          activeHarmonics={activeHarmonics}
        />

        <div className="text-center mt-8">
          <p>
            This simulation demonstrates how different harmonics combine to create complex waveforms.
          </p>
          <p>
            Toggle individual harmonics, adjust their parameters, and watch how they combine to form
            the final wave pattern. The equation updates in real-time to show the current wave function.
          </p>
        </div>
      </div>
    </main>
  );
}
