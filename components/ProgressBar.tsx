
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="w-full max-w-sm mx-auto bg-white/10 backdrop-blur-sm rounded-full h-1.5">
      <div
        className="bg-gradient-to-r from-pink-500 to-red-500 h-1.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
