import React from 'react';
import { DinoState } from '../types';

interface DinoDinoProps {
  state: DinoState;
}

const DinoDino: React.FC<DinoDinoProps> = ({ state }) => {
  const configs = {
    welcome: {
      emoji: '🦕',
      title: 'Welcome!',
      subtitle: "Let's set up your account",
      bgColor: 'bg-green-100',
    },
    noSavings: {
      emoji: '😢',
      title: 'Start Saving!',
      subtitle: 'Set a savings goal to get started',
      bgColor: 'bg-red-100',
    },
    greatJob: {
      emoji: '🎉',
      title: 'Great Job!',
      subtitle: "You're staying on track",
      bgColor: 'bg-green-100',
    },
  };

  const config = configs[state];

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className={`w-24 h-24 rounded-full ${config.bgColor} flex items-center justify-center mb-3`}>
        <span className="text-5xl">{config.emoji}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-800">{config.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{config.subtitle}</p>
    </div>
  );
};

export default DinoDino;
