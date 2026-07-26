"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteLinks } from "../site-config";

const navItems = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Actions", "/actions"],
  ["News", "/news"],
  ["Contact", "/contact"],
];

function MenuButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className="menu-button"
      data-open={isOpen}
      aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
      aria-expanded={isOpen}
      onClick={onClick}
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

export function InteriorHeader({ current }: { current: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", isOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [isOpen]);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".interior-hero");
    if (!hero) return;

    const updateHeader = () => {
      setIsPastHero(window.scrollY >= hero.offsetTop + hero.offsetHeight - 90);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);
    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, []);

  return (
    <header className={`poster-header interior-header${isPastHero ? " is-past-hero" : ""}`}>
      <div className="header-brand-row">
        <Link className="wordmark" href="/">Animos Project</Link>
        <nav className="desktop-nav" aria-label="デスクトップナビゲーション">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} aria-current={label === current ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <MenuButton isOpen={isOpen} onClick={() => setIsOpen((value) => !value)} />
      <div className="menu-overlay" data-open={isOpen} aria-hidden={!isOpen}>
        <nav aria-label="メインナビゲーション">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={label === current ? "page" : undefined}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function InteriorHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
}) {
  return (
    <section className="interior-hero">
      <div className="interior-hero-copy">
        <p className="interior-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="interior-lead">{lead}</p>
      </div>
    </section>
  );
}

export function InteriorFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.18 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className={`interior-footer${isVisible ? " is-visible" : ""}`} ref={footerRef}>
      <div className="interior-footer-content">
        <Link className="interior-footer-brand" href="/">ANIMOS PROJECT</Link>
        <nav aria-label="フッターナビゲーション">
          {navItems.slice(1).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="footer-socials" aria-label="SNS・お問い合わせ">
          {siteLinks.instagram ? (
            <a href={siteLinks.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
          ) : (
            <span>Instagram</span>
          )}
          {siteLinks.email ? (
            <a href={`mailto:${siteLinks.email}`}>Email ↗</a>
          ) : (
            <span>Email</span>
          )}
        </div>
        <small>© 2026 ANIMOS PROJECT</small>
      </div>
    </footer>
  );
}
