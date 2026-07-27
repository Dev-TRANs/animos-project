"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteLinks } from "../site-config";
import { AnimatedMenuButton } from "./AnimatedMenuButton";

const navItems = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Actions", "/actions"],
  ["News", "/news"],
  ["Contact", "/contact"],
];

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
      <AnimatedMenuButton isOpen={isOpen} onToggle={() => setIsOpen((value) => !value)} />
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
  lead: React.ReactNode;
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

export function InteriorFooter({ homeHref }: { homeHref?: string } = {}) {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    if (homeHref) {
      let ticking = false;
      const render = () => {
        ticking = false;
        const rect = footer.getBoundingClientRect();
        const progress = Math.min(
          1,
          Math.max(0, (window.innerHeight - rect.top) / (rect.height * .9)),
        );
        footer.style.setProperty("--footer-scale", String(.58 + progress * .42));
        footer.style.setProperty("--footer-offset", `${(1 - progress) * 92}px`);
        footer.style.setProperty("--footer-opacity", String(.28 + progress * .72));
        footer.style.setProperty("--footer-copy-opacity", String(Math.max(0, (progress - .28) / .72)));
        footer.style.setProperty("--footer-copy-offset", `${(1 - progress) * 28}px`);
      };
      const requestRender = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(render);
      };
      render();
      window.addEventListener("scroll", requestRender, { passive: true });
      window.addEventListener("resize", requestRender);
      return () => {
        window.removeEventListener("scroll", requestRender);
        window.removeEventListener("resize", requestRender);
      };
    }

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
  }, [homeHref]);

  return (
    <footer className={`interior-footer${isVisible ? " is-visible" : ""}${homeHref ? " is-scroll-animated" : ""}`} ref={footerRef}>
      <div className="interior-footer-content">
        {homeHref ? (
          <a className="interior-footer-brand" href={homeHref}>ANIMOS PROJECT</a>
        ) : (
          <Link className="interior-footer-brand" href="/">ANIMOS PROJECT</Link>
        )}
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
