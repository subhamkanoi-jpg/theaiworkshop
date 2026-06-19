import { cn } from "@/lib/utils";

type LogoProps = {
  /** Wrapper classes (spacing, etc.). */
  className?: string;
  /** Sizes the hexagon icon — height-based, e.g. "h-9 w-auto". */
  iconClassName?: string;
  /** Sizes the wordmark, e.g. "text-xl". */
  textClassName?: string;
};

/**
 * The AI Workshop brand lockup — the hexagonal node-network mark (transparent
 * PNG) next to a single-line "THE AI WORKSHOP" wordmark rendered as live text,
 * so it stays crisp at any size and adapts to the theme colour.
 */
export function Logo({
  className,
  iconClassName = "h-9 w-auto",
  textClassName = "text-xl",
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src="/logo-icon.png"
        alt=""
        aria-hidden="true"
        className={cn("shrink-0", iconClassName)}
        draggable={false}
      />
      <span
        className={cn(
          "font-brand font-extrabold uppercase tracking-tight leading-none text-foreground whitespace-nowrap",
          textClassName
        )}
      >
        The AI Workshop
      </span>
    </span>
  );
}
