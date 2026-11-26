"use client";

import { createContext, useContext, useId } from "react";
import { RIBBON_PATHS, RIBBON_VIEWBOX, RIBBON_X, RIBBON_CENTERS } from "../components/ribbonPath";

// Building blocks for the pitch slides: step-aware reveals, counters and the painted logo.

export const StepCtx = createContext({ step: 0, ready: false });

/** Reveal: shown from step `at`, hidden again from step `until`. `fx` picks the entrance. */
export function R({ at = 0, until, d = 0, fx = "up", as: Tag = "div", className = "", style, children, ...rest }) {
  const { step, ready } = useContext(StepCtx);
  const on = ready && step >= at && (until === undefined || step < until);
  const gone = until !== undefined && step >= until;
  return (
    <Tag className={`r r-${fx}${on ? " on" : ""}${gone ? " gone" : ""} ${className}`} style={{ "--d": `${d}s`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}

/** True once the slide is showing step `at` (for effects that need to start, like counters). */
export function useOn(at = 0) {
  const { step, ready } = useContext(StepCtx);
  return ready && step >= at;
}

/** A number that counts up when its step is reached. Pure CSS (an animatable integer
 *  custom property shown through a counter), so it always lands on the exact value.
 *  Supports up to one decimal. */
export function Count({ at = 0, to, decimals = 0, prefix = "", suffix = "", dur = 1.6, d = 0 }) {
  const on = useOn(at);
  const n = Math.round(to * (decimals ? 10 : 1));
  return (
    <span className={`pt-count${decimals ? " dec" : ""}`} style={{ "--n": on ? n : 0, "--dur": `${dur}s`, "--d": `${d}s` }}
      data-prefix={prefix} data-suffix={suffix} aria-label={`${prefix}${to}${suffix}`} />
  );
}

/** The brush-infinity logo, painting itself stroke by stroke when its step is reached. */
export function PaintedMark({ at = 0, width = 420, d = 0 }) {
  const on = useOn(at);
  const uid = useId().replace(/:/g, "");
  const [, , vw, vh] = RIBBON_VIEWBOX.split(" ").map(Number);
  return (
    <svg className={`pt-mark${on ? " on" : ""}`} width={width} height={(width * vh) / vw} viewBox={RIBBON_VIEWBOX} style={{ "--d": `${d}s`, overflow: "visible" }} aria-label="Nexusdemy logo">
      <defs>
        <linearGradient id={`${uid}g`} gradientUnits="userSpaceOnUse" x1={RIBBON_X[0]} y1="0" x2={RIBBON_X[1]} y2="0">
          <stop offset="0" stopColor="#FFB703" />
          <stop offset="1" stopColor="#FB8500" />
        </linearGradient>
        {RIBBON_CENTERS.map((c, i) => (
          <mask id={`${uid}m${i}`} key={i} maskUnits="userSpaceOnUse" x="-20" y="0" width="160" height="130">
            <path d={c.d} fill="none" stroke="#fff" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round"
              style={{ "--len": c.len + 4, "--i": i }} />
          </mask>
        ))}
      </defs>
      {RIBBON_PATHS.map((p, i) => <path key={i} d={p} fill={`url(#${uid}g)`} fillRule="evenodd" mask={`url(#${uid}m${i})`} />)}
    </svg>
  );
}
