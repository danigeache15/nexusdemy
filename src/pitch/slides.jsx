"use client";

import { useEffect, useRef, useState } from "react";
import { R, Count, PaintedMark, useOn } from "./parts";

// The 14 slides, in the pitch-rubric order. Rule from the talks: never more than 6 words on screen;
// everything else is in the speaker notes (press N while presenting).

const Wordmark = ({ size = 120, color = "#fff" }) => (
  <span className="pt-word" style={{ fontSize: size, color }}>
    <b>ne<i>x</i>us</b><span>demy</span>
  </span>
);

// 1 · Logo
function Logo() {
  return (
    <div className="pt-center">
      <PaintedMark width={430} />
      <R d={2.4} fx="up" className="pt-mt"><Wordmark size={132} /></R>
    </div>
  );
}

// 2 · The intro video (with its music)
function Video() {
  const ref = useRef(null);
  const on = useOn(0);
  const [blocked, setBlocked] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v || !on) return;
    v.currentTime = 0;
    v.play().catch(() => setBlocked(true));
    return () => v.pause();
  }, [on]);
  return (
    <div className="pt-video">
      <video ref={ref} src="/pitch/nexusdemy-intro.mp4" playsInline preload="auto"
        onClick={(e) => { const v = e.currentTarget; if (v.paused) { v.play(); setBlocked(false); } else v.pause(); }} />
      {blocked && (
        <button className="pt-play" onClick={() => { ref.current.play(); setBlocked(false); }} aria-label="Play video">▶</button>
      )}
    </div>
  );
}

// 3 · The statistic: corporate demand for English vs supply, Latin America
function Chart() {
  const demand = useOn(0), supply = useOn(1);
  return (
    <div className="pt-split">
      <R fx="left" className="pt-h1 navy" as="h2">Latin America</R>
      <div className="pt-bars">
        {[
          { label: "Demand", pct: 80, color: "var(--p-orange)", on: demand, at: 0, d: 0.5 },
          { label: "Supply", pct: 20, color: "var(--p-sky)", on: supply, at: 1, d: 0.2 },
        ].map((b) => (
          <div className="pt-bar-row" key={b.label}>
            <R at={b.at} d={b.d} className="pt-bar-label">{b.label}</R>
            <div className="pt-bar-track">
              <div className="pt-bar" style={{ width: b.on ? `${b.pct}%` : 0, background: b.color, transitionDelay: `${b.d}s` }}>
                <span><Count at={b.at} to={b.pct} suffix="%" d={b.d} /></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4 · The people behind that statistic
const DOTS = Array.from({ length: 220 }, (_, i) => i);
function People() {
  return (
    <div className="pt-center">
      <div className="pt-dots" aria-hidden="true">
        {DOTS.map((i) => <R key={i} fx="pop" d={0.2 + (i % 22) * 0.03 + Math.floor(i / 22) * 0.05} className="pt-dot" />)}
      </div>
      <R d={0.3} className="pt-mega orange"><Count to={147.9} decimals={1} suffix=" M" dur={2.2} d={0.3} /></R>
      <R d={1.6} className="pt-sub navy">people</R>
    </div>
  );
}

// 5 · The pain: they understand, but freeze when they speak
// Heights the voice bars reach while "talking" (fixed, so it looks the same every time).
const WAVE = [60, 110, 150, 90, 170, 120, 70, 140, 180, 100, 60, 130, 160, 90, 120, 70, 150, 100, 60, 110];

function Pain() {
  const frozen = useOn(1);
  return (
    <div className="pt-center">
      <div className="pt-swap">
        <R until={1} className="pt-h1 white" as="h2">They understand English.</R>
        <R at={1} className="pt-h1 gold" as="h2">They freeze when they speak.</R>
      </div>
      <div className={`pt-bubble${frozen ? " frozen" : ""}`} aria-hidden="true">
        {WAVE.map((h, i) => <i key={i} style={{ "--i": i, "--h": `${h}px` }} />)}
        <span className="pt-frost" />
        <svg className="pt-flake" viewBox="-60 -60 120 120">
          {[0, 60, 120].map((a) => (
            <g key={a} transform={`rotate(${a})`}>
              <path d="M0,-52 V52 M-14,-40 L0,-28 L14,-40 M-14,40 L0,28 L14,40" />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

// 6 · Competition: the missing middle
function Competition() {
  return (
    <div className="pt-pad">
      <svg className="pt-axes" viewBox="0 0 1360 760" aria-hidden="true">
        <path className="grid" d="M80,190 H1320 M80,380 H1320 M80,570 H1320 M390,40 V720 M700,40 V720 M1010,40 V720" />
        <path d="M80,720 H1330 M1306,704 L1332,720 L1306,736 M80,720 V30 M64,54 L80,28 L96,54" />
      </svg>
      <R d={0.2} className="pt-axis x">Practical →</R>
      <R d={0.2} className="pt-axis y">Human →</R>
      <R d={0.4} fx="pop" className="pt-pill sky" style={{ left: 280, top: 650 }}>Apps</R>
      <R d={0.6} fx="pop" className="pt-pill yellow" style={{ left: 560, top: 470 }}>Courses</R>
      <R d={0.8} fx="pop" className="pt-pill blue" style={{ left: 1020, top: 560 }}>Coaching</R>
      <R at={1} fx="pop" className="pt-pill orange big glow" style={{ left: 1100, top: 150 }}>Nexusdemy</R>
    </div>
  );
}

// 7 · Solution: one program, three levels
const LEVELS = [
  { n: "01", name: "Foundation", color: "var(--p-sky)" },
  { n: "02", name: "Professional", color: "var(--p-yellow)" },
  { n: "03", name: "Opportunity", color: "var(--p-orange)" },
];
function Levels() {
  return (
    <div className="pt-pad">
      <R className="pt-h2 navy" as="h2">One program.</R>
      <svg className="pt-links" viewBox="0 0 1600 900" aria-hidden="true">
        <R as="path" at={2} fx="draw" pathLength="1" d="M643,387 L757,433" />
        <R as="path" at={3} fx="draw" pathLength="1" d="M943,507 L1057,553" />
      </svg>
      {LEVELS.map((l, i) => (
        <R key={l.n} at={i + 1} fx="pop" className="pt-level" style={{ left: 420 + i * 300, top: 250 + i * 120 }}>
          <span className="pt-circle" style={{ background: l.color }}>{l.n}</span>
          <b>{l.name}</b>
        </R>
      ))}
    </div>
  );
}

// 8 · Solution: the price of each level (business plan program overview)
function Packages() {
  return (
    <div className="pt-pad">
      <div className="pt-cards levels">
        {[["Foundation", "$89", "sky"], ["Professional", "$125", "orange"], ["Opportunity", "$250", "yellow"]].map(([name, p, c], i) => (
          <R key={p} d={0.2 + i * 0.15} fx="rise" className={`pt-card ${c}`}>
            <span className="pt-card-name">{name}</span>
            <span className="pt-price">{p}</span>
          </R>
        ))}
      </div>
    </div>
  );
}

// 9 · Traction: demand before launch
function Traction() {
  const ring = useOn(1);
  return (
    <div className="pt-stats">
      {[
        { at: 0, node: <Count to={42} />, label: "interviews", color: "blue" },
        { at: 1, node: <Count at={1} to={73} suffix="%" />, label: "blocked", color: "orange" },
        { at: 2, node: <Count at={2} to={31} />, label: "waitlist", color: "blue" },
      ].map((s, i) => (
        <R key={s.label} at={s.at} className="pt-stat">
          <span className="pt-num-wrap">
            {i === 1 && (
              <svg className="pt-ring" viewBox="0 0 220 220" aria-hidden="true">
                <circle cx="110" cy="110" r="100" />
                <circle cx="110" cy="110" r="100" className="fill" style={{ strokeDashoffset: ring ? 628 * 0.27 : 628 }} />
              </svg>
            )}
            <span className={`pt-num ${s.color}`}>{s.node}</span>
          </span>
          <span className="pt-label">{s.label}</span>
        </R>
      ))}
    </div>
  );
}

// 10 · Go-to-market: the funnel
function Market() {
  return (
    <div className="pt-pad">
      <div className="pt-funnel">
        {[["Reach", "sky", 760], ["Trust", "yellow", 580], ["Enroll", "orange", 400]].map(([w, c, width], i) => (
          <R key={w} at={i} fx="rise" className={`pt-tier ${c}`} style={{ width }}>{w}</R>
        ))}
        <div className="pt-flow" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <i key={i} style={{ "--i": i }} />)}</div>
      </div>
    </div>
  );
}

// 11 · Financials: year 1, profitable from month 2
function Money() {
  const drawn = useOn(0), m2 = useOn(1);
  const curve = "M120,620 C260,606 380,572 520,520 S860,380 1240,170";
  return (
    <div className="pt-pad">
      <div className="pt-swap top">
        <R until={1} className="pt-h2 white" as="h2">€29,400 in year one.</R>
        <R at={1} className="pt-h2 gold" as="h2">Profit from month two.</R>
      </div>
      <svg className="pt-chart" viewBox="0 0 1360 700" aria-hidden="true">
        <defs>
          <linearGradient id="ptArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFB703" stopOpacity=".35" />
            <stop offset="1" stopColor="#FFB703" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="axis" d="M120,640 H1300" />
        <path className={`area${drawn ? " on" : ""}`} d={`${curve} V640 H120 Z`} fill="url(#ptArea)" />
        <path className={`line${drawn ? " on" : ""}`} d={curve} pathLength="1" />
        <circle className={`m2${m2 ? " on" : ""}`} cx="235" cy="610" r="16" />
      </svg>
      <R d={0.4} className="pt-tag" style={{ left: 260, top: 700 }}>€450</R>
      <R d={2.2} className="pt-tag gold" style={{ left: 1300, top: 250 }}>€4,800</R>
    </div>
  );
}

// 12 · Team
function Team() {
  return (
    <div className="pt-team">
      <div>
        <R className="pt-h2 navy" as="h2">Daniela Gómez Hernández</R>
        <R d={0.5} className="pt-sub orange">7 years teaching.</R>
        <R at={1} className="pt-hires-title">Next hires</R>
        <div className="pt-hires">
          {["Manager", "CFO", "CMO"].map((role, i) => (
            <R key={role} at={1} d={0.15 + i * 0.15} fx="pop" className="pt-hire-role">{role}</R>
          ))}
        </div>
      </div>
      <R fx="zoom" d={0.2} className="pt-founder"><PaintedMark width={300} d={0.6} /></R>
    </div>
  );
}

// 13 · The ask, as one sum: start-up + four quarters of running costs = year one
function Ask() {
  return (
    <div className="pt-pad pt-ask">
      <R className="pt-h2 white" as="h2">Our ask</R>
      <div className="pt-sum">
        <R d={0.3} className="pt-term"><span className="pt-val">€174</span><R until={1} as="span" className="pt-cap">Start</R></R>
        <R d={0.7} fx="pop" className="pt-op">+</R>
        <R d={0.9} className="pt-term"><span className="pt-val">€600 × 4</span><R until={1} as="span" className="pt-cap">Quarterly</R></R>
        <R d={1.3} fx="pop" className="pt-op">=</R>
        <R d={1.5} fx="zoom" className="pt-term total">
          <span className="pt-val">€2,574</span>
          <R until={1} as="span" className="pt-cap">Year one</R>
        </R>
      </div>
      <R at={1} fx="pop" className="pt-source">From grants, not equity.</R>
    </div>
  );
}

// 14 · Close
function Close() {
  return (
    <div className="pt-center">
      <PaintedMark width={400} />
      <R d={2.4} className="pt-h1 white pt-mt" as="h2">Thank you.</R>
    </div>
  );
}

export const SLIDES = [
  { Slide: Logo, steps: 0, theme: "teal",
    notes: "(Stand still, look at the room.) This is Nexusdemy." },
  { Slide: Video, steps: 0, theme: "black",
    notes: "(Let the video play.) The world is bigger than your comfort zone. Nexusdemy is an online academy where B1+ English learners turn what they know into real opportunities." },
  { Slide: Chart, steps: 1, theme: "cream",
    notes: "In Latin America, 80% of companies demand English for good jobs… [CLICK] …but only 20% of professionals can meet that demand. That is the gap." },
  { Slide: People, steps: 0, theme: "cream",
    notes: "That gap is not a percentage. It is 147.9 million people." },
  { Slide: Pain, steps: 1, theme: "navy",
    notes: "They understand English: they read it, write it, pass the exams. [CLICK] But they freeze when they speak. In an interview, in a meeting, the knowledge is there and the words don't come out. One of them told us: \"I don't need more grammar. I need to stop freezing.\"" },
  { Slide: Competition, steps: 1, theme: "cream",
    notes: "Today, each option fixes one piece. Apps teach grammar, alone. Toastmasters trains speaking but not English. Courses on Coursera and edX are academic and self-paced. Private coaching works, but it's expensive. [CLICK] Nexusdemy is the missing middle: live, practical, in English, and affordable." },
  { Slide: Levels, steps: 3, theme: "cream",
    notes: "One program, three levels. [CLICK] Foundation, month one: practical English and confidence. [CLICK] Professional, month two: communication, personal branding, leadership, networking. [CLICK] Opportunity, months three and four: interviews, presentations, your own action plan. Every class: learn, practise, get feedback, apply." },
  { Slide: Packages, steps: 0, theme: "navy",
    notes: "One price per level. Foundation, month one, from $89: Essential $89 with three hours of live group classes a week, Plus $129 with a one-to-one session, a profile review and an improvement plan, and Premium $179 with two one-to-one sessions and interview practice. Professional, month two, from $125. Opportunity, months three and four, from $250." },
  { Slide: Traction, steps: 2, theme: "cream",
    notes: "We tested demand before launching. 42 customer interviews. [CLICK] 73% named speaking confidence as their main blocker. [CLICK] And 31 people joined our waitlist from organic outreach, no ads yet. The website, prices and free level test are live." },
  { Slide: Market, steps: 2, theme: "cream",
    notes: "Reach: short videos and carousels on Instagram, TikTok and Facebook, and posts on LinkedIn, for our two personas: Alejandro, a 22-year-old student who works part-time, and Camila, a 28-year-old developer. [CLICK] Trust: webinars, free mini-courses and a free English level test. [CLICK] Enroll: we follow up on WhatsApp and students enroll level by level. Marketing budget: 600 euros a quarter; in the first month we want to reach 200 people and 20 interested students." },
  { Slide: Money, steps: 1, theme: "navy",
    notes: "Year one: €29,400 in revenue, from €450 in month one to €4,800 in month twelve. Startup cost: €174. Break-even at about four students a month. [CLICK] So we are profitable from month two: about €297 net in month two, over €2,600 by month twelve. Year two, even with no growth, is at least €57,600." },
  { Slide: Team, steps: 1, theme: "cream",
    notes: "Nexusdemy was founded by Daniela Gómez Hernández, an English teacher with seven years of experience; she leads vision, curriculum and the student experience. [CLICK] Next we hire a Business Manager, a CFO and a CMO, and specialist instructors in leadership and public speaking." },
  { Slide: Ask, steps: 1, theme: "navy",
    notes: "Our ask is simple. 174 euros to start the business, plus 600 euros a quarter to run it: instructors, tools, the website and marketing. Four quarters: 2,574 euros for our first year. [CLICK] We want to fund it with grants and business plan competitions, like Erasmus for Young Entrepreneurs and Premios EmprendeXXI, not by selling part of the company, and with partners such as universities to reach students. With it, we reach operational profitability by Q3 2027." },
  { Slide: Close, steps: 0, theme: "teal",
    notes: "Because the world is bigger than your comfort zone. Thank you." },
];
