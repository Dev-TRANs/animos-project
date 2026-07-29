"use client";

import { useEffect } from "react";

export function ScrollBoundaryGuard() {
  useEffect(() => {
    let frame = 0;
    let contentBottom = 0;
    let maxScroll = 0;
    let measuredViewportWidth = window.innerWidth;

    const isInsideScrollableOverlay = (target: EventTarget | null) => (
      target instanceof Element && Boolean(target.closest(".theme-editor-backdrop"))
    );

    const updateMaxScroll = () => {
      maxScroll = Math.max(0, contentBottom - window.innerHeight);
    };

    const measureMaxScroll = () => {
      const footer = document.querySelector<HTMLElement>("main > footer:last-child");
      const scrollingElement = document.scrollingElement ?? document.documentElement;
      contentBottom = footer
        ? footer.getBoundingClientRect().bottom + scrollingElement.scrollTop
        : scrollingElement.scrollHeight;
      measuredViewportWidth = window.innerWidth;
      updateMaxScroll();
    };

    const clampToPage = () => {
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

    const requestMeasureAndClamp = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        measureMaxScroll();
        clampToPage();
      });
    };

    const requestViewportClamp = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Safari changes viewport height while its address bar opens/closes.
        // Re-measuring layout for those height-only changes causes scroll jank.
        if (Math.abs(window.innerWidth - measuredViewportWidth) > 1) {
          measureMaxScroll();
        } else {
          updateMaxScroll();
        }
        clampToPage();
      });
    };

    const handleScroll = () => {
      if (window.scrollY < 0 || window.scrollY > maxScroll + 1) requestClamp();
    };

    const handleWheel = (event: WheelEvent) => {
      if (isInsideScrollableOverlay(event.target)) return;
      const projectedScroll = window.scrollY + event.deltaY;
      if (projectedScroll < 0 || projectedScroll > maxScroll) {
        if (event.cancelable) event.preventDefault();
        window.scrollTo(0, Math.min(maxScroll, Math.max(0, projectedScroll)));
      }
    };

    measureMaxScroll();
    const delayedClamps = [250, 1000].map((delay) => (
      window.setTimeout(requestMeasureAndClamp, delay)
    ));
    const resizeObserver = new ResizeObserver(requestMeasureAndClamp);
    resizeObserver.observe(document.querySelector("main") ?? document.documentElement);

    document.addEventListener("touchend", requestClamp, { passive: true });
    document.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", requestViewportClamp);
    window.addEventListener("pageshow", requestMeasureAndClamp);
    window.visualViewport?.addEventListener("resize", requestViewportClamp);
    window.visualViewport?.addEventListener("scroll", handleScroll);
    return () => {
      cancelAnimationFrame(frame);
      delayedClamps.forEach(window.clearTimeout);
      resizeObserver.disconnect();
      document.removeEventListener("touchend", requestClamp);
      document.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", requestViewportClamp);
      window.removeEventListener("pageshow", requestMeasureAndClamp);
      window.visualViewport?.removeEventListener("resize", requestViewportClamp);
      window.visualViewport?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
