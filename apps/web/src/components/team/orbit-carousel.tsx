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

  const prev = clampIndex(active - 1, n);
  const next = clampIndex(active + 1, n);

  const activePerson = people[active];
  const prevPerson = people[prev];
  const nextPerson = people[next];

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
    const lat: GridSeg[] = [
      { id: "lat-0", d: ellipseArcD(600, 735, 1200, 310, 205, 335, 1), opacity: 0.10, strokeW: 3.4 },
      { id: "lat-1", d: ellipseArcD(585, 775, 1020, 300, 210, 330, 1), opacity: 0.08, strokeW: 3.0 },
      { id: "lat-2", d: ellipseArcD(620, 820, 1320, 360, 215, 325, 1), opacity: 0.07, strokeW: 3.0 },
    ];

    const loops: GridSeg[] = [
      { id: "loop-0", d: ellipseArcD(280, 835, 360, 180, 330, 150, 1), opacity: 0.08, strokeW: 3.2 },
      { id: "loop-1", d: ellipseArcD(920, 830, 420, 190, 30, 210, 1), opacity: 0.08, strokeW: 3.2 },
    ];

    const merTs = [0.32, 0.5, 0.68];
    const mer: GridSeg[] = merTs.map((t, i) => {
      const end = arcPoint(arc, t);
      const start: Pt = {
        x: i === 0 ? 260 : i === 1 ? 600 : 940,
        y: 698,
      };

      const dir = i === 0 ? -1 : i === 1 ? 1 : 1;
      const bend = i === 1 ? 340 : 420;

      const c1: Pt = { x: start.x + dir * bend, y: start.y - 190 };
      const c2: Pt = { x: end.x - dir * bend * 0.9, y: end.y + 260 };

      return { id: `mer-${i}`, d: cubicPath(start, c1, c2, end), opacity: 0.09, strokeW: 3.6 };
    });

    const all = [...lat, ...loops, ...mer];
    return { lat, loops, mer, all };
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
  const sideScale = 120 / 170;

  const bubbleTargets = useMemo(() => {
    return [
      {
        idx: prev,
        person: prevPerson,
        pt: pLeft,
        scale: sideScale,
        emphasize: false,
        z: 20,
      },
      {
        idx: active,
        person: activePerson,
        pt: pMid,
        scale: 1,
        emphasize: true,
        z: 30,
      },
      {
        idx: next,
        person: nextPerson,
        pt: pRight,
        scale: sideScale,
        emphasize: false,
        z: 20,
      },
    ];
  }, [prev, active, next, prevPerson, activePerson, nextPerson, pLeft.x, pLeft.y, pMid.x, pMid.y, pRight.x, pRight.y]);

  return (
    <div className="relative isolate overflow-hidden rounded-[44px] bg-gradient-to-br from-[#2f7cff] to-[#2d5cff] shadow-[0_25px_60px_rgba(0,0,0,0.15)]">
      <svg
        className="pointer-events-none absolute inset-0 z-0"
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient
            id="g1"
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
            id="g2"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(910 160) rotate(-12) scale(520 240)"
          >
            <stop stopColor="white" stopOpacity="0.14" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <filter id="arcGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="0" y="0" width={W} height={H} fill="url(#g1)" />
        <rect x="0" y="0" width={W} height={H} fill="url(#g2)" />

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
          return <circle key={`dot-${ln.id}`} cx={pt.x} cy={pt.y} r="7.5" fill="white" fillOpacity="0.95" />;
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

      <div className="relative z-10 h-[620px] p-12">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono text-xs font-semibold tracking-[0.35em] text-white/80">
              {(activePerson?.org ?? "ACM").toUpperCase()}
            </div>
            <div className="mt-2 font-calsans text-4xl font-black text-white">{activePerson.name}</div>
            {activePerson.role ? (
              <div className="mt-1 font-mono text-sm font-semibold text-white/80">{activePerson.role}</div>
            ) : null}
          </div>

          <div className="rounded-2xl bg-white/12 px-6 py-5 text-center backdrop-blur">
            <div className="font-mono text-xs font-semibold tracking-[0.35em] text-white/80">PEOPLE</div>
            <div className="mt-1 font-calsans text-4xl font-black text-white">{n}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={goPrev}
          className="absolute left-10 top-1/2 z-40 -translate-y-1/2 rounded-full p-3 text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Previous person"
        >
          <span className="text-3xl leading-none">‹</span>
        </button>

        <button
          type="button"
          onClick={goNext}
          className="absolute right-10 top-1/2 z-40 -translate-y-1/2 rounded-full p-3 text-white/70 transition hover:bg-white/10 hover:text-white"
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
              baseSize={BASE}
              scale={v.scale}
              emphasize={v.emphasize}
              zIndex={v.z}
              onClick={() => setActive(v.idx)}
            />
          ))}
        </div>

        <div className="absolute left-1/2 top-[470px] z-30 w-[420px] -translate-x-1/2 rounded-[22px] bg-white/10 px-10 py-6 text-center backdrop-blur-md flex flex-col">
          <div className="font-calsans text-xl font-black text-white">{activePerson.name}</div>
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
  baseSize,
  scale,
  emphasize,
  zIndex,
  onClick,
}: {
  person: OrbitPerson;
  x: number;
  y: number;
  baseSize: number;
  scale: number;
  emphasize?: boolean;
  zIndex?: number;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "absolute -translate-x-1/2 -translate-y-1/2 rounded-full",
        "transition-[left,top,transform,opacity] duration-700 ease-[cubic-bezier(.22,.61,.36,1)]",
        emphasize ? "" : "hover:scale-[1.02]",
      ].join(" ")}
      style={{
        left: `${(x / 1200) * 100}%`,
        top: `${(y / 700) * 100}%`,
        width: `${baseSize}px`,
        height: `${baseSize}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity: emphasize ? 1 : 0.9,
        zIndex,
      }}
      aria-label={person.name}
    >
      <div className="relative h-full w-full overflow-hidden rounded-full border-[6px] border-white/85 shadow-[0_20px_50px_rgba(0,0,0,0.30)]">
        <Image alt={person.name} src={person.imageUrl} fill className="object-cover" sizes="200px" priority={emphasize} />
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
