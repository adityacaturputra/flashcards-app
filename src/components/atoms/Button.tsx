// components/atoms/Button.tsx
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled = false,
  style,
}) => {
  return (
    <button
      className={`flex items-center gap-2 rounded bg-blue-500 ${disabled ? 'bg-gray-300' : ''} px-4 py-2 text-white ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
