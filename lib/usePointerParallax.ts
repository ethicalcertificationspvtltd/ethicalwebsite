"use client";

import { useEffect, useRef } from "react";

type Options = {
  maxShift?: number;
  maxTilt?: number;
  enabled?: boolean;
};

/**
 * GPU-friendly pointer parallax via CSS custom properties + rAF smoothing.
 * Sets on the ref element: --px, --py, --rx, --ry (all usable in CSS).
 */
export function usePointerParallax<T extends HTMLElement>({
  maxShift = 12,
  maxTilt = 6,
  enabled = true,
}: Options = {}) {
  const ref = useRef<T>(null);
  const target = useRef({ x: 0, y: 0, nx: 0, ny: 0 });
  const current = useRef({ x: 0, y: 0, nx: 0, ny: 0 });
  const raf = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      target.current = {
        x: nx * maxShift,
        y: ny * maxShift,
        nx,
        ny,
      };
    };

    const onLeave = () => {
      target.current = { x: 0, y: 0, nx: 0, ny: 0 };
    };

    const tick = () => {
      const t = 0.1;
      current.current.x += (target.current.x - current.current.x) * t;
      current.current.y += (target.current.y - current.current.y) * t;
      current.current.nx += (target.current.nx - current.current.nx) * t;
      current.current.ny += (target.current.ny - current.current.ny) * t;

      el.style.setProperty("--px", `${current.current.x.toFixed(2)}px`);
      el.style.setProperty("--py", `${current.current.y.toFixed(2)}px`);
      el.style.setProperty("--rx", `${(current.current.ny * -maxTilt).toFixed(3)}deg`);
      el.style.setProperty("--ry", `${(current.current.nx * maxTilt).toFixed(3)}deg`);
      el.style.setProperty("--glare-x", `${((current.current.nx + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty("--glare-y", `${((current.current.ny + 0.5) * 100).toFixed(1)}%`);

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf.current);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, maxShift, maxTilt]);

  return ref;
}
