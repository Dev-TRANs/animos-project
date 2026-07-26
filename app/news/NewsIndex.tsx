"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { withBasePath } from "../base-path";
import { InteriorFooter, InteriorHeader, InteriorHero } from "../components/InteriorPage";

type NoteItem = {
  date: string;
  title: string;
  url: string;
  thumbnail?: string;
};

export default function NewsIndex() {
  const [items, setItems] = useState<NoteItem[]>([]);
  const [accountUrl, setAccountUrl] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "empty">("loading");

  useEffect(() => {
    let active = true;

    fetch(withBasePath("/api/note"))
      .then((response) => {
        if (!response.ok) throw new Error("note feed unavailable");
        return response.json();
      })
      .then((data: { items?: NoteItem[]; accountUrl?: string }) => {
        if (!active) return;
        setItems(data.items ?? []);
        setAccountUrl(data.accountUrl ?? "");
        setStatus(data.items?.length ? "ready" : "empty");
      })
      .catch(() => {
        if (active) setStatus("empty");
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!items.length) return;
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".news-index-card"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [items]);

  return (
    <main className="interior-page news-page">
      <InteriorHeader current="News" />
      <InteriorHero
        eyebrow="NEWS"
        title="活動のいまを、ひらいていく。"
        lead="プロジェクトからのお知らせ、地域での活動、そこで生まれた気づきをnoteからお届けします。"
      />
      <section className="news-index" aria-label="note記事一覧" aria-live="polite">
        {status === "loading" && (
          <div className="news-feed-state">
            <span className="news-loading-dot" aria-hidden="true" />
            <p>noteの記事を読み込んでいます。</p>
          </div>
        )}
        {status === "empty" && (
          <div className="news-feed-state">
            <p className="kicker">NOTE FEED</p>
            <h2>現在、表示できる記事はありません。</h2>
            <p>最新の活動情報はnoteでご確認ください。</p>
            {accountUrl && <a href={accountUrl} target="_blank" rel="noreferrer">noteを開く <span>→</span></a>}
          </div>
        )}
        {items.map((item, index) => (
          <a
            className={`news-index-card${item.thumbnail ? " has-note-thumbnail" : ""}`}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            key={item.url}
            style={{ "--news-delay": `${Math.min(index, 5) * 70}ms` } as CSSProperties}
          >
            {item.thumbnail && <img src={item.thumbnail} alt="" />}
            <div className="news-index-meta">
              <time>{item.date}</time>
              <span>NOTE</span>
            </div>
            <div>
              <h2>{item.title}</h2>
              <p>noteで記事を読む</p>
            </div>
            <b aria-hidden="true">{String(index + 1).padStart(2, "0")}</b>
          </a>
        ))}
      </section>
      {status === "ready" && accountUrl && (
        <div className="note-panel">
          <p className="kicker">FOLLOW OUR NOTE</p>
          <h2>すべての活動記録は、noteでご覧いただけます。</h2>
          <a className="note-link-button" href={accountUrl} target="_blank" rel="noreferrer">
            <span>ANIMOS PROJECTのnoteへ</span>
            <b aria-hidden="true">→</b>
          </a>
        </div>
      )}
      <InteriorFooter />
    </main>
  );
}
