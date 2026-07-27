"use client";

import { useEffect } from "react";

export function ScrollBoundaryGuard() {
  useEffect(() => {
    let previousTouchY = 0;

    const isInsideScrollableOverlay = (target: EventTarget | null) => (
      target instanceof Element && Boolean(target.closest(".theme-editor-backdrop"))
    );

    const getBoundary = () => {
      const scrollingElement = document.scrollingElement ?? document.documentElement;
      const maxScroll = Math.max(0, scrollingElement.scrollHeight - window.innerHeight);
      return {
        atTop: window.scrollY <= 0,
        atBottom: window.scrollY >= maxScroll - 1,
      };
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) previousTouchY = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 1 || isInsideScrollableOverlay(event.target)) return;
      const currentTouchY = event.touches[0].clientY;
      const movement = currentTouchY - previousTouchY;
      previousTouchY = currentTouchY;
      const { atTop, atBottom } = getBoundary();
      if ((atTop && movement > 0) || (atBottom && movement < 0)) event.preventDefault();
    };

    const handleWheel = (event: WheelEvent) => {
      if (isInsideScrollableOverlay(event.target)) return;
      const { atTop, atBottom } = getBoundary();
      if ((atTop && event.deltaY < 0) || (atBottom && event.deltaY > 0)) event.preventDefault();
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return null;
}
