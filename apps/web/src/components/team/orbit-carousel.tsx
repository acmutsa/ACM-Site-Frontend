"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

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

type Point = {
  x: number;
  y: number;
};

type GridLine = {
  id: string;
  d: string;
  opacity: number;
  strokeWidth: number;
  dotCount: number;
  dotSpeed: number;
  dotOffset: number;
};

type PositionedPerson = {
  person: OrbitPerson;
  personIndex: number;
  distance: number;
  point: Point;
  scale: number;
  opacity: number;
  isActive: boolean;
  isVisible: boolean;
};

const VIEWBOX_WIDTH = 1200;
const VIEWBOX_HEIGHT = 700;

/**
 * This one object controls:
 *
 * - the glowing white line
 * - profile-picture positions
 * - connector endpoints
 *
 * That guarantees that all three stay attached.
 */
const MAIN_ORBIT = {
  cx: 600,
  cy: 640,
  rx: 980,
  ry: 260,
  startDegrees: 200,
  endDegrees: 340,
};

function clampIndex(index: number, length: number) {
  if (length <= 0) {
    return 0;
  }

  return ((index % length) + length) % length;
}

function lerp(
  start: number,
  end: number,
  amount: number
) {
  return start + (end - start) * amount;
}

function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function getOrbitPoint(progress: number): Point {
  const startAngle = degreesToRadians(
    MAIN_ORBIT.startDegrees
  );

  const endAngle = degreesToRadians(
    MAIN_ORBIT.endDegrees
  );

  const angle = lerp(
    startAngle,
    endAngle,
    progress
  );

  return {
    x:
      MAIN_ORBIT.cx +
      MAIN_ORBIT.rx * Math.cos(angle),
    y:
      MAIN_ORBIT.cy +
      MAIN_ORBIT.ry * Math.sin(angle),
  };
}

function getOrbitPath() {
  const start = getOrbitPoint(0);
  const end = getOrbitPoint(1);

  return [
    `M ${start.x.toFixed(2)} ${start.y.toFixed(2)}`,
    `A ${MAIN_ORBIT.rx} ${MAIN_ORBIT.ry}`,
    "0 0 1",
    `${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
  ].join(" ");
}

function createCubicPath(
  start: Point,
  control1: Point,
  control2: Point,
  end: Point
) {
  return [
    `M ${start.x.toFixed(2)} ${start.y.toFixed(2)}`,
    `C ${control1.x.toFixed(2)} ${control1.y.toFixed(2)}`,
    `${control2.x.toFixed(2)} ${control2.y.toFixed(2)}`,
    `${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
  ].join(" ");
}

function getCircularDistance(
  personIndex: number,
  activeIndex: number,
  length: number
) {
  if (length <= 1) {
    return 0;
  }

  let distance = personIndex - activeIndex;
  const half = length / 2;

  while (distance > half) {
    distance -= length;
  }

  while (distance < -half) {
    distance += length;
  }

  return distance;
}

/**
 * The connector endpoints are exact points on MAIN_ORBIT.
 *
 * They are intentionally placed at uneven intervals and use
 * different control points so they resemble the reference image
 * without becoming perfectly symmetrical.
 */
function buildGridLines(): GridLine[] {
  const leftConnectorPoint = getOrbitPoint(0.27);
  const centerConnectorPoint = getOrbitPoint(0.48);
  const rightConnectorPoint = getOrbitPoint(0.7);

  return [
    {
      id: "upper-sweep",
      d: createCubicPath(
        { x: -100, y: 650 },
        { x: 190, y: 555 },
        { x: 690, y: 555 },
        { x: 1300, y: 680 }
      ),
      opacity: 0.15,
      strokeWidth: 2.1,
      dotCount: 2,
      dotSpeed: 0.000034,
      dotOffset: 0.08,
    },
    {
      id: "middle-sweep",
      d: createCubicPath(
        { x: -140, y: 704 },
        { x: 250, y: 590 },
        { x: 800, y: 605 },
        { x: 1340, y: 732 }
      ),
      opacity: 0.13,
      strokeWidth: 2,
      dotCount: 2,
      dotSpeed: 0.000029,
      dotOffset: 0.32,
    },
    {
      id: "lower-sweep",
      d: createCubicPath(
        { x: -175, y: 762 },
        { x: 210, y: 650 },
        { x: 850, y: 662 },
        { x: 1375, y: 792 }
      ),
      opacity: 0.11,
      strokeWidth: 2,
      dotCount: 2,
      dotSpeed: 0.000031,
      dotOffset: 0.59,
    },
    {
      id: "bottom-sweep",
      d: createCubicPath(
        { x: -220, y: 825 },
        { x: 280, y: 704 },
        { x: 900, y: 720 },
        { x: 1420, y: 850 }
      ),
      opacity: 0.08,
      strokeWidth: 2,
      dotCount: 1,
      dotSpeed: 0.000025,
      dotOffset: 0.82,
    },

    {
      id: "crossing-left",
      d: createCubicPath(
        { x: -90, y: 742 },
        { x: 190, y: 618 },
        { x: 430, y: 635 },
        { x: 710, y: 760 }
      ),
      opacity: 0.11,
      strokeWidth: 2,
      dotCount: 1,
      dotSpeed: 0.000027,
      dotOffset: 0.22,
    },
    {
      id: "crossing-right",
      d: createCubicPath(
        { x: 460, y: 758 },
        { x: 710, y: 620 },
        { x: 980, y: 620 },
        { x: 1315, y: 724 }
      ),
      opacity: 0.11,
      strokeWidth: 2,
      dotCount: 2,
      dotSpeed: 0.000026,
      dotOffset: 0.53,
    },

    /**
     * These three lines reach the glowing orbit.
     *
     * They are drawn first, and the glowing orbit is drawn over
     * their endpoints for a clean connection.
     */
    {
      id: "connector-left",
      d: createCubicPath(
        { x: 145, y: 760 },
        { x: 205, y: 684 },
        {
          x: leftConnectorPoint.x - 54,
          y: leftConnectorPoint.y + 82,
        },
        leftConnectorPoint
      ),
      opacity: 0.17,
      strokeWidth: 2.1,
      dotCount: 2,
      dotSpeed: 0.000038,
      dotOffset: 0.13,
    },
    {
      id: "connector-center",
      d: createCubicPath(
        { x: 450, y: 775 },
        { x: 490, y: 680 },
        {
          x: centerConnectorPoint.x - 20,
          y: centerConnectorPoint.y + 78,
        },
        centerConnectorPoint
      ),
      opacity: 0.15,
      strokeWidth: 2,
      dotCount: 2,
      dotSpeed: 0.000033,
      dotOffset: 0.46,
    },
    {
      id: "connector-right",
      d: createCubicPath(
        { x: 1075, y: 750 },
        { x: 1022, y: 675 },
        {
          x: rightConnectorPoint.x + 45,
          y: rightConnectorPoint.y + 74,
        },
        rightConnectorPoint
      ),
      opacity: 0.17,
      strokeWidth: 2.1,
      dotCount: 2,
      dotSpeed: 0.000037,
      dotOffset: 0.72,
    },
  ];
}

export default function OrbitCarousel({
  people = [],
  initialIndex = 0,
}: OrbitCarouselProps) {
  const personCount = people.length;

  const [activeIndex, setActiveIndex] = useState(
    () => clampIndex(initialIndex, personCount || 1)
  );

  const [gridDots, setGridDots] = useState<
    Record<string, Point[]>
  >({});

  const gridPathRefs = useRef<
    Record<string, SVGPathElement | null>
  >({});

  const animationFrameRef = useRef<number | null>(
    null
  );

  const generatedId = useId().replace(/:/g, "");
  const orbitGlowId = `orbit-glow-${generatedId}`;
  const dotGlowId = `dot-glow-${generatedId}`;
  const backgroundLeftId = `background-left-${generatedId}`;
  const backgroundRightId = `background-right-${generatedId}`;

  const gridLines = useMemo(
    () => buildGridLines(),
    []
  );

  useEffect(() => {
    setActiveIndex((currentIndex) =>
      clampIndex(currentIndex, personCount || 1)
    );
  }, [personCount]);

  const goPrevious = useCallback(() => {
    setActiveIndex((currentIndex) =>
      clampIndex(currentIndex - 1, personCount)
    );
  }, [personCount]);

  const goNext = useCallback(() => {
    setActiveIndex((currentIndex) =>
      clampIndex(currentIndex + 1, personCount)
    );
  }, [personCount]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        goPrevious();
      }

      if (event.key === "ArrowRight") {
        goNext();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [goNext, goPrevious]);

  useEffect(() => {
    function animateDots(timestamp: number) {
      const nextDots: Record<string, Point[]> = {};

      for (const line of gridLines) {
        const path = gridPathRefs.current[line.id];

        if (!path || line.dotCount <= 0) {
          continue;
        }

        const pathLength = path.getTotalLength();

        nextDots[line.id] = Array.from(
          { length: line.dotCount },
          (_, dotIndex) => {
            const spacing = 1 / line.dotCount;

            const progress =
              (
                timestamp * line.dotSpeed +
                line.dotOffset +
                dotIndex * spacing
              ) % 1;

            const point = path.getPointAtLength(
              pathLength * progress
            );

            return {
              x: point.x,
              y: point.y,
            };
          }
        );
      }

      setGridDots(nextDots);

      animationFrameRef.current =
        requestAnimationFrame(animateDots);
    }

    animationFrameRef.current =
      requestAnimationFrame(animateDots);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      animationFrameRef.current = null;
    };
  }, [gridLines]);

  const positionedPeople = useMemo<
    PositionedPerson[]
  >(() => {
    return people.map((person, personIndex) => {
      const distance = getCircularDistance(
        personIndex,
        activeIndex,
        personCount
      );

      const progress = 0.5 + distance * 0.265;
      const point = getOrbitPoint(progress);

      const isActive = distance === 0;
      const isNeighbor = Math.abs(distance) === 1;
      const isOuter = Math.abs(distance) === 2;

      let scale = 0.52;
      let opacity = 0;

      if (isActive) {
        scale = 1;
        opacity = 1;
      } else if (isNeighbor) {
        scale = 0.66;
        opacity = 0.96;
      } else if (isOuter) {
        scale = 0.61;
        opacity = 0.86;
      }

      return {
        person,
        personIndex,
        distance,
        point,
        scale,
        opacity,
        isActive,
        isVisible: Math.abs(distance) <= 2,
      };
    });
  }, [activeIndex, people, personCount]);

  const activePerson = people[activeIndex];

  if (!activePerson || personCount === 0) {
    return (
      <div className="rounded-[28px] border border-black/5 bg-white p-8 shadow-[0_25px_60px_rgba(0,0,0,0.12)] sm:rounded-[44px] sm:p-10">
        <div className="font-calsans text-xl font-bold text-black/80">
          No team members yet
        </div>

        <div className="mt-1 font-mono text-sm text-black/50">
          Pass people into OrbitCarousel.
        </div>
      </div>
    );
  }

  return (
    <section
      aria-label="Team member carousel"
      className={[
        "relative isolate w-full overflow-hidden",
        "h-[540px] sm:h-auto sm:aspect-[12/7]",
        "rounded-[28px] sm:rounded-[44px]",
        "bg-gradient-to-br from-[#3685ff] to-[#275bff]",
        "shadow-[0_25px_60px_rgba(0,0,0,0.15)]",
      ].join(" ")}
    >
      {/*
       * Grid, orbit, dots, and profile photos all use this same
       * responsive SVG coordinate system.
       *
       * On phones, slice crops the far-left and far-right parts
       * instead of shrinking the entire design.
       */}
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 z-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient
            id={backgroundLeftId}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(235 185) rotate(20) scale(540 260)"
          >
            <stop
              stopColor="white"
              stopOpacity="0.16"
            />

            <stop
              offset="1"
              stopColor="white"
              stopOpacity="0"
            />
          </radialGradient>

          <radialGradient
            id={backgroundRightId}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(920 170) rotate(-12) scale(540 255)"
          >
            <stop
              stopColor="white"
              stopOpacity="0.12"
            />

            <stop
              offset="1"
              stopColor="white"
              stopOpacity="0"
            />
          </radialGradient>

          <filter
            id={orbitGlowId}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur
              stdDeviation="4"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id={dotGlowId}
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur
              stdDeviation="2"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {people.map((person) => (
            <clipPath
              key={person.id}
              id={`profile-clip-${generatedId}-${person.id}`}
            >
              <circle cx="0" cy="0" r="76" />
            </clipPath>
          ))}
        </defs>

        <rect
          width={VIEWBOX_WIDTH}
          height={VIEWBOX_HEIGHT}
          fill={`url(#${backgroundLeftId})`}
        />

        <rect
          width={VIEWBOX_WIDTH}
          height={VIEWBOX_HEIGHT}
          fill={`url(#${backgroundRightId})`}
        />

        {/* Thin globe lines */}
        <g>
          {gridLines.map((line) => (
            <path
              key={line.id}
              ref={(element) => {
                gridPathRefs.current[line.id] =
                  element;
              }}
              d={line.d}
              stroke="white"
              strokeOpacity={line.opacity}
              strokeWidth={line.strokeWidth}
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* Moving dots appear only on thin grid lines */}
        <g filter={`url(#${dotGlowId})`}>
          {gridLines.flatMap((line) => {
            const dots = gridDots[line.id] ?? [];

            return dots.map(
              (dot, dotIndex) => (
                <circle
                  key={`${line.id}-${dotIndex}`}
                  cx={dot.x}
                  cy={dot.y}
                  r={
                    dotIndex % 2 === 0
                      ? 5
                      : 3.8
                  }
                  fill="white"
                  fillOpacity="0.95"
                />
              )
            );
          })}
        </g>

        {/*
         * Drawn after the connectors so their endpoints disappear
         * cleanly beneath the glowing white line.
         */}
        <path
          d={getOrbitPath()}
          stroke="white"
          strokeOpacity="0.98"
          strokeWidth="7"
          strokeLinecap="round"
          filter={`url(#${orbitGlowId})`}
        />

        {/* Profile photos remain attached to the orbit */}
        <g>
          {positionedPeople.map((profile) => (
            <g
              key={profile.person.id}
              className={
                profile.isVisible
                  ? "cursor-pointer"
                  : "pointer-events-none"
              }
              onClick={() => {
                if (profile.isVisible) {
                  setActiveIndex(
                    profile.personIndex
                  );
                }
              }}
              style={{
                transform: `translate(${profile.point.x.toFixed(4)}px, ${profile.point.y.toFixed(4)}px) scale(${profile.scale})`, transformOrigin: "0 0",
                opacity: profile.opacity,
                transition:
                  "transform 700ms cubic-bezier(.22,.61,.36,1), opacity 500ms ease",
              }}
            >
              <circle
                cx="0"
                cy="0"
                r="94"
                fill="white"
                fillOpacity="0.07"
              />

              <circle
                cx="0"
                cy="0"
                r="85"
                fill="#dce8ff"
              />

              <image
                href={profile.person.imageUrl}
                x="-76"
                y="-76"
                width="152"
                height="152"
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#profile-clip-${generatedId}-${profile.person.id})`}
              />

              <circle
                cx="0"
                cy="0"
                r="79"
                fill="none"
                stroke="white"
                strokeOpacity="0.94"
                strokeWidth="6"
              />

              <circle
                cx="0"
                cy="0"
                r="88"
                fill="none"
                stroke="white"
                strokeOpacity="0.07"
                strokeWidth="10"
              />
            </g>
          ))}
        </g>
      </svg>

      {/* Heading */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-6 sm:p-12">
        <div className="min-w-0 pr-4">
          <div className="font-mono text-[10px] font-semibold tracking-[0.3em] text-white/80 sm:text-xs sm:tracking-[0.35em]">
            {(activePerson.org ?? "ACM").toUpperCase()}
          </div>

          <div className="mt-2 max-w-[230px] font-calsans text-2xl font-black leading-none text-white sm:max-w-none sm:text-4xl">
            {activePerson.name}
          </div>

          {activePerson.role ? (
            <div className="mt-2 max-w-[230px] font-mono text-xs font-semibold text-white/80 sm:max-w-none sm:text-sm">
              {activePerson.role}
            </div>
          ) : null}
        </div>

        <div className="shrink-0 text-center">
          <div className="font-mono text-[10px] font-semibold tracking-[0.3em] text-white/80 sm:text-xs sm:tracking-[0.35em]">
            PEOPLE
          </div>

          <div className="mt-1 font-calsans text-3xl font-black text-white sm:text-4xl">
            {personCount}
          </div>
        </div>
      </div>

      {/* Previous */}
      <button
        type="button"
        onClick={goPrevious}
        className="absolute left-3 top-1/2 z-40 -translate-y-1/2 rounded-2xl bg-white/10 px-3 py-2 text-3xl leading-none text-white/90 backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-8 sm:px-4 sm:py-3"
        aria-label="Previous person"
      >
        ‹
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={goNext}
        className="absolute right-3 top-1/2 z-40 -translate-y-1/2 rounded-2xl bg-white/10 px-3 py-2 text-3xl leading-none text-white/90 backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-8 sm:px-4 sm:py-3"
        aria-label="Next person"
      >
        ›
      </button>

      {/* Active-person card */}
      <div
        className={[
          "absolute bottom-4 left-1/2 z-50",
          "w-[calc(100%-2rem)] max-w-[420px]",
          "-translate-x-1/2",
          "rounded-[20px] bg-white/10",
          "px-4 py-4 text-center backdrop-blur-md",
          "sm:bottom-8 sm:rounded-[22px] sm:px-10 sm:py-6",
        ].join(" ")}
      >
        <div className="font-calsans text-lg font-black text-white sm:text-xl">
          {activePerson.name}
        </div>

        {activePerson.role ? (
          <div className="mt-1 font-mono text-xs font-semibold text-white/80 sm:text-sm">
            {activePerson.role}
          </div>
        ) : null}

        <SocialLinks
          socials={activePerson.socials}
        />
      </div>
    </section>
  );
}

function normalizeUrl(url: string) {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `https://${url}`;
}

function SocialLinks({
  socials,
}: {
  socials?: OrbitPerson["socials"];
}) {
  const socialItems = [
    socials?.linkedin
      ? {
        key: "linkedin",
        href: socials.linkedin,
        label: "in",
      }
      : null,
    socials?.github
      ? {
        key: "github",
        href: socials.github,
        label: "gh",
      }
      : null,
    socials?.instagram
      ? {
        key: "instagram",
        href: socials.instagram,
        label: "ig",
      }
      : null,
    socials?.website
      ? {
        key: "website",
        href: socials.website,
        label: "web",
      }
      : null,
  ].filter(
    (
      item
    ): item is {
      key: string;
      href: string;
      label: string;
    } => item !== null
  );

  if (socialItems.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 flex items-center justify-center gap-2.5">
      {socialItems.map((item) => (
        <a
          key={item.key}
          href={normalizeUrl(item.href)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 font-mono text-xs font-bold text-white/90 ring-1 ring-white/15 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label={item.key}
          title={item.key}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}