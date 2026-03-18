import { ReactNode } from "react";

interface ContentCardProps {
  children: ReactNode;
  className?: string;
  accent?: "red" | "pink" | "yellow" | "blue" | "none";
}

export function ContentCard({ children, className = "", accent = "none" }: ContentCardProps) {
  const accentColors = {
    red: 'var(--color-sport-red)',
    pink: 'var(--color-label-pink)',
    yellow: 'var(--color-archive-yellow)',
    blue: 'var(--color-cold-blue)',
    none: 'transparent',
  };

  return (
    <div 
      className={`p-6 border-2 shadow-sm ${className}`}
      style={{ 
        backgroundColor: 'var(--color-paper-white)',
        borderColor: accent !== 'none' ? accentColors[accent] : 'var(--color-ink-black)' + '20',
        fontFamily: 'var(--font-body)'
      }}
    >
      {children}
    </div>
  );
}
