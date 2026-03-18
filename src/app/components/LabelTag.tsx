interface LabelTagProps {
  children: React.ReactNode;
  variant?: "default" | "red" | "pink" | "yellow";
}

export function LabelTag({ children, variant = "default" }: LabelTagProps) {
  const variants = {
    default: { bg: 'var(--color-warm-gray)', color: 'var(--color-ink-black)' },
    red: { bg: 'var(--color-sport-red)', color: '#fff' },
    pink: { bg: 'var(--color-label-pink)', color: '#fff' },
    yellow: { bg: 'var(--color-archive-yellow)', color: 'var(--color-ink-black)' },
  };

  return (
    <span 
      className="inline-block px-2 py-0.5 text-xs font-bold uppercase tracking-wider"
      style={{ 
        backgroundColor: variants[variant].bg,
        color: variants[variant].color,
        fontFamily: 'var(--font-body)'
      }}
    >
      {children}
    </span>
  );
}
