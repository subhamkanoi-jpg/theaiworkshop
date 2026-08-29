import { useEffect } from "react";
import { initSiteAnimations } from "@/lib/animations";

/** Call once per page mount. Safe under StrictMode. */
export function useSiteMotion() {
  useEffect(() => initSiteAnimations(), []);
}
