
import React, { useRef, MouseEvent } from 'react';

export const Polaroid: React.FC = () => {
  const polaroidRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!polaroidRef.current) return;

    const { left, top, width, height } = polaroidRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    
    const rotateX = (-y / height) * 20; // Max rotation 10 degrees
    const rotateY = (x / width) * 20;   // Max rotation 10 degrees

    polaroidRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    if (polaroidRef.current) {
      polaroidRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
  };

  return (
    <div 
      ref={polaroidRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="mx-auto w-64 bg-white p-4 pb-12 rounded-lg shadow-2xl transform -rotate-3 transition-transform duration-300 ease-out"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <img
        // NOTE: The original Google Photos link won't work for direct embedding. 
        // Replaced with a placeholder. Please use a direct image link for the actual greeting.
        src="https://images.unsplash.com/photo-1500332841649-6a7f4b37063c?q=80&w=1887&auto=format&fit=crop"
        alt="A special memory"
        className="w-full h-auto"
      />
      <p className="font-playfair text-xl text-black text-center mt-4">Happy Birthday</p>
    </div>
  );
};
