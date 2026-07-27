"use client";

import { useEffect } from "react";

export function ScrollBoundaryGuard() {
  useEffect(() => {
    let previousTouchY = 0;
    let frame = 0;

    const isInsideScrollableOverlay = (target: EventTarget | null) => (
      target instanceof Element && Boolean(target.closest(".theme-editor-backdrop"))
    );

    const getElementBottom = (element: HTMLElement) => {
      let bottom = element.offsetHeight;
      let current: HTMLElement | null = element;
      while (current) {
        bottom += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
      }
      return bottom;
    };

    const getMaxScroll = () => {
      const footer = document.querySelector<HTMLElement>("main > footer:last-child");
      const scrollingElement = document.scrollingElement ?? document.documentElement;
      const contentBottom = footer
        ? getElementBottom(footer)
        : scrollingElement.scrollHeight;
      const viewport = window.visualViewport;
      const viewportBottom = viewport
        ? viewport.height + viewport.offsetTop
        : window.innerHeight;
      return Math.max(0, contentBottom - viewportBottom);
    };

    const getBoundary = () => {
      const maxScroll = getMaxScroll();
      return {
        atTop: window.scrollY <= 0,
        atBottom: window.scrollY >= maxScroll - 1,
      };
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
      const { atTop, atBottom } = getBoundary();
      if ((atTop && movement > 0) || (atBottom && movement < 0)) event.preventDefault();
    };

    const handleWheel = (event: WheelEvent) => {
      if (isInsideScrollableOverlay(event.target)) return;
      const { atTop, atBottom } = getBoundary();
      if ((atTop && event.deltaY < 0) || (atBottom && event.deltaY > 0)) event.preventDefault();
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
