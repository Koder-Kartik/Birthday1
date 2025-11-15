
import React from 'react';

interface BentoCardProps {
  title: string;
  text: string;
  className?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({ title, text, className }) => (
  <div className={`bg-white/5 p-4 rounded-xl border border-white/10 ${className}`}>
    <h3 className="font-bold text-pink-200">{title}</h3>
    <p className="text-sm text-stone-300 mt-1">{text}</p>
  </div>
);

export const BentoGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 text-left">
      <BentoCard 
        title="✨ Your Unmatched Kindness" 
        text="The genuine warmth you show to everyone is something truly rare and beautiful." 
        className="col-span-2"
      />
      <BentoCard 
        title="😊 That Smile" 
        text="It's a work of art." 
        className=""
      />
      <BentoCard 
        title="🌟 Your Radiant Spirit" 
        text="Your passion for life is infectious. Being around you makes everything feel more exciting and possible." 
        className="col-span-2 sm:col-span-1"
      />
    </div>
  );
};
