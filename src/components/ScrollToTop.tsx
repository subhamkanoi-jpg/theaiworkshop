import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollButtons() {
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(true);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      const atBottom =
        scrollY + window.innerHeight >= document.body.scrollHeight - 100;
      setShowUp(scrollY > 400);
      setShowDown(!atBottom);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const btnCls = (visible: boolean) =>
    cn(
      "flex h-8 w-8 items-center justify-center rounded-full",
      "text-muted-foreground/40 hover:text-muted-foreground",
      "transition-all duration-300",
      visible
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    );

  return (
    <div className="fixed bottom-24 left-4 sm:left-6 md:bottom-6 z-40 flex flex-col gap-2">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={btnCls(showUp)}
      >
        <ArrowUp className="h-4 w-4" />
      </button>
      <button
        onClick={() =>
          window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" })
        }
        aria-label="Scroll down"
        className={btnCls(showDown)}
      >
        <ArrowDown className="h-4 w-4" />
      </button>
    </div>
  );
}
