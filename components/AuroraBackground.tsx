import React from 'react';

const Aurora: React.FC<{ color: string; animation: string }> = ({ color, animation }) => (
  <div
    className={`absolute top-1/2 left-1/2 w-[150vmax] h-[150vmax] rounded-full ${color} opacity-40 mix-blend-screen filter blur-3xl animate-pulse ${animation}`}
    style={{ transform: 'translate(-50%, -50%)' }}
  />
);

export const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-20">
      <div className="absolute inset-0 bg-stone-950">
        <Aurora color="bg-pink-500" animation="animate-[spin_20s_linear_infinite]" />
        <Aurora color="bg-purple-500" animation="animate-[spin_25s_linear_infinite_reverse]" />
        <Aurora color="bg-red-500" animation="animate-[spin_30s_linear_infinite]" />
        <Aurora color="bg-rose-400" animation="animate-[spin_35s_linear_infinite_reverse]" />
      </div>
    </div>
  );
};
