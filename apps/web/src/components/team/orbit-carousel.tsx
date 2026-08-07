"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

export type OrbitPerson = {
  id: string;
  name: string;
  role?: string;
  org?: string;
  imageUrl: string;
  socials?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
    website?: string;
  };
};

export type OrbitCarouselProps = {
  people?: OrbitPerson[];
  initialIndex?: number;
};

function clampIndex(i: number, n: number) {
  if (n <= 0) return 0;
  return ((i % n) + n) % n;
}

function getCircularOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;

  if (offset > total / 2) {
    offset -= total;
  }

  if (offset < -total / 2) {
    offset += total;
  }

  return offset;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

type Pt = { x: number; y: number };

function ellipsePoint(cx: number, cy: number, rx: number, ry: number, theta: number): Pt {
  return {
    x: cx + rx * Math.cos(theta),
    y: cy + ry * Math.sin(theta),
  };
}

function arcPoint(arc: { cx: number; cy: number; rx: number; ry: number }, t: number) {
  const thetaStart = degToRad(200);
  const thetaEnd = degToRad(340);
  const theta = lerp(thetaStart, thetaEnd, t);
  return ellipsePoint(arc.cx, arc.cy, arc.rx, arc.ry, theta);
}

function arcPathD(arc: { cx: number; cy: number; rx: number; ry: number }) {
  const a = arcPoint(arc, 0);
  const b = arcPoint(arc, 1);
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${arc.rx} ${arc.ry} 0 0 1 ${b.x.toFixed(
    2
  )} ${b.y.toFixed(2)}`;
}

function cubicPath(a: Pt, c1: Pt, c2: Pt, b: Pt) {
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} C ${c1.x.toFixed(2)} ${c1.y.toFixed(
    2
  )} ${c2.x.toFixed(2)} ${c2.y.toFixed(2)} ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}

function ellipseArcD(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  startDeg: number,
  endDeg: number,
  sweep: 0 | 1 = 1
) {
  const a = ellipsePoint(cx, cy, rx, ry, degToRad(startDeg));
  const b = ellipsePoint(cx, cy, rx, ry, degToRad(endDeg));
  const largeArc: 0 | 1 = Math.abs(endDeg - startDeg) >= 180 ? 1 : 0;
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${rx} ${ry} 0 ${largeArc} ${sweep} ${b.x.toFixed(
    2
  )} ${b.y.toFixed(2)}`;
}

type GridSeg = {
  id: string;
  d: string;
  opacity: number;
  strokeW: number;
};

export default function OrbitCarousel({ people = [], initialIndex = 0 }: OrbitCarouselProps) {
  const n = people.length;
  const [active, setActive] = useState(() => clampIndex(initialIndex, n || 1));

  useEffect(() => {
    setActive((v) => clampIndex(v, n || 1));
  }, [n]);

  if (!people || people.length === 0) {
    return (
      <div className="relative isolate overflow-hidden rounded-[44px] border border-black/5 bg-white shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
        <div className="p-10">
          <div className="font-calsans text-xl font-bold text-black/80">No team members yet</div>
          <div className="mt-1 font-mono text-sm text-black/50">Pass people into OrbitCarousel.</div>
        </div>
      </div>
    );
  }

  const activePerson = people[active];

  const W = 1200;
  const H = 700;

  const arc = {
    cx: 600,
    cy: 640,
    rx: 980,
    ry: 260,
  };

  const tLeft = 0.24;
  const tMid = 0.5;
  const tRight = 0.76;

  const pLeft = arcPoint(arc, tLeft);
  const pMid = arcPoint(arc, tMid);
  const pRight = arcPoint(arc, tRight);

  // Mobile portrait centers are measured in pixels from the top of the card.
  // The center is the highest point of the arc, while the side portraits sit lower.
  // This creates the visible top edge of a very large circle.
  const mobilePLeft: Pt = { x: 0, y: 300 };
  const mobilePMid: Pt = { x: 600, y: 245 };
  const mobilePRight: Pt = { x: 1200, y: 300 };

  function goPrev() {
    setActive((v) => clampIndex(v - 1, n));
  }
  function goNext() {
    setActive((v) => clampIndex(v + 1, n));
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [n]);

  const grid = useMemo(() => {
    // Loose globe / wireframe grid.
    // Intentionally sparse and asymmetric so it feels designed rather than perfectly generated.
    const meridians: GridSeg[] = [
      {
        id: "meridian-left",
        d: "M 235 402 C 355 470 438 575 472 700",
        opacity: 0.085,
        strokeW: 2.9,
      },
      {
        id: "meridian-right",
        d: "M 1015 414 C 848 492 785 590 760 700",
        opacity: 0.095,
        strokeW: 3.0,
      },
    ];

    const latitudes: GridSeg[] = [
      {
        id: "latitude-upper",
        d: "M -65 510 Q 545 451 1260 523",
        opacity: 0.07,
        strokeW: 2.7,
      },
      {
        id: "latitude-middle",
        d: "M -20 592 Q 655 518 1218 604",
        opacity: 0.058,
        strokeW: 2.55,
      },
      {
        id: "latitude-lower",
        d: "M 55 667 Q 520 612 1280 682",
        opacity: 0.05,
        strokeW: 2.45,
      },
    ];

    return { all: [...meridians, ...latitudes] };
  }, []);

  // Dots: one per grid line, animated along its own path
  const pathRefs = useRef<Record<string, SVGPathElement | null>>({});
  const [gridDots, setGridDots] = useState<Record<string, Pt>>({});

  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    // make this smaller = faster overall
    const baseDurationMs = 100;

    const tick = (ts: number) => {
      if (startRef.current == null) startRef.current = ts;
      const elapsed = ts - startRef.current;

      const nextDots: Record<string, Pt> = {};

      for (let i = 0; i < grid.all.length; i++) {
        const seg = grid.all[i];
        const el = pathRefs.current[seg.id];
        if (!el) continue;

        const len = el.getTotalLength();

        const speed = 0.85 + (i % 3) * 0.18; // subtle variety
        const phase = (i * 0.17) % 1;

        const u = ((elapsed / (baseDurationMs / speed)) + phase * baseDurationMs) / baseDurationMs;
        const uu = ((u % 1) + 1) % 1;

        const pt = el.getPointAtLength(len * uu);
        nextDots[seg.id] = { x: pt.x, y: pt.y };
      }

      setGridDots(nextDots);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startRef.current = null;
    };
  }, [grid]);

  const BASE = 170;
  const MOBILE_BASE = 132;
  const sideScale = 120 / 170;
  const mobileSideScale = 0.58;

  const bubbleTargets = useMemo(() => {
    return people.map((person, idx) => {
      const offset = getCircularOffset(idx, active, n);

      if (offset === 0) {
        return {
          idx,
          person,
          pt: pMid,
          mobilePt: mobilePMid,
          scale: 1,
          mobileScale: 1,
          opacity: 1,
          emphasize: true,
          z: 30,
        };
      }

      if (offset === -1) {
        return {
          idx,
          person,
          pt: pLeft,
          mobilePt: mobilePLeft,
          scale: sideScale,
          mobileScale: mobileSideScale,
          opacity: 0.9,
          emphasize: false,
          z: 20,
        };
      }

      if (offset === 1) {
        return {
          idx,
          person,
          pt: pRight,
          mobilePt: mobilePRight,
          scale: sideScale,
          mobileScale: mobileSideScale,
          opacity: 0.9,
          emphasize: false,
          z: 20,
        };
      }

      if (offset < -1) {
        return {
          idx,
          person,
          pt: { x: -140, y: pLeft.y },
          mobilePt: { x: -140, y: mobilePLeft.y },
          scale: sideScale * 0.85,
          mobileScale: mobileSideScale * 0.85,
          opacity: 0,
          emphasize: false,
          z: 10,
        };
      }

      return {
        idx,
        person,
        pt: { x: W + 140, y: pRight.y },
        mobilePt: { x: W + 140, y: mobilePRight.y },
        scale: sideScale * 0.85,
        mobileScale: mobileSideScale * 0.85,
        opacity: 0,
        emphasize: false,
        z: 10,
      };
    });
  }, [
    people,
    active,
    n,
    pLeft.x,
    pLeft.y,
    pMid.x,
    pMid.y,
    pRight.x,
    pRight.y,
    mobilePLeft.x,
    mobilePLeft.y,
    mobilePMid.x,
    mobilePMid.y,
    mobilePRight.x,
    mobilePRight.y,
    sideScale,
  ]);

  return (
    <div className="relative isolate overflow-hidden rounded-[28px] bg-gradient-to-br md:rounded-[44px] from-[#2f7cff] to-[#2d5cff] shadow-[0_25px_60px_rgba(0,0,0,0.15)]">
      {/* Background glow is shared by mobile and desktop. */}
      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient
            id="backgroundGlowLeft"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(250 180) rotate(20) scale(520 240)"
          >
            <stop stopColor="white" stopOpacity="0.18" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <radialGradient
            id="backgroundGlowRight"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(910 160) rotate(-12) scale(520 240)"
          >
            <stop stopColor="white" stopOpacity="0.14" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width={W} height={H} fill="url(#backgroundGlowLeft)" />
        <rect x="0" y="0" width={W} height={H} fill="url(#backgroundGlowRight)" />
      </svg>

      {/* The original desktop grid and orbit are completely removed on mobile. */}
      <svg
        className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full md:block"
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="arcGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {grid.all.map((ln) => (
          <path
            key={ln.id}
            ref={(el) => {
              pathRefs.current[ln.id] = el;
            }}
            d={ln.d}
            stroke="white"
            strokeOpacity={ln.opacity}
            strokeWidth={ln.strokeW}
            strokeLinecap="round"
          />
        ))}


        {grid.all.map((ln) => {
          const pt = gridDots[ln.id];
          if (!pt) return null;
          return (
            <circle
                key={`dot-${ln.id}`}
              cx={pt.x}
              cy={pt.y}
              r="7.5"
              fill="white"
              fillOpacity={ln.opacity}
            />
          );
        })}

        <path
          d={arcPathD(arc)}
          stroke="white"
          strokeOpacity="0.95"
          strokeWidth="7"
          strokeLinecap="round"
          filter="url(#arcGlow)"
        />
      </svg>

      {/* Mobile globe / wireframe grid.
          Sparse and intentionally uneven: two differently angled meridians and
          three latitude bands with offset starts, ends, and curvature. */}
      <svg
        className="pointer-events-none absolute inset-0 z-[4] h-full w-full md:hidden"
        viewBox="0 0 1200 500"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        {/* Uneven meridians */}
        <path
          d="M 235 267 C 355 322 438 410 472 500"
          stroke="white"
          strokeOpacity="0.085"
          strokeWidth="2.9"
          strokeLinecap="round"
        />
        <path
          d="M 1015 281 C 848 342 785 422 760 500"
          stroke="white"
          strokeOpacity="0.095"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Uneven latitude bands */}
        <path
          d="M -65 335 Q 545 292 1260 348"
          stroke="white"
          strokeOpacity="0.07"
          strokeWidth="2.7"
          strokeLinecap="round"
        />
        <path
          d="M -20 405 Q 655 352 1218 415"
          stroke="white"
          strokeOpacity="0.058"
          strokeWidth="2.55"
          strokeLinecap="round"
        />
        <path
          d="M 55 468 Q 520 430 1280 480"
          stroke="white"
          strokeOpacity="0.05"
          strokeWidth="2.45"
          strokeLinecap="round"
        />

        {/* A few deliberately unevenly placed dots. */}
        <circle cx="322" cy="327" r="7" fill="white" fillOpacity="0.085" />
        <circle cx="735" cy="360" r="7" fill="white" fillOpacity="0.085" />
        <circle cx="1002" cy="414" r="7" fill="white" fillOpacity="0.085" />
      </svg>

      {/* Mobile main portrait orbit. Kept separate from the full-height grid so
          extending the grid cannot change the orbit's concavity or vertical position. */}
      <svg
        className="pointer-events-none absolute left-0 top-[215px] z-[5] h-[285px] w-full md:hidden"
        viewBox="0 0 1200 500"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="mobileArcGlow" x="-50%" y="-100%" width="200%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M 0 149.12 Q 600 -43.86 1200 149.12"
          stroke="white"
          strokeOpacity="0.95"
          strokeWidth="7"
          strokeLinecap="round"
          filter="url(#mobileArcGlow)"
        />
      </svg>

      <div className="relative z-10 h-[500px] p-5 sm:h-[540px] sm:p-7 md:h-[620px] md:p-12">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 max-w-[68%] md:max-w-none">
            <div className="font-mono text-[10px] md:text-xs font-semibold tracking-[0.35em] text-white/80">
              {(activePerson?.org ?? "ACM").toUpperCase()}
            </div>
            <div className="mt-1 break-words font-calsans text-2xl font-black leading-[0.95] text-white sm:text-3xl md:mt-2 md:text-4xl">{activePerson.name}</div>
            {activePerson.role ? (
              <div className="mt-1 font-mono text-xs font-semibold text-white/80 md:text-sm">{activePerson.role}</div>
            ) : null}
          </div>

          <div className="shrink-0 rounded-xl bg-white/12 px-3 py-3 text-center backdrop-blur md:rounded-2xl md:px-6 md:py-5">
            <div className="font-mono text-[9px] font-semibold tracking-[0.25em] text-white/80 md:text-xs md:tracking-[0.35em]">PEOPLE</div>
            <div className="mt-0.5 font-calsans text-2xl font-black text-white md:mt-1 md:text-4xl">{n}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={goPrev}
          className="absolute left-1 top-[55%] z-40 -translate-y-1/2 rounded-full p-3 sm:left-3 md:left-10 md:top-1/2 text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Previous person"
        >
          <span className="text-3xl leading-none">‹</span>
        </button>

        <button
          type="button"
          onClick={goNext}
          className="absolute right-1 top-[55%] z-40 -translate-y-1/2 rounded-full p-3 sm:right-3 md:right-10 md:top-1/2 text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Next person"
        >
          <span className="text-3xl leading-none">›</span>
        </button>

        {/* Bubbles */}
        <div className="absolute inset-0 z-30">
          {bubbleTargets.map((v) => (
            <PersonBubble
              key={v.person.id}
              person={v.person}
              x={v.pt.x}
              y={v.pt.y}
              mobileX={v.mobilePt.x}
              mobileY={v.mobilePt.y}
              baseSize={BASE}
              mobileBaseSize={MOBILE_BASE}
              scale={v.scale}
              mobileScale={v.mobileScale}
              opacity={v.opacity}
              emphasize={v.emphasize}
              zIndex={v.z}
              onClick={() => setActive(v.idx)}
            />
          ))}
        </div>

        <div className="absolute bottom-5 left-1/2 z-30 flex w-[calc(100%-2rem)] -translate-x-1/2 flex-col rounded-[18px] bg-white/[0.045] px-5 py-4 text-center sm:bottom-6 sm:w-[calc(100%-3rem)] md:bottom-auto md:top-[470px] md:w-[420px] md:rounded-[22px] md:bg-white/10 md:px-10 md:py-6 md:backdrop-blur-md">
          <div className="font-calsans text-lg font-black text-white md:text-xl">{activePerson.name}</div>
          {activePerson.role ? (
            <div className="mt-1 font-mono text-sm font-semibold text-white/80">{activePerson.role}</div>
          ) : null}

          <SocialLinks socials={activePerson.socials} />
        </div>
      </div>
    </div>
  );
}

function PersonBubble({
  person,
  x,
  y,
  mobileX,
  mobileY,
  baseSize,
  mobileBaseSize,
  scale,
  mobileScale,
  opacity,
  emphasize,
  zIndex,
  onClick,
}: {
  person: OrbitPerson;
  x: number;
  y: number;
  mobileX: number;
  mobileY: number;
  baseSize: number;
  mobileBaseSize: number;
  scale: number;
  mobileScale: number;
  opacity: number;
  emphasize?: boolean;
  zIndex?: number;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "absolute rounded-full [left:var(--mobile-left)] [top:var(--mobile-top)] md:[left:var(--desktop-left)] md:[top:var(--desktop-top)]",
        "transition-[left,top,transform,opacity,width,height] duration-700 ease-[cubic-bezier(.22,.61,.36,1)]",
        "h-[var(--mobile-size)] w-[var(--mobile-size)] md:h-[var(--desktop-size)] md:w-[var(--desktop-size)]",
        "[transform:translate(-50%,-50%)_scale(var(--mobile-scale))] md:[transform:translate(-50%,-50%)_scale(var(--desktop-scale))]",
        emphasize ? "" : "hover:scale-[1.02]",
      ].join(" ")}
      style={
        {
          "--desktop-left": `${(x / 1200) * 100}%`,
          "--desktop-top": `${(y / 700) * 100}%`,
          "--mobile-left": `${(mobileX / 1200) * 100}%`,
          "--mobile-top": `${mobileY}px`,
          "--desktop-size": `${baseSize}px`,
          "--mobile-size": `${mobileBaseSize}px`,
          "--desktop-scale": scale,
          "--mobile-scale": mobileScale,
          opacity,
          pointerEvents: opacity === 0 ? "none" : "auto",
          zIndex,
        } as React.CSSProperties
      }
      aria-label={person.name}
    >
      <div className="relative h-full w-full overflow-hidden rounded-full border-[4px] border-white/85 md:border-[6px] shadow-[0_20px_50px_rgba(0,0,0,0.30)]">
        <Image alt={person.name} src={person.imageUrl} fill className="object-cover" sizes="(max-width: 767px) 132px, 200px" priority={emphasize} />
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_0_10px_rgba(255,255,255,0.06)]" />
    </button>
  );
}

/* ---------------- Socials (ONLY addition) ---------------- */

function normalizeUrl(url: string) {
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

function SocialLinks({
  socials,
}: {
  socials?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
    website?: string;
  };
}) {
  const items = [
    socials?.linkedin ? { k: "linkedin", href: socials.linkedin, label: "in" } : null,
    socials?.github ? { k: "github", href: socials.github, label: "gh" } : null,
    socials?.instagram ? { k: "instagram", href: socials.instagram, label: "ig" } : null,
    socials?.website ? { k: "website", href: socials.website, label: "web" } : null,
  ].filter(Boolean) as { k: string; href: string; label: string }[];

  if (items.length === 0) return null;

  return (
    <div className="mt-3 flex items-center justify-center gap-2.5">
      {items.map((it) => (
        <a
          key={it.k}
          href={normalizeUrl(it.href)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-mono font-bold text-white/90 ring-1 ring-white/15 transition hover:bg-white/20"
          aria-label={it.k}
          title={it.k}
        >
          {it.label}
        </a>
      ))}
    </div>
  );
}