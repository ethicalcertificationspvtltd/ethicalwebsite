"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { CSSProperties } from "react";

type Tri = {
  x: number;
  y: number;
  size: number;
  rotate: number;
  fill: string;
  stroke: string;
  float?: boolean;
  delay?: number;
};

const triangles: Tri[] = [
  { x: 3, y: 8, size: 72, rotate: 15, fill: "rgba(255,255,255,0.14)", stroke: "rgba(255,255,255,0.38)", float: true },
  { x: 92, y: 6, size: 56, rotate: -20, fill: "rgba(255,255,255,0.1)", stroke: "rgba(255,255,255,0.32)", delay: 1 },
  { x: 8, y: 32, size: 44, rotate: 38, fill: "rgba(255,255,255,0.12)", stroke: "rgba(255,255,255,0.35)", float: true, delay: 0.5 },
  { x: 88, y: 28, size: 80, rotate: -10, fill: "rgba(255,255,255,0.11)", stroke: "rgba(255,255,255,0.3)", delay: 0.8 },
  { x: 5, y: 58, size: 52, rotate: -32, fill: "rgba(255,255,255,0.1)", stroke: "rgba(255,255,255,0.28)", float: true, delay: 1.5 },
  { x: 94, y: 52, size: 64, rotate: 25, fill: "rgba(255,255,255,0.12)", stroke: "rgba(255,255,255,0.34)", delay: 0.8 },
  { x: 12, y: 82, size: 48, rotate: 12, fill: "rgba(255,255,255,0.1)", stroke: "rgba(255,255,255,0.3)" },
  { x: 90, y: 78, size: 60, rotate: -42, fill: "rgba(255,255,255,0.11)", stroke: "rgba(255,255,255,0.32)", float: true },
  { x: 48, y: 18, size: 36, rotate: 55, fill: "rgba(255,255,255,0.1)", stroke: "rgba(255,255,255,0.28)", delay: 1.2 },
  { x: 72, y: 42, size: 40, rotate: -28, fill: "rgba(255,255,255,0.09)", stroke: "rgba(255,255,255,0.26)", float: true, delay: 0.3 },
  { x: 28, y: 48, size: 32, rotate: 20, fill: "rgba(255,255,255,0.1)", stroke: "rgba(255,255,255,0.3)" },
  { x: 55, y: 68, size: 46, rotate: -15, fill: "rgba(255,255,255,0.11)", stroke: "rgba(255,255,255,0.32)", float: true, delay: 0.7 },
  { x: 38, y: 88, size: 38, rotate: 30, fill: "rgba(255,255,255,0.09)", stroke: "rgba(255,255,255,0.28)" },
  { x: 65, y: 12, size: 34, rotate: -48, fill: "rgba(255,255,255,0.1)", stroke: "rgba(255,255,255,0.3)", delay: 1.8 },
  { x: 22, y: 72, size: 42, rotate: 8, fill: "rgba(255,255,255,0.09)", stroke: "rgba(255,255,255,0.26)", float: true, delay: 0.4 },
  { x: 78, y: 88, size: 50, rotate: -22, fill: "rgba(255,255,255,0.11)", stroke: "rgba(255,255,255,0.32)" },
];

function TriangleSvg({ tri }: { tri: Tri }) {
  const h = tri.size * 0.866;
  return (
    <svg
      width={tri.size}
      height={h}
      viewBox={`0 0 ${tri.size} ${h}`}
      className="overflow-visible"
      style={{ transform: `rotate(${tri.rotate}deg)` }}
    >
      <polygon
        points={`${tri.size / 2},0 0,${h} ${tri.size},${h}`}
        fill={tri.fill}
        stroke={tri.stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BackgroundTriangles() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const blurPx = useTransform(scrollY, [0, 200, 600, 1200], [0, 4, 10, 16]);
  const bgBlur = useMotionTemplate`blur(${blurPx}px)`;
  const fade = useTransform(scrollY, [0, 400, 1000], [1, 0.75, 0.5]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      style={reduce ? undefined : { filter: bgBlur, opacity: fade }}
    >
      {triangles.map((tri, i) => (
        <div
          key={i}
          className={!reduce && tri.float ? "absolute animate-triangle-float" : "absolute"}
          style={
            {
              left: `${tri.x}%`,
              top: `${tri.y}%`,
              animationDelay: tri.delay ? `${tri.delay}s` : undefined,
              ["--tri-rotate" as string]: `${tri.rotate}deg`,
            } as CSSProperties
          }
        >
          <TriangleSvg tri={tri} />
        </div>
      ))}
    </motion.div>
  );
}
