// components/atoms/InputField.tsx
import React from 'react';

type InputFieldProps = {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
};

const InputField: React.FC<InputFieldProps> = ({ placeholder, value, onChange, className = '' }) => {
  return (
    <input
      className={`border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 ${className}`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default InputField;
