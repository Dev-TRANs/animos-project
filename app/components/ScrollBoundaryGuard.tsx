"use client";

import { useEffect } from "react";

export function ScrollBoundaryGuard() {
  useEffect(() => {
    let previousTouchY = 0;
    let frame = 0;

    const isInsideScrollableOverlay = (target: EventTarget | null) => (
      target instanceof Element && Boolean(target.closest(".theme-editor-backdrop"))
    );

    const getMaxScroll = () => {
      const footer = document.querySelector<HTMLElement>("main > footer:last-child");
      const scrollingElement = document.scrollingElement ?? document.documentElement;
      const contentBottom = footer
        ? footer.getBoundingClientRect().bottom + scrollingElement.scrollTop
        : scrollingElement.scrollHeight;
      return Math.max(0, contentBottom - window.innerHeight);
    };

    const clampToPage = () => {
      const maxScroll = getMaxScroll();
      if (window.scrollY < 0) {
        window.scrollTo(0, 0);
      } else if (window.scrollY > maxScroll + 1) {
        window.scrollTo(0, maxScroll);
      }
    };

    const requestClamp = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(clampToPage);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) previousTouchY = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 1 || isInsideScrollableOverlay(event.target)) return;
      const currentTouchY = event.touches[0].clientY;
      const movement = currentTouchY - previousTouchY;
      previousTouchY = currentTouchY;
      const maxScroll = getMaxScroll();
      const projectedScroll = window.scrollY - movement;
      if (projectedScroll < 0 || projectedScroll > maxScroll) {
        if (event.cancelable) event.preventDefault();
        window.scrollTo(0, Math.min(maxScroll, Math.max(0, projectedScroll)));
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (isInsideScrollableOverlay(event.target)) return;
      const maxScroll = getMaxScroll();
      const projectedScroll = window.scrollY + event.deltaY;
      if (projectedScroll < 0 || projectedScroll > maxScroll) {
        if (event.cancelable) event.preventDefault();
        window.scrollTo(0, Math.min(maxScroll, Math.max(0, projectedScroll)));
      }
    };

    const delayedClamps = [0, 250, 1000].map((delay) => (
      window.setTimeout(requestClamp, delay)
    ));

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", requestClamp, { passive: true });
    document.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", requestClamp, { passive: true });
    window.addEventListener("resize", requestClamp);
    window.addEventListener("pageshow", requestClamp);
    window.visualViewport?.addEventListener("resize", requestClamp);
    window.visualViewport?.addEventListener("scroll", requestClamp);
    return () => {
      cancelAnimationFrame(frame);
      delayedClamps.forEach(window.clearTimeout);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", requestClamp);
      document.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", requestClamp);
      window.removeEventListener("resize", requestClamp);
      window.removeEventListener("pageshow", requestClamp);
      window.visualViewport?.removeEventListener("resize", requestClamp);
      window.visualViewport?.removeEventListener("scroll", requestClamp);
    };
  }, []);

  return null;
}
