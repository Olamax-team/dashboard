import React from 'react';
import { cn } from "@/lib/utils"; // Assuming cn is a utility for joining class names

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div className={cn("bg-white border border-gray-200 rounded-lg shadow-sm", className)}>
      {children}
    </div>
  );
};

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ className, children }) => {
  return (
    <div className={cn("p-4", className)}>
      {children}
    </div>
  );
};
