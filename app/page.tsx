"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { withBasePath } from "./base-path";
import { AnimatedMenuButton } from "./components/AnimatedMenuButton";
import { InteriorFooter } from "./components/InteriorPage";
import { navItems } from "./site-config";

const actions = [
  {
    number: "1",
    title: "デジタルハザードマップ開発",
    description:
      "地域の危険箇所、避難所、避難ルートなどをマップ上に整理し、誰でも確認しやすい形で共有できる仕組みを開発します。",
    image: withBasePath("/assets/action-hazard-map.png"),
  },
  {
    number: "2",
    title: "地域情報の共有",
    description:
      "住民が地域の防災情報を共有・更新できる仕組みを検討します。災害時に必要な情報を、地域全体で把握できる状態を目指します。",
    image: withBasePath("/assets/action-community-share.png"),
  },
  {
    number: "3",
    title: "要支援者へのデジタル支援",
    description:
      "高齢者や障害のある方など、災害時に支援を必要とする人に向けた情報提供や支援方法を考えます。",
    image: withBasePath("/assets/action-digital-support.png"),
  },
  {
    number: "4",
    title: "支援する人と必要とする人をつなぐ",
    description:
      "支援する側と、支援を必要とする側の認識のずれを減らし、必要な支援を共有できる仕組みを目指します。",
    image: withBasePath("/assets/action-connect-support.png"),
  },
  {
    number: "5",
    title: "防災学習アプリの開発",
    description:
      "避難行動や地図理解、危険区域の把握などを、子どもや若い世代にもわかりやすく伝えるアプリを開発します。",
    image: withBasePath("/assets/action-learning-app.png"),
  },
];

const aboutBlocks = [
  {
    title: <>地域の防災を、<br /><mark>デジタル</mark>でもっと<span className="no-break">身近に。</span></>,
    text: "いつ起こるかわからない自然災害に対して、避難ルートや危険箇所の情報を、普段からわかりやすく共有・認知できる仕組みが必要です。アニモスプロジェクトは、この課題意識からスタートした、デジタル活用を中心とする新しい取り組みです。",
    image: withBasePath("/assets/about-community.svg"),
    alt: "地域と防災を表すイメージ",
  },
  {
    title: <>地域の情報を、<br /><mark>わかりやすく</mark>共有。</>,
    text: "地域の危険箇所や避難所、避難ルートなどを可視化・共有し、災害発生時に迅速な行動が取れるデジタルハザードマップの開発を検討しています。住民自身が参加し、情報を更新・共有できる仕組みを目指します。",
    image: withBasePath("/assets/about-map.svg"),
    alt: "地図で情報を探す人のイメージ",
  },
  {
    title: <><mark>要支援者</mark>と、<br />地域をつなぐ。</>,
    text: "災害時には、高齢者や障害のある方など、支援を必要とする人への対応も重要です。支援を必要とする人の状況や思いを共有し、地域の中で適切な支援につなげる方法を考えています。",
    image: withBasePath("/assets/about-connect.svg"),
    alt: "人と人のつながりを表すイメージ",
  },
  {
    title: <>防災を学べる<br /><mark>アプリを開発</mark>。</>,
    text: "避難行動や地図理解、危険区域の把握などを、遊びや体験を通して自然に学べるアプリを検討しています。子どもや若い世代にも、防災を身近に伝えることを目指します。",
    image: withBasePath("/assets/about-app.svg"),
    alt: "アプリケーション開発のイメージ",
  },
];

type NewsItem = {
  date: string;
  title: string;
  url?: string;
  thumbnail?: string;
};

function CTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="poster-cta" href={withBasePath(href)}>
      <span>{children}</span>
      <b aria-hidden="true">→</b>
    </a>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const handleHomeLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Header is rendered only on the home page. Keep a real link for semantics and
    // no-JavaScript fallback, but avoid reloading the page when returning to its top.
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", isOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [isOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const closeDesktopMenu = () => {
      if (media.matches) setIsOpen(false);
    };
    closeDesktopMenu();
    media.addEventListener("change", closeDesktopMenu);
    return () => media.removeEventListener("change", closeDesktopMenu);
  }, []);

  useEffect(() => {
    let lastSticky: boolean | null = null;
    const onScroll = () => {
      const nextSticky = window.scrollY > window.innerHeight * 0.72;
      if (nextSticky === lastSticky) return;
      lastSticky = nextSticky;
      setIsSticky(nextSticky);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`poster-header${isSticky ? " is-sticky" : ""}`}>
      <div className="header-brand-row">
        <Link className="wordmark" href="/" onClick={handleHomeLogoClick}>
          Animos Project
        </Link>
        <nav className="desktop-nav" aria-label="デスクトップナビゲーション">
          {navItems.map(([label, href]) => (
            <a key={href} href={withBasePath(href)}>{label}</a>
          ))}
        </nav>
      </div>
      <AnimatedMenuButton isOpen={isOpen} onToggle={() => setIsOpen((value) => !value)} />
      <div className="menu-overlay" data-open={isOpen} aria-hidden={!isOpen}>
        <nav aria-label="メインナビゲーション">
          {navItems.map(([label, href]) => (
            <a key={href} href={withBasePath(href)} tabIndex={isOpen ? 0 : -1} onClick={() => setIsOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLSpanElement | null>;
}) {
  const heroRef = useRef<HTMLElement>(null);
  const circleRefs = useRef<Array<HTMLElement | null>>([]);
  const morphRef = useRef<HTMLSpanElement>(null);
  const morphGradientRef = useRef<HTMLSpanElement>(null);
  const morphLayoutRef = useRef<{
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    size: number;
  } | null>(null);
  const morphIndex = 16;
  const scrollIndex = 53;

  const circles = useMemo(() => {
    return Array.from({ length: 84 }, (_, index) => ({
      id: index,
      order: ((index * 9301 + 49297) % 233280) / 233280,
      accent: [18, 55, 73].includes(index),
    }));
  }, []);

  useEffect(() => {
    let ticking = false;
    let frame = 0;
    let needsMeasure = false;
    let heroHeight = 1;
    let measuredViewportWidth = 0;
    let morphHasArrived: boolean | null = null;
    let renderUntil = 0;
    // These arrays remember the last DOM state. Avoid rewriting styles for all
    // 84 circles on every scroll frame, which is especially expensive on iOS.
    const circlePhases = new Int8Array(circles.length);
    const circleCompositing = new Int8Array(circles.length);
    const circleOpacities = new Float32Array(circles.length);
    circlePhases.fill(-1);
    circleCompositing.fill(-1);
    circleOpacities.fill(-1);

    const measure = () => {
      const hero = heroRef.current;
      const morph = morphRef.current;
      const target = targetRef.current;
      const source = circleRefs.current[morphIndex];
      if (!hero || !morph || !target || !source) return;

      heroHeight = hero.offsetHeight;
      measuredViewportWidth = window.innerWidth;
      const sourceRect = source.getBoundingClientRect();
      const size = sourceRect.width;
      target.style.width = `${size}px`;
      target.style.height = `${size}px`;
      morph.style.width = `${size}px`;
      morph.style.height = `${size}px`;

      const targetRect = target.getBoundingClientRect();
      const sourceDocumentY = sourceRect.top + window.scrollY;

      morphLayoutRef.current = {
        sourceX: sourceRect.left + window.scrollX,
        sourceY: sourceDocumentY,
        targetX: targetRect.left + window.scrollX + targetRect.width / 2 - size / 2,
        targetY: targetRect.top + window.scrollY + targetRect.height / 2 - size / 2,
        size,
      };
      target.style.transform = "scale(1)";
      circlePhases.fill(-1);
      circleCompositing.fill(-1);
      circleOpacities.fill(-1);
      morphHasArrived = null;
    };

    const render = (now = performance.now()) => {
      if (needsMeasure) {
        needsMeasure = false;
        measure();
      }
      const hero = heroRef.current;
      if (!hero) return;
      const scrollY = window.scrollY;
      const progress = Math.min(1, Math.max(0, scrollY / heroHeight));

      circleRefs.current.forEach((circle, index) => {
        if (!circle) return;
        if (index === morphIndex) {
          if (circlePhases[index] !== 2) {
            circle.style.opacity = "0";
            circlePhases[index] = 2;
            circleOpacities[index] = 0;
          }
          return;
        }
        if (index === scrollIndex) {
          if (circlePhases[index] !== 0) {
            circle.style.opacity = "1";
            circle.style.transform = "scale(1)";
            circlePhases[index] = 0;
            circleOpacities[index] = 1;
          }
          return;
        }
        const start = 0.06 + circles[index].order * 0.48;
        const local = Math.min(1, Math.max(0, (progress - start) / 0.18));
        const shouldComposite = progress > start - 0.025 && local < 1;
        if (circleCompositing[index] !== Number(shouldComposite)) {
          circle.classList.toggle("is-animating", shouldComposite);
          circleCompositing[index] = Number(shouldComposite);
        }
        const phase = local <= 0 ? 0 : local >= 1 ? 2 : 1;
        if (phase !== 1 && circlePhases[index] === phase) return;
        const eased = 1 - Math.pow(1 - local, 4);
        const opacity = local <= 0.94 ? 1 : Math.max(0, (1 - local) / 0.06);
        circle.style.transform = `scale(${1 - eased})`;
        if (Math.abs(circleOpacities[index] - opacity) > 0.001) {
          circle.style.opacity = String(opacity);
          circleOpacities[index] = opacity;
        }
        circlePhases[index] = phase;
      });

      const morph = morphRef.current;
      const gradient = morphGradientRef.current;
      const target = targetRef.current;
      const layout = morphLayoutRef.current;
      if (morph && gradient && target && layout) {
        const move = Math.min(1, Math.max(0, (progress - 0.08) / 0.74));
        const eased = 1 - Math.pow(1 - move, 3);
        const hasArrived = move >= 0.995;
        if (!hasArrived) {
          const x = layout.sourceX + (layout.targetX - layout.sourceX) * eased;
          const y = layout.sourceY + (layout.targetY - layout.sourceY) * eased;
          morph.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          gradient.style.opacity = String(eased);
        }
        if (hasArrived !== morphHasArrived) {
          morph.style.opacity = hasArrived ? "0" : "1";
          target.style.opacity = hasArrived ? "1" : "0";
          morphHasArrived = hasArrived;
        }
      }

      // iOS may deliver scroll events less often than the display refresh rate.
      // Continue briefly so the latest scroll position is rendered every frame.
      if (now < renderUntil) {
        ticking = true;
        frame = requestAnimationFrame(render);
      } else {
        ticking = false;
      }
    };

    const requestRender = (remeasure = false, sustain = false) => {
      needsMeasure ||= remeasure;
      if (sustain) renderUntil = Math.max(renderUntil, performance.now() + 120);
      if (!ticking) {
        ticking = true;
        frame = requestAnimationFrame(render);
      }
    };

    measure();
    render();
    const onScroll = () => requestRender(false, true);
    const onResize = () => {
      const widthChanged = Math.abs(window.innerWidth - measuredViewportWidth) > 1;
      requestRender(widthChanged);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [circles, targetRef]);

  return (
    <>
      <section className="poster-hero" id="home" ref={heroRef}>
        <Header />
        <div className="circle-grid">
          {circles.map((circle, index) => {
            if (index === scrollIndex) {
              return (
                <a
                  key={circle.id}
                  ref={(node) => { circleRefs.current[index] = node; }}
                  className="hero-dot scroll-button"
                  href="#about"
                  aria-label="プロジェクト紹介へ移動"
                >
                  <span className="down-arrow" />
                </a>
              );
            }

            return (
              <span
                key={circle.id}
                ref={(node) => { circleRefs.current[index] = node; }}
                className={`${circle.accent ? "hero-dot accent" : "hero-dot"}${index === morphIndex ? " morph-source" : ""}`}
                aria-hidden="true"
              >
                {index >= 21 && index <= 33 ? "ANIMOSPROJECT"[index - 21] : ""}
              </span>
            );
          })}
        </div>
        <div className="hero-copy">
          <div className="hero-title-shape">
            <div className="hero-title-surface">
              <h1>
                <span className="hero-title-line">誰も</span>
                <span className="hero-title-line">取り残さない</span>
                <span className="hero-title-line hero-region-line">地域防災を。</span>
              </h1>
            </div>
          </div>
          <div className="hero-en-shape">
            <p>ANIMOS PROJECT</p>
          </div>
        </div>
      </section>
      <span className="transition-circle" ref={morphRef} aria-hidden="true">
        <span className="transition-circle-gradient" ref={morphGradientRef} />
      </span>
    </>
  );
}

function ActionsCarousel() {
  const [active, setActive] = useState(0);
  const [visibleBadges, setVisibleBadges] = useState<number[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const programmaticScrollRef = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.58) return;
          const index = Number((entry.target as HTMLElement).dataset.actionIndex);
          setVisibleBadges((current) => (
            current.includes(index) ? current : [...current, index]
          ));
          observer.unobserve(entry.target);
        });
      },
      { root: carousel, threshold: [0.58] },
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  const updateActive = () => {
    if (programmaticScrollRef.current) return;
    const carousel = carouselRef.current;
    if (!carousel) return;
    const center = carousel.getBoundingClientRect().left + carousel.clientWidth / 2;
    let closest = 0;
    let distance = Number.POSITIVE_INFINITY;
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const nextDistance = Math.abs(rect.left + rect.width / 2 - center);
      if (nextDistance < distance) {
        distance = nextDistance;
        closest = index;
      }
    });
    setActive(closest);
  };

  const selectCard = (index: number) => {
    const carousel = carouselRef.current;
    const card = cardRefs.current[index];
    if (!carousel || !card) return;

    programmaticScrollRef.current = true;
    setActive(index);
    carousel.scrollTo({
      left: card.offsetLeft - (carousel.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    });

    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      programmaticScrollRef.current = false;
      updateActive();
    }, 560);
  };

  return (
    <>
      <div
        className="actions-carousel"
        ref={carouselRef}
        onScroll={updateActive}
        tabIndex={0}
        aria-label="アクション一覧。横にスクロールできます"
      >
        {actions.map((action, index) => (
          <article
            className={`action-card${active === index ? " is-active" : ""}${visibleBadges.includes(index) ? " badge-visible" : ""}`}
            key={action.number}
            data-action-index={index}
            ref={(node) => { cardRefs.current[index] = node; }}
          >
            <img src={action.image} alt="" loading="lazy" decoding="async" />
            <h3>{action.title}</h3>
            <p>{action.description}</p>
            <span className="action-number">#{action.number}</span>
            <a
              className="action-arrow"
              href={withBasePath(`/actions#action-${action.number.padStart(2, "0")}`)}
              aria-label={`${action.title}の詳細を見る`}
            />
          </article>
        ))}
        <div className="carousel-tail" aria-hidden="true">
          <span>MORE ACTIONS</span>
          <small>COMING SOON</small>
        </div>
      </div>
      <div className="carousel-controls">
        <button
          className="carousel-step"
          disabled={active === 0}
          aria-label="前のアクションを表示"
          onClick={() => selectCard(Math.max(0, active - 1))}
        >
          ←
        </button>
        <div className="carousel-dots" aria-label="カルーセル位置">
          {actions.map((action, index) => (
            <button
              key={action.number}
              className={active === index ? "is-active" : ""}
              aria-label={`${index + 1}枚目を表示`}
              aria-current={active === index ? "true" : undefined}
              onClick={() => selectCard(index)}
            />
          ))}
        </div>
        <button
          className="carousel-step"
          disabled={active === actions.length - 1}
          aria-label="次のアクションを表示"
          onClick={() => selectCard(Math.min(actions.length - 1, active + 1))}
        >
          →
        </button>
      </div>
    </>
  );
}

export default function Home() {
  const aboutCircleRef = useRef<HTMLSpanElement>(null);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [noteUrl, setNoteUrl] = useState("#");

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let active = true;

    fetch(withBasePath("/api/note"))
      .then((response) => {
        if (!response.ok) throw new Error("note feed unavailable");
        return response.json();
      })
      .then((data: { items?: NewsItem[]; accountUrl?: string }) => {
        if (!active) return;
        if (data.items?.length) setNewsItems(data.items.slice(0, 3));
        if (data.accountUrl) setNoteUrl(data.accountUrl);
      })
      .catch(() => {
        // Keep the designed fallback content when the account is not configured
        // or note is temporarily unavailable.
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main>
      <Hero targetRef={aboutCircleRef} />

      <section className="poster-about" id="about">
        <div className="about-list">
          {aboutBlocks.map((block, index) => (
            <article className={`about-block${index === 0 ? " about-block-intro" : " reveal"}`} key={index} style={{ "--reveal-delay": `${index % 2 ? 90 : 0}ms` } as React.CSSProperties}>
              {index === 0 ? (
                <div className="about-intro-art">
                  <img src={block.image} alt={block.alt} />
                  <Link className="about-circle-link" href="/about" aria-label="アニモスプロジェクトについて詳しく見る">
                    <span className="about-circle-target" ref={aboutCircleRef}>アニモス<br />プロジェクト<br />ってなに？</span>
                  </Link>
                </div>
              ) : (
                <img src={block.image} alt={block.alt} />
              )}
              <div className="about-copy">
                <h2>
                  {index === 0 ? <Link href="/about">{block.title}</Link> : block.title}
                </h2>
                <p>{block.text}</p>
              </div>
            </article>
          ))}
        </div>
        <CTA href="/about">ANIMOS PROJECT の紹介をもっと詳しくみる</CTA>
      </section>

      <section className="actions-section" id="actions">
        <h2 className="section-title"><Link href="/actions">Action</Link></h2>
        <ActionsCarousel />
      </section>

      <section className="poster-news section-shell" id="news">
        <h2><Link href="/news">News</Link></h2>
        <div className="news-list">
          {newsItems.length === 0 && (
            <div className="news-card news-card-empty">
              <time>NOTE</time>
              <h3>最新の活動情報はnoteからお届けします</h3>
              <span aria-hidden="true">→</span>
            </div>
          )}
          {newsItems.map((item) => {
            const content = (
              <>
                {item.thumbnail && <img src={item.thumbnail} alt="" loading="lazy" decoding="async" />}
                <time>{item.date}</time>
                <h3>{item.title}</h3>
                <span aria-hidden="true">→</span>
              </>
            );

            return item.url ? (
              <a
                className={`news-card${item.thumbnail ? " has-thumbnail" : ""}`}
                key={`${item.date}-${item.title}`}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${item.title}をnoteで読む`}
              >
                {content}
              </a>
            ) : (
              <div className="news-card" key={`${item.date}-${item.title}`}>
                {content}
              </div>
            );
          })}
        </div>
        <CTA href={noteUrl}>ANIMOS PROJECT のnoteをみる</CTA>
      </section>

      <section className="poster-contact section-shell" id="contact">
        <h2><Link href="/contact">Contact</Link></h2>
        <p>アニモスの活動にご興味がある方は、<br />気軽にご連絡ください！</p>
        <CTA href="/contact">ANIMOS PROJECT に連絡する</CTA>
      </section>

      <InteriorFooter homeHref="#home" />
    </main>
  );
}
