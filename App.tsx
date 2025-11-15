
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AuroraBackground } from './components/AuroraBackground';
import { ThreeDBackground } from './components/ThreeDBackground';
import { ProgressBar } from './components/ProgressBar';
import { StepContent } from './components/StepContent';
import { BentoGrid } from './components/BentoGrid';
import { Polaroid } from './components/Polaroid';

// It's good practice to declare global variables from CDNs, especially in TypeScript
declare const confetti: any;

const steps = [
  {
    icon: '❤️',
    headline: "Hey Beautiful,",
    paragraph: "I built a little world for you, just to bring a smile to your face on your special day.",
    buttonText: "Let's Begin"
  },
  {
    icon: '🎉',
    headline: "Happy Birthday!",
    paragraph: "Another year of you making the world brighter. Your existence is a gift, and I'm so lucky to witness it.",
    buttonText: "There's more..."
  },
  {
    headline: "A Few Things I Adore About You",
    content: <BentoGrid />,
    buttonText: "Remember this?"
  },
  {
    headline: "Vartika",
    content: <Polaroid />,
    paragraph: "Every moment with you feels like a scene from a movie I'd watch on repeat.",
    buttonText: "One last thing..."
  },
  {
    icon: '🎂',
    headline: "My Wish For You",
    paragraph: "May the next year bring you all the love, success, and pure happiness you so rightfully deserve. May your dreams soar higher than ever.",
    buttonText: "Celebrate!"
  }
];

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinale, setIsFinale] = useState(false);
  const finalMessageRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNextStep = useCallback(() => {
    if (isAnimating || currentStep >= steps.length - 1) return;
    setIsAnimating(true);
    setCurrentStep(prev => prev + 1);
    setTimeout(() => setIsAnimating(false), 1000); // Animation duration
  }, [currentStep, isAnimating]);

  const runConfettiFinale = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }
    
    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Initial burst
    confetti({ ...defaults, particleCount: 200, origin: { x: 0, y: 1 } });
    confetti({ ...defaults, particleCount: 200, origin: { x: 1, y: 1 } });
    
    // Add emoji confetti
    setTimeout(() => {
        confetti({
            particleCount: 100,
            angle: 90,
            spread: 180,
            origin: { y: 0.6 },
            shapes: ['text'],
            shapeOptions: {
              text: {
                value: ['❤️', '💖', '✨'],
                size: 40,
              },
            },
        });
    }, 1000);
  };

  const handleFinale = useCallback(() => {
    if (isFinale || isAnimating) return;
    setIsAnimating(true);
    setIsFinale(true);
    runConfettiFinale();
  }, [isFinale, isAnimating]);

  useEffect(() => {
    // Preload confetti script
    if (typeof confetti === 'undefined') {
        console.warn('Confetti library not found.');
    }
  }, []);

  return (
    <main className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden">
      <AuroraBackground />
      <ThreeDBackground triggerFinale={isFinale} />
      
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-8 z-10">
        <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
      </div>

      <div className="w-full h-full flex items-center justify-center">
        {steps.map((step, index) => (
          <StepContent
            key={index}
            isActive={index === currentStep}
            onNext={index === steps.length - 1 ? handleFinale : handleNextStep}
            isFinale={isFinale && index === steps.length - 1}
            {...step}
          />
        ))}
      </div>
    </main>
  );
};

export default App;
