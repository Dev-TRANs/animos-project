"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

export function EditableThemeWord() {
  const [word, setWord] = useState("〇〇");
  const [draft, setDraft] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const syncWord = (event: Event) => {
      setWord((event as CustomEvent<string>).detail);
    };
    window.addEventListener("animos-theme-word", syncWord);
    return () => window.removeEventListener("animos-theme-word", syncWord);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const openEditor = () => {
    setDraft(word === "〇〇" ? "" : word);
    setIsOpen(true);
  };

  const applyWord = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedWord = draft.trim().slice(0, 16);
    if (!normalizedWord) return;
    setWord(normalizedWord);
    window.dispatchEvent(new CustomEvent("animos-theme-word", { detail: normalizedWord }));
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="editable-theme-word"
        type="button"
        onClick={openEditor}
        aria-label={`現在の言葉は「${word}」。タップして変更`}
        title="タップして言葉を変える"
      >
        <span className={word === "〇〇" ? "editable-theme-text is-pulsing" : "editable-theme-text"}>
          {word}
        </span>
      </button>
      {isOpen && createPortal(
        <div
          className="theme-editor-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <form className="theme-editor-dialog" role="dialog" aria-modal="true" aria-labelledby="theme-editor-title" onSubmit={applyWord}>
            <button className="theme-editor-close" type="button" onClick={() => setIsOpen(false)} aria-label="閉じる">×</button>
            <span className="theme-editor-orb" aria-hidden="true" />
            <p className="theme-editor-kicker">ANIMOS MIX</p>
            <h2 id="theme-editor-title">君は、何を<br />組み合わせる？</h2>
            <p className="theme-editor-formula">防災 <b>×</b> 情報 <b>×</b></p>
            <label className="theme-editor-field">
              <span>YOUR IDEA</span>
              <input
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={16}
                placeholder="例：地域、福祉、教育"
                required
              />
            </label>
            <div className="theme-editor-actions">
              <button type="button" onClick={() => setIsOpen(false)}>キャンセル</button>
              <button type="submit">組み合わせる <span>→</span></button>
            </div>
          </form>
        </div>,
        document.body,
      )}
    </>
  );
}
