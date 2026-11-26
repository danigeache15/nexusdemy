"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { StepCtx } from "./parts";
import { SLIDES } from "./slides";

// Nexusdemy investor pitch at /pitch: a 1600×900 stage scaled to the screen, one slide at a time.
// Works with a presentation clicker: → ↓ PageDown Space Enter = next, ← ↑ PageUp Backspace = back,
// F = fullscreen, N = speaker notes, Home/End = first/last. The URL keeps the place (#/slide/step).

const NEXT = new Set(["ArrowRight", "ArrowDown", "PageDown", " ", "Enter"]);
const PREV = new Set(["ArrowLeft", "ArrowUp", "PageUp", "Backspace"]);

function readHash() {
  if (typeof window === "undefined") return [0, 0];
  const [, s = "1", st = "0"] = window.location.hash.split("/");
  const slide = Math.min(Math.max(parseInt(s, 10) - 1 || 0, 0), SLIDES.length - 1);
  return [slide, Math.min(Math.max(parseInt(st, 10) || 0, 0), SLIDES[slide].steps)];
}

export default function Pitch() {
  const [[slide, step], setPos] = useState([0, 0]);
  const [ready, setReady] = useState(false);
  const [notes, setNotes] = useState(false);
  const [scale, setScale] = useState(1);
  const [hint, setHint] = useState(true);
  const touch = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Restore the place from the URL first; only then start writing it back.
  useEffect(() => { setPos(readHash()); setLoaded(true); }, []);
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / 1600, window.innerHeight / 900));
    fit();
    window.addEventListener("resize", fit);
    const t = setTimeout(() => setHint(false), 4500);
    return () => { window.removeEventListener("resize", fit); clearTimeout(t); };
  }, []);

  // Each new slide mounts hidden, then reveals on the next frame so its entrances play.
  useEffect(() => {
    setReady(false);
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => cancelAnimationFrame(raf);
  }, [slide]);

  useEffect(() => { if (loaded) history.replaceState(null, "", `#/${slide + 1}/${step}`); }, [loaded, slide, step]);

  const go = useCallback((dir) => {
    setPos(([s, st]) => {
      if (dir > 0) {
        if (st < SLIDES[s].steps) return [s, st + 1];
        return s < SLIDES.length - 1 ? [s + 1, 0] : [s, st];
      }
      if (st > 0) return [s, st - 1];
      return s > 0 ? [s - 1, SLIDES[s - 1].steps] : [s, st];
    });
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.altKey || e.metaKey || e.repeat) return;
      if (NEXT.has(e.key)) go(1);
      else if (PREV.has(e.key)) go(-1);
      else if (e.key === "Home") setPos([0, 0]);
      else if (e.key === "End") setPos([SLIDES.length - 1, SLIDES[SLIDES.length - 1].steps]);
      else if (e.key === "f" || e.key === "F" || e.key === "F5") {
        if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen?.();
      } else if (e.key === "n" || e.key === "N") setNotes((v) => !v);
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const { Slide, theme = "cream", notes: text } = SLIDES[slide];

  return (
    <main
      className={`pt pt-${theme}`}
      onClick={(e) => { if (e.target.closest("video, button, a")) return; go(e.clientX > window.innerWidth / 3 ? 1 : -1); }}
      onContextMenu={(e) => { e.preventDefault(); go(-1); }}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - (touch.current ?? 0);
        if (Math.abs(dx) > 50) { e.preventDefault(); go(dx < 0 ? 1 : -1); }
      }}
    >
      <div className="pt-stage" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        <StepCtx.Provider value={{ step, ready }}>
          <div className="pt-slide" key={slide}><Slide /></div>
        </StepCtx.Provider>
      </div>
      <div className="pt-progress" style={{ width: `${((slide + (step + 1) / (SLIDES[slide].steps + 1)) / SLIDES.length) * 100}%` }} />
      <div className={`pt-hint${hint ? " on" : ""}`}>→ next · ← back · F fullscreen · N notes</div>
      {notes && (
        <aside className="pt-notes" onClick={(e) => e.stopPropagation()}>
          <b>{slide + 1} / {SLIDES.length}{SLIDES[slide].steps ? ` · step ${step} of ${SLIDES[slide].steps}` : ""}</b>
          <p>{text}</p>
        </aside>
      )}
    </main>
  );
}
