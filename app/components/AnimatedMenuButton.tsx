"use client";

import { useEffect, useRef, useState } from "react";

type MenuPhase =
  | "closed"
  | "hiding-menu"
  | "preparing-close"
  | "showing-close"
  | "open"
  | "hiding-close"
  | "preparing-menu"
  | "showing-menu";

// MenuPhase values are consumed by CSS `[data-phase]` selectors. Keep phase
// names and the timeout durations in sync with the path animations in globals.css.
export function AnimatedMenuButton({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [phase, setPhase] = useState<MenuPhase>(isOpen ? "open" : "closed");
  const [isBusy, setIsBusy] = useState(false);
  const busyRef = useRef(false);
  const timersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  useEffect(() => {
    if (!busyRef.current) setPhase(isOpen ? "open" : "closed");
  }, [isOpen]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const schedule = (callback: () => void, delay: number) => {
    const timer = setTimeout(callback, delay);
    timersRef.current.push(timer);
  };

  const handleClick = () => {
    if (busyRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(isOpen ? "closed" : "open");
      onToggle();
      return;
    }

    busyRef.current = true;
    setIsBusy(true);
    if (!isOpen) {
      onToggle();
      setPhase("hiding-menu");
      schedule(() => {
        setPhase("preparing-close");
        schedule(() => {
          setPhase("showing-close");
          schedule(() => {
            setPhase("open");
            busyRef.current = false;
            setIsBusy(false);
          }, 430);
        }, 34);
      }, 460);
      return;
    }

    setPhase("hiding-close");
    schedule(() => {
      setPhase("preparing-menu");
      schedule(() => {
        setPhase("showing-menu");
        schedule(() => {
          setPhase("closed");
          busyRef.current = false;
          setIsBusy(false);
          onToggle();
        }, 470);
      }, 34);
    }, 410);
  };

  return (
    <button
      className="menu-button"
      data-open={isOpen}
      data-phase={phase}
      aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
      aria-expanded={isOpen}
      aria-disabled={isBusy}
      onClick={handleClick}
    >
      <span className="menu-state menu-closed-state" aria-hidden="true">
        <span className="menu-label">menu</span>
        <svg className="menu-vector" viewBox="0 0 26 18">
          <path pathLength="1" d="M1 1H22.25C23.7688 1 25 2.23122 25 3.75C25 5.26878 23.7688 6.5 22.25 6.5H3.5C2.11929 6.5 1 7.61929 1 9C1 10.3807 2.11929 11.5 3.5 11.5H22.25C23.7688 11.5 25 12.7312 25 14.25C25 15.7688 23.7688 17 22.25 17H1" />
        </svg>
      </span>
      <span className="menu-state menu-open-state" aria-hidden="true">
        <span className="menu-label">Close</span>
        <svg className="close-vector" viewBox="0 0 16 18">
          <path pathLength="1" d="M0 1C4.42 1 8 4.51 8 8.85C8 13.19 4.42 16.7 0 16.7" />
          <path pathLength="1" d="M16 1C11.58 1 8 4.51 8 8.85C8 13.19 11.58 16.7 16 16.7" />
        </svg>
      </span>
    </button>
  );
}
