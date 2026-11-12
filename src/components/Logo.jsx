import { useId } from "react";
import BRAND from "../brand";
import { RIBBON_PATHS, RIBBON_VIEWBOX, RIBBON_RATIO, RIBBON_X } from "./ribbonPath";

// Nexusdemy logo proposals. Every mark is drawn on a 48×48 grid in the brand
// palette (gold --lime, --orange, --navy, --ink). `ink` is the colour used for
// strokes/fills that should follow the surface (dark on light, light on dark).

// A — Nodes: the N of Nexus drawn as a tiny network; four people, one line between them.
function NodesMark({ ink }) {
  return (
    <>
      <path d="M11 37 L11 11 L37 37 L37 11" fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="11" cy="37" r="6.5" fill="var(--navy)" />
      <circle cx="11" cy="11" r="6.5" fill="var(--lime)" />
      <circle cx="37" cy="37" r="6.5" fill="var(--orange)" />
      <circle cx="37" cy="11" r="6.5" fill="var(--navy)" />
    </>
  );
}

// B — Bubbles: two speech bubbles overlap; the shared lens is where the conversation happens.
function BubblesMark({ uid }) {
  return (
    <>
      <defs>
        <clipPath id={`${uid}-l`}><circle cx="18" cy="21" r="14" /></clipPath>
      </defs>
      <path d="M8 31 L4 43 L16 34 Z" fill="var(--lime)" />
      <path d="M40 31 L44 43 L32 34 Z" fill="var(--orange)" />
      <circle cx="18" cy="21" r="14" fill="var(--lime)" />
      <circle cx="30" cy="21" r="14" fill="var(--orange)" />
      <circle cx="30" cy="21" r="14" fill="var(--navy)" clipPath={`url(#${uid}-l)`} />
    </>
  );
}

// C — Weave: the x of nexus as two strands that pass over and under — a knot, a link.
function WeaveMark({ uid }) {
  return (
    <>
      <defs>
        <mask id={`${uid}-m`} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
          <rect width="48" height="48" fill="#fff" />
          <path d="M17 17 L31 31" stroke="#000" strokeWidth="17" strokeLinecap="butt" />
        </mask>
      </defs>
      <path d="M38 10 L10 38" stroke="var(--orange)" strokeWidth="9" strokeLinecap="round" mask={`url(#${uid}-m)`} />
      <path d="M10 10 L38 38" stroke="var(--lime)" strokeWidth="9" strokeLinecap="round" />
    </>
  );
}

// D — Monogram: a lowercase n inside a speech bubble, with a gold node as the spark.
function MonogramMark() {
  return (
    <>
      <path d="M8 4 H40 Q46 4 46 10 V32 Q46 38 40 38 H22 L12 46 V38 H8 Q2 38 2 32 V10 Q2 4 8 4 Z" fill="var(--navy)" />
      <path d="M15 30 V20 Q15 13 22 13 Q29 13 29 20 V30" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      <circle cx="36.5" cy="13.5" r="4.5" fill="var(--lime)" />
    </>
  );
}

// ── Round 2: flowing marks, built on the Nodes idea and the infinity sign ──

// The infinity path used by E and G: starts at the centre, left loop, back through
// the centre, right loop, ends at the centre. pathLength=100 → centre crossing at 0/50/100.
const INF = "M24 24 C16 6 4 4 4 24 C4 44 16 42 24 24 C32 6 44 4 44 24 C44 44 32 42 24 24";

function Node({ cx, cy, r = 5.5, fill, ring }) {
  return <circle cx={cx} cy={cy} r={r} fill={fill} stroke={ring} strokeWidth={ring ? 2.5 : 0} />;
}

// E — Infinity: the loop never ends; the navy node sits exactly where the two loops cross.
function InfinityMark({ ink }) {
  return (
    <>
      <path d={INF} fill="none" stroke={ink} strokeWidth="4.5" strokeLinecap="round" />
      <Node cx={11} cy={9.9} fill="var(--lime)" />
      <Node cx={37} cy={38.2} fill="var(--orange)" />
      <Node cx={24} cy={24} r={6} fill="var(--navy)" />
    </>
  );
}

// F — Flow N: the Nodes N, but the line flows like handwriting instead of zig-zagging.
function FlowMark({ ink }) {
  return (
    <>
      <path d="M10 38 C10 22 10 10 17 10 C24 10 24 38 31 38 C38 38 38 26 38 10" fill="none" stroke={ink} strokeWidth="4.5" strokeLinecap="round" />
      <Node cx={10} cy={38} fill="var(--lime)" />
      <Node cx={38} cy={10} fill="var(--orange)" />
      <Node cx={24} cy={24} r={5} fill="var(--navy)" />
    </>
  );
}

// G — Woven infinity: a gold-to-orange ribbon that passes over itself at the centre —
// the same over/under crossing as the orange x in the wordmark.
function WovenInfinityMark({ uid }) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-g`} gradientUnits="userSpaceOnUse" x1="4" y1="0" x2="44" y2="0">
          <stop offset="0" stopColor="var(--lime)" />
          <stop offset="1" stopColor="var(--orange)" />
        </linearGradient>
        <mask id={`${uid}-m`} maskUnits="userSpaceOnUse" x="-4" y="-4" width="56" height="56">
          <rect x="-4" y="-4" width="56" height="56" fill="#fff" />
          <path d={INF} pathLength="100" fill="none" stroke="#000" strokeWidth="11" strokeDasharray="14 86" strokeDashoffset="-43" />
        </mask>
      </defs>
      <path d={INF} fill="none" stroke={`url(#${uid}-g)`} strokeWidth="6" strokeLinecap="round" mask={`url(#${uid}-m)`} />
      <path d={INF} pathLength="100" fill="none" stroke={`url(#${uid}-g)`} strokeWidth="6" strokeDasharray="16 84" strokeDashoffset="-42" />
      <Node cx={4} cy={24} r={3.4} fill="var(--navy)" />
      <Node cx={44} cy={24} r={3.4} fill="var(--navy)" />
    </>
  );
}

// H — Wave: three voices on one flowing line — gold speaks, orange answers, navy is where they meet.
function WaveMark({ ink }) {
  return (
    <>
      <path d="M6 32 C12 6 19 8 24 24 C29 40 36 42 42 16" fill="none" stroke={ink} strokeWidth="4.5" strokeLinecap="round" />
      <Node cx={6} cy={32} fill="var(--lime)" />
      <Node cx={42} cy={16} fill="var(--orange)" />
      <Node cx={24} cy={24} r={5} fill="var(--navy)" />
    </>
  );
}

// ── Final logo: the brush infinity ──
// Three brush strokes (left loop, front diagonal, right loop), each pressed at the start
// and lifting into a light bristle tip; they leave a gap where the loop passes under itself.
function RibbonMark({ uid, fill }) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-g`} gradientUnits="userSpaceOnUse" x1={RIBBON_X[0]} y1="0" x2={RIBBON_X[1]} y2="0">
          <stop offset="0" stopColor="var(--lime)" />
          <stop offset="1" stopColor="var(--orange)" />
        </linearGradient>
      </defs>
      {RIBBON_PATHS.map((d, i) => <path key={i} d={d} fill={fill || `url(#${uid}-g)`} fillRule="evenodd" />)}
    </>
  );
}

export const MARKS = {
  ribbon: { round: 3, label: "Brush infinity", Mark: RibbonMark, viewBox: RIBBON_VIEWBOX, ratio: RIBBON_RATIO, idea: "An infinity painted in three brush strokes. Each one is pressed down, sweeps, and lifts off in a few bristle marks. The loop passes under itself and leaves a gap: the nexus, where two voices cross. Gold turning into orange, the colour of the brand. Made by hand, never finished: like learning to speak." },
  infinity: { round: 2, label: "E · Infinity", Mark: InfinityMark, idea: "An infinity sign with a node at each end and the navy nexus right where the loops cross. Connection that never stops; Nodes, made to flow." },
  flow: { round: 2, label: "F · Flow N", Mark: FlowMark, idea: "The Nodes N rewritten as one flowing stroke, like handwriting. Gold starts, orange arrives, navy marks the meeting point in the middle." },
  woven: { round: 2, label: "G · Woven infinity", Mark: WovenInfinityMark, idea: "A gold-to-orange infinity ribbon that passes over itself at the centre — the same crossing as the orange x in the wordmark." },
  wave: { round: 2, label: "H · Wave", Mark: WaveMark, idea: "A conversation as a wave: one voice goes out, the other answers, and they meet in the navy node in the middle." },
  nodes: { round: 1, label: "A · Nodes", Mark: NodesMark, idea: "The N of Nexus drawn as a small network: four points, one continuous line. People connected through a single conversation." },
  bubbles: { round: 1, label: "B · Bubbles", Mark: BubblesMark, idea: "Two speech bubbles overlap. The navy lens in the middle is the nexus — the place where two voices meet." },
  weave: { round: 1, label: "C · Weave", Mark: WeaveMark, idea: "The x in nexus as two strands woven over and under. A link that holds; works as a single-letter icon." },
  monogram: { round: 1, label: "D · Monogram", Mark: MonogramMark, idea: "A lowercase n inside a speech bubble, with a gold node as the spark. The most literal: a language school that talks." },
};

// `fill` forces a single colour (one-colour versions of the ribbon).
export function LogoMark({ size = 48, variant = BRAND.logoMark, ink = "currentColor", fill }) {
  const { Mark, viewBox = "0 0 48 48", ratio = 1 } = MARKS[variant] || MARKS.ribbon;
  const uid = `nx${variant}${useId().replace(/:/g, "")}`;
  return (
    <svg width={size * ratio} height={size} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ display: "block", flex: "none", overflow: "visible" }}>
      <Mark ink={ink} uid={uid} fill={fill} />
    </svg>
  );
}

export function Wordmark({ size = 44, accent = true }) {
  const [a, b] = BRAND.wordmark;
  const x = a.indexOf("x");
  return (
    <span
      style={{
        fontFamily: "var(--font-editorial)",
        fontSize: size * 0.62,
        lineHeight: 1,
        letterSpacing: "-0.035em",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontWeight: 800 }}>
        {accent && x >= 0 ? (
          <>{a.slice(0, x)}<span style={{ color: "var(--orange)" }}>x</span>{a.slice(x + 1)}</>
        ) : a}
      </span>
      <span style={{ fontWeight: 400, opacity: 0.78 }}>{b}</span>
    </span>
  );
}

// `mono` keeps text in currentColor (for dark surfaces); otherwise the text is ink.
export function LogoFull({ size = 44, mono = false, variant = BRAND.logoMark, tagline = false, accent = true }) {
  const color = mono ? "currentColor" : "var(--ink)";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: size * 0.26, color }}>
      <LogoMark size={size} variant={variant} />
      <span style={{ display: "flex", flexDirection: "column", gap: size * 0.1 }}>
        <Wordmark size={size} accent={accent} />
        {tagline && (
          <span style={{ fontSize: Math.max(9, size * 0.17), fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.65, whiteSpace: "nowrap" }}>
            {BRAND.tagline}
          </span>
        )}
      </span>
    </span>
  );
}
