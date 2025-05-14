import { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import * as math from 'mathjs';

interface WaveVisualizationProps {
  amplitude: number;
  frequency: number;
  phase: number;
  harmonics: number;
  speed: number;
  waveColor: string;
  showEquation: boolean;
  activeHarmonics: boolean[];
}

const WaveVisualization: React.FC<WaveVisualizationProps> = ({
  amplitude,
  frequency,
  phase,
  harmonics,
  speed,
  waveColor,
  showEquation,
  activeHarmonics,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState(0);

  const generateEquation = () => {
    let equation = 'f(x) = ';
    for (let n = 1; n <= harmonics; n++) {
      if (activeHarmonics[n - 1]) {
        const harmonicAmplitude = (amplitude / n).toFixed(1);
        const harmonicFrequency = (frequency * n).toFixed(1);
        equation += `${harmonicAmplitude}sin(${harmonicFrequency}x + ${phase.toFixed(1)}π)`;
        if (n < harmonics && activeHarmonics[n]) {
          equation += ' + ';
        }
      }
    }
    return equation;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw individual harmonics
      for (let n = 1; n <= harmonics; n++) {
        if (activeHarmonics[n - 1]) {
          ctx.strokeStyle = `${waveColor}${Math.floor(255 * (1 - n / harmonics))}`;
          ctx.lineWidth = 1;
          ctx.beginPath();

          for (let x = 0; x < canvas.width; x++) {
            const harmonicAmplitude = amplitude / n;
            const harmonicFrequency = frequency * n;
            const y = canvas.height / 2 + 
              harmonicAmplitude * Math.sin(2 * Math.PI * harmonicFrequency * (x / canvas.width) + phase + time);

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }
      }

      // Draw the combined wave
      ctx.strokeStyle = waveColor;
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = 0; x < canvas.width; x++) {
        let y = canvas.height / 2;
        
        for (let n = 1; n <= harmonics; n++) {
          if (activeHarmonics[n - 1]) {
            const harmonicAmplitude = amplitude / n;
            const harmonicFrequency = frequency * n;
            y += harmonicAmplitude * Math.sin(2 * Math.PI * harmonicFrequency * (x / canvas.width) + phase + time);
          }
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      setTime(prev => prev + speed);
      requestAnimationFrame(animate);
    };

    animate();
  }, [amplitude, frequency, phase, harmonics, speed, waveColor, activeHarmonics]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="w-full h-[400px] bg-gray-900 rounded-lg mb-4"
      />
      {showEquation && (
        <div className="text-center text-gray-700 font-mono text-lg bg-white p-4 rounded-lg shadow">
          {generateEquation()}
        </div>
      )}
    </div>
  );
};

export default WaveVisualization; 