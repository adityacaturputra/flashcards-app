// components/molecules/ProgressionSelector.tsx
import React from 'react';
import { Flashcard, Progression } from '@/types/flashcard';

type ProgressionSelectorProps = {
  value: Flashcard['progression'];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
};

const ProgressionSelector: React.FC<ProgressionSelectorProps> = ({ value, onChange, className = '' }) => {
  return (
    <select value={value} onChange={onChange} className={`border border-gray-300 px-2 py-1 rounded ${className}`}>
      {Object.entries(Progression).map(([key, value]) => (
        <option key={key} value={value}>
          {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalize the first letter of each key */}
        </option>
      ))}
    </select>
  );
};

export default ProgressionSelector;