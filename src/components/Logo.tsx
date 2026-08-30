import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/LogoMark";

type LogoProps = {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
};

export function Logo({
  className,
  iconClassName = "h-9 w-auto",
  textClassName = "text-xl",
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={cn("aspect-square", iconClassName)} />
      <span
        className={cn(
          "font-serif font-semibold tracking-tight leading-none text-foreground whitespace-nowrap",
          textClassName
        )}
      >
        The AI Workshop
      </span>
    </span>
  );
}
