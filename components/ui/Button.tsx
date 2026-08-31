"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef, useCallback } from "react";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  magnetic?: boolean;
};

const variants = {
  primary:
    "bg-primary !text-white shadow-[0_14px_36px_rgba(0,89,83,0.28)] hover:bg-primary-mid hover:shadow-[0_16px_40px_rgba(0,89,83,0.32)]",
  secondary:
    "bg-white !text-primary shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:bg-white/95",
  ghost: "bg-transparent !text-primary hover:bg-primary/8",
  outline:
    "bg-white border border-primary/25 !text-primary hover:border-primary hover:bg-[#f8fcfb] hover:shadow-[0_0_28px_rgba(0,89,83,0.08)]",
  white:
    "bg-white !text-primary shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:bg-white/95 hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)]",
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      href,
      variant = "primary",
      size = "md",
      className,
      children,
      type = "button",
      disabled,
      onClick,
      magnetic = true,
    },
    forwardedRef,
  ) {
    const reduce = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 240, damping: 18, mass: 0.35 });
    const sy = useSpring(y, { stiffness: 240, damping: 18, mass: 0.35 });

    const onMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (reduce) return;
        if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
          return;
        }
        const rect = e.currentTarget.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        if (magnetic) {
          x.set(Math.max(-8, Math.min(8, dx * 0.14)));
          y.set(Math.max(-8, Math.min(8, dy * 0.14)));
        }
        const target = e.currentTarget.querySelector<HTMLElement>("[data-btn-face]");
        if (target) {
          const inner = target.getBoundingClientRect();
          const px = ((e.clientX - inner.left) / inner.width) * 100;
          const py = ((e.clientY - inner.top) / inner.height) * 100;
          target.style.setProperty("--btn-x", `${px}%`);
          target.style.setProperty("--btn-y", `${py}%`);
        }
      },
      [magnetic, reduce, x, y],
    );

    const onLeave = useCallback(() => {
      x.set(0);
      y.set(0);
    }, [x, y]);

    const classes = cn(
      "btn-spotlight group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-wide transition-[background,color,box-shadow,border-color,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 hover:scale-[1.03] active:scale-[0.98]",
      variants[variant],
      sizes[size],
      className,
    );

    const content = (
      <>
        <span className="relative z-10 inline-flex items-center gap-2 [&_svg]:shrink-0">{children}</span>
        <span className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[120%]" />
      </>
    );

    return (
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ x: sx, y: sy }}
        className="inline-flex"
        whileTap={{ scale: 0.985 }}
      >
        {href ? (
          <Link
            href={href}
            className={classes}
            data-btn-face
            ref={forwardedRef as React.Ref<HTMLAnchorElement>}
            data-cursor="button"
          >
            {content}
          </Link>
        ) : (
          <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={classes}
            data-btn-face
            ref={forwardedRef as React.Ref<HTMLButtonElement>}
            data-cursor="button"
          >
            {content}
          </button>
        )}
      </motion.div>
    );
  },
);
