interface StatusBadgeProps {
  status: "green" | "yellow" | "red";
  label: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const colors = {
    green: { bg: '#4CAF50', text: '#fff' },
    yellow: { bg: 'var(--color-archive-yellow)', text: 'var(--color-ink-black)' },
    red: { bg: 'var(--color-sport-red)', text: '#fff' },
  };

  return (
    <span 
      className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wide"
      style={{ 
        backgroundColor: colors[status].bg,
        color: colors[status].text,
        fontFamily: 'var(--font-body)'
      }}
    >
      {label}
    </span>
  );
}
