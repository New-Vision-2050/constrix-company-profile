import { useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

interface UsePageScrollNavigationOptions {
  pages: { path: string }[];
  currentPath: string;
  locale: string;
  scrollThreshold?: number;
  debounceTime?: number;
  enabled?: boolean;
}

export function usePageScrollNavigation({
  pages,
  currentPath,
  locale,
  scrollThreshold = 80,
  debounceTime = 800,
  enabled = true,
}: UsePageScrollNavigationOptions) {
  const router = useRouter();
  const lastScrollTime = useRef(0);
  const isNavigating = useRef(false);
  const accumulatedDelta = useRef(0);

  const getCurrentIndex = useCallback(() => {
    return pages.findIndex((page) =>
      currentPath.toLowerCase().includes(page.path.toLowerCase())
    );
  }, [pages, currentPath]);

  const navigateToPage = useCallback(
    (direction: "next" | "prev") => {
      if (isNavigating.current) return;

      const currentIndex = getCurrentIndex();
      if (currentIndex === -1) return;

      let newIndex: number;
      if (direction === "next") {
        newIndex = (currentIndex + 1) % pages.length;
      } else {
        newIndex = (currentIndex - 1 + pages.length) % pages.length;
      }

      isNavigating.current = true;
      router.push(`/${locale}${pages[newIndex].path}`);

      setTimeout(() => {
        isNavigating.current = false;
        accumulatedDelta.current = 0;
      }, debounceTime);
    },
    [getCurrentIndex, pages, locale, router, debounceTime]
  );

  useEffect(() => {
    if (!enabled) return;

    const handleWheel = (event: WheelEvent) => {
      const now = Date.now();
      
      // Reset accumulated delta if too much time passed
      if (now - lastScrollTime.current > 200) {
        accumulatedDelta.current = 0;
      }
      
      lastScrollTime.current = now;
      
      // Accumulate scroll delta for smoother detection
      accumulatedDelta.current += event.deltaY;

      // Only navigate when accumulated scroll exceeds threshold
      if (Math.abs(accumulatedDelta.current) >= scrollThreshold) {
        if (accumulatedDelta.current > 0) {
          navigateToPage("next");
        } else {
          navigateToPage("prev");
        }
        accumulatedDelta.current = 0;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [enabled, debounceTime, scrollThreshold, navigateToPage]);

  return {
    currentIndex: getCurrentIndex(),
    navigateToPage,
    totalPages: pages.length,
  };
}
