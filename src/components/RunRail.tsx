import type { CSSProperties } from "react";
import { RUN } from "@/config";
import { cn } from "@/lib/utils";

/**
 * The timed blocks of the day, as a hairline grid: one tile per `RUN` entry.
 * The pages keep their own heading and closing line.
 *
 * The hairlines are the grid gap showing the container's border colour, so an
 * empty cell would show up as a solid grey tile. To never leave one for any
 * number of blocks: below `sm` it is one column; at `sm` two columns, and an
 * odd last tile spans both; at `lg` one column per block (`--run-cols`).
 */
export function RunRail({ className }: { className?: string }) {
  return (
    <ol
      className={cn(
        "grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:[grid-template-columns:repeat(var(--run-cols),minmax(0,1fr))]",
        className,
      )}
      style={{ "--run-cols": RUN.length } as CSSProperties}
    >
      {RUN.map(({ time, title }, i) => (
        <li
          key={time}
          className="flex flex-col gap-2 bg-card p-5 sm:[&:last-child:nth-child(odd)]:col-span-2 lg:[&:last-child:nth-child(odd)]:col-span-1"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Block {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-serif text-2xl font-semibold text-primary tabular-nums">
            {time}
          </span>
          <span className="text-base font-medium leading-snug">{title}</span>
        </li>
      ))}
    </ol>
  );
}
