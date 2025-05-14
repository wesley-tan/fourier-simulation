'use client';

import { useState, useEffect } from 'react';
import WaveVisualization from '@/components/WaveVisualization';

export default function Home() {
  const [amplitude, setAmplitude] = useState(50);
  const [frequency, setFrequency] = useState(1);
  const [phase, setPhase] = useState(0);
  const [harmonics, setHarmonics] = useState(1);
  const [speed, setSpeed] = useState(0.05);
  const [waveColor, setWaveColor] = useState('#4F46E5');
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
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Fourier Transform Wave Simulation
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amplitude: {amplitude}
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={amplitude}
                  onChange={(e) => setAmplitude(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency: {frequency}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Animation Speed: {speed.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.2"
                  step="0.01"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phase: {phase.toFixed(2)}π
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={phase}
                  onChange={(e) => setPhase(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harmonics: {harmonics}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={harmonics}
                  onChange={(e) => setHarmonics(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wave Color
                </label>
                <input
                  type="color"
                  value={waveColor}
                  onChange={(e) => setWaveColor(e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={showEquation}
                onChange={(e) => setShowEquation(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Show Equation</span>
            </label>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Active Harmonics:</h3>
            <div className="flex flex-wrap gap-2">
              {activeHarmonics.map((active, index) => (
                <button
                  key={index}
                  onClick={() => toggleHarmonic(index)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    active
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
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

        <div className="mt-8 text-center text-gray-600">
          <p className="mb-2">
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
