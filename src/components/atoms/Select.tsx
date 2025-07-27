// src/components/atoms/Select.tsx
'use client';
import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  className,
}) => {
  return (
    <div className='flex flex-col'>
      {label && <label className='mb-2 text-sm font-semibold'>{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className={`w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none ${className}`}
      >
        <option value='' disabled>
          Select an Option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
