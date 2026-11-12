"use client";

import BRAND from "../../brand";
import { LogoFull, LogoMark, MARKS } from "../../components/Logo";
import "./logo.css";

const FILES = [
  ["nexusdemy-mark.svg", "Mark · colour"],
  ["nexusdemy-mark-ink.svg", "Mark · ink"],
  ["nexusdemy-mark-white.svg", "Mark · white"],
  ["nexusdemy-app-icon.svg", "App icon"],
];

const PALETTE = [
  ["Gold", "#FFB703", "var(--lime)"],
  ["Orange", "#FB8500", "var(--orange)"],
  ["Teal", "#219EBC", "var(--navy)"],
  ["Ink", "#023047", "var(--ink)"],
];

// Nexusdemy brand board: the final logo first, then the earlier rounds of proposals.
// The site uses BRAND.logoMark (src/brand.js).
export default function LogoBoard() {
  const earlier = Object.entries(MARKS).filter(([k]) => k !== "ribbon");
  return (
    <main className="lp">
      <header className="lp-head">
        <p className="lp-eyebrow">Brand · logo</p>
        <h1 className="lp-title">The brush infinity</h1>
        <p className="lp-lede">{MARKS.ribbon.idea}</p>
      </header>

      <section className="lp-board">
        <div className="lp-hero"><LogoFull size={120} variant="ribbon" /></div>
        <div className="lp-hero night"><LogoFull size={84} variant="ribbon" mono tagline /></div>
        <div className="lp-grid">
          <div className="lp-cell">
            <span className="lp-cap">App icon</span>
            <div className="lp-icons">
              <span className="lp-app big"><LogoMark size={62} variant="ribbon" /></span>
              <span className="lp-app"><LogoMark size={30} variant="ribbon" /></span>
              <LogoMark size={24} variant="ribbon" />
              <LogoMark size={12} variant="ribbon" />
            </div>
          </div>
          <div className="lp-cell">
            <span className="lp-cap">One colour</span>
            <div className="lp-icons">
              <LogoMark size={64} variant="ribbon" fill="var(--ink)" />
              <span className="lp-chip ink"><LogoMark size={44} variant="ribbon" fill="#fff" /></span>
              <span className="lp-chip gold"><LogoMark size={44} variant="ribbon" fill="var(--ink)" /></span>
            </div>
          </div>
          <div className="lp-cell">
            <span className="lp-cap">Palette</span>
            <div className="lp-swatches">
              {PALETTE.map(([n, hex, v]) => (
                <span key={n}><i style={{ background: v }} /><b>{n}</b>{hex}</span>
              ))}
            </div>
          </div>
          <div className="lp-cell">
            <span className="lp-cap">Files (SVG)</span>
            <div className="lp-files">
              {FILES.map(([f, l]) => <a key={f} href={`/brand/${f}`} download>{l}<span>↓</span></a>)}
            </div>
          </div>
        </div>
      </section>

      <h3 className="lp-round">Earlier proposals</h3>
      {earlier.map(([key, { label, idea, round }], i) => (
        <section className="lp-row" key={key}>
          {(i === 0 || earlier[i - 1][1].round !== round) && (
            <h4 className="lp-sub">{round === 2 ? "Round 2 — flowing, infinity, connection" : "Round 1 — first proposals"}</h4>
          )}
          <div className="lp-meta">
            <h2>{label}{key === BRAND.logoMark && <span className="lp-live">On the site</span>}</h2>
            <p>{idea}</p>
            <div className="lp-sizes" aria-label="Small sizes">
              <span className="lp-app"><LogoMark size={44} variant={key} ink="#fff" /></span>
              <LogoMark size={32} variant={key} ink="var(--ink)" />
              <LogoMark size={16} variant={key} ink="var(--ink)" />
            </div>
          </div>
          <div className="lp-tile light"><LogoFull size={56} variant={key} /></div>
          <div className="lp-tile night"><LogoFull size={56} variant={key} mono tagline /></div>
        </section>
      ))}
    </main>
  );
}
