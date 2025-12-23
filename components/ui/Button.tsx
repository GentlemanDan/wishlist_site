import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-input transition-all duration-smooth disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent/90 active:bg-accent/95',
    secondary: 'bg-surface border border-border text-text hover:bg-surfaceMuted',
    ghost: 'bg-transparent text-text hover:bg-surfaceMuted',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm h-9',
    md: 'px-5 py-2.5 text-base h-11',
    lg: 'px-6 py-3 text-base h-12',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
