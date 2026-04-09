import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-cards border border-border rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
}
