import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ReserveButton({
  className,
  block = false,
  label = "Reserve your seat",
}: {
  className?: string;
  block?: boolean;
  label?: string;
}) {
  return (
    <a
      href="/book"
      className={cn(
        "pressable inline-flex items-center justify-center gap-2 rounded-full",
        "bg-[#c8553d] text-white font-bold text-base",
        "min-h-12 px-8 shadow-e1",
        block ? "flex w-full" : "w-full sm:w-auto",
        className
      )}
    >
      {label} <ArrowRight className="h-4 w-4" />
    </a>
  );
}
