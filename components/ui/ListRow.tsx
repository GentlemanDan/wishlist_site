import React from 'react';

interface ListRowProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ListRow({ children, onClick, className = '' }: ListRowProps) {
  return (
    <div
      className={`
        flex items-center gap-3 p-4
        bg-surface border border-border rounded-row
        transition-all duration-smooth
        ${onClick ? 'cursor-pointer hover:bg-surfaceMuted' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
