import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface StepContentProps {
  isActive: boolean;
  icon?: string;
  headline: string;
  paragraph?: string;
  content?: React.ReactNode;
  buttonText: string;
  onNext: () => void;
  isFinale: boolean;
}

const NextButton: React.FC<{ onClick: () => void; isFinale: boolean; text: string; }> = ({ onClick, isFinale, text }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (isFinale) {
      gsap.to(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          if (buttonRef.current) buttonRef.current.style.display = 'none';
        }
      });
    }
  }, [isFinale]);
  
  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={isFinale}
      className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-full shadow-lg shadow-pink-500/30 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:shadow-pink-500/50 focus:outline-none focus:ring-4 focus:ring-pink-300"
    >
      {text}
    </button>
  );
};

export const StepContent: React.FC<StepContentProps> = ({
  isActive, icon, headline, paragraph, content, buttonText, onNext, isFinale
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  // FIX: Changed the ref array's generic type to HTMLElement to correctly handle different element types (div, h1, p) for GSAP animations.
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const finalMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      gsap.to(cardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.fromTo(elementsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.6, ease: 'power2.out', delay: 0.5 }
      );
    } else {
      gsap.to(cardRef.current, {
        opacity: 0,
        y: -50,
        scale: 0.95,
        duration: 0.5,
        ease: 'power3.in',
      });
    }
  }, [isActive]);
  
  useEffect(() => {
    if (isFinale) {
      gsap.fromTo(finalMessageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
      );
    }
  }, [isFinale]);

  return (
    <div
      ref={cardRef}
      className={`absolute w-full h-full flex items-center justify-center p-4 ${isActive ? 'z-10' : 'z-0'}`}
      style={{ opacity: 0, transform: 'translateY(50px) scale(0.95)' }}
    >
      <div className="w-full max-w-md md:max-w-xl text-center bg-stone-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="flex flex-col items-center">
          {/* FIX: Ref callbacks must not return a value. Wrapped assignments in a block statement `{}` to ensure an implicit `undefined` return. */}
          {icon && <div ref={el => { elementsRef.current[0] = el; }} className="text-6xl mb-4 animate-[beat_2s_ease-in-out_infinite]">{icon}</div>}
          <h1 ref={el => { elementsRef.current[1] = el; }} className="font-playfair text-4xl md:text-5xl font-bold text-gradient">{headline}</h1>
          {paragraph && <p ref={el => { elementsRef.current[2] = el; }} className="mt-4 text-lg text-stone-300 max-w-sm mx-auto">{paragraph}</p>}
          <div ref={el => { elementsRef.current[3] = el; }} className="w-full mt-6">{content}</div>

          <div ref={el => { elementsRef.current[4] = el; }} className="w-full">
             <NextButton onClick={onNext} isFinale={isFinale} text={buttonText} />
          </div>
          
          {isFinale && (
            <div ref={finalMessageRef} className="mt-8 text-xl text-pink-200" style={{ opacity: 0 }}>
              Happy Birthday, my friend! ❤️
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
