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
    let first = true;
    for (let n = 1; n <= harmonics; n++) {
      if (activeHarmonics[n - 1]) {
        if (!first) equation += ' + ';
        first = false;
        const harmonicAmplitude = (amplitude / n).toFixed(1);
        const harmonicFrequency = (frequency * n).toFixed(1);
        equation += `${harmonicAmplitude}sin(${harmonicFrequency}x + ${phase.toFixed(1)}π)`;
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="wave-canvas"
      />
      {showEquation && (
        <div className="equation">
          {generateEquation()}
        </div>
      )}
    </div>
  );
};

export default WaveVisualization; 