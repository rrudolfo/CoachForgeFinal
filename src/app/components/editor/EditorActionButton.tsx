import { cn } from "../ui/utils";

interface EditorActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "danger" | "ghost";
}

export function EditorActionButton({
  className,
  variant = "default",
  type = "button",
  ...props
}: EditorActionButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        variant === "default" &&
          "text-white",
        variant === "danger" &&
          "bg-white text-[var(--color-sport-red)]",
        variant === "ghost" &&
          "bg-white text-[var(--color-ink-black)]",
        className,
      )}
      style={{
        borderColor:
          variant === "danger"
            ? "var(--color-sport-red)"
            : "var(--color-ink-black)",
        backgroundColor:
          variant === "default" ? "var(--color-sport-red)" : "var(--color-paper-white)",
      }}
      {...props}
    />
  );
}
