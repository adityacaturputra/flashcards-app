// components/atoms/Button.tsx
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean; // Add disabled prop
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled = false,
}) => {
  return (
    <button
      className={`rounded bg-blue-500 px-4 py-2 text-white ${className}`}
      onClick={onClick}
      disabled={disabled} // Apply disabled prop
    >
      {children}
    </button>
  );
};

export default Button;
