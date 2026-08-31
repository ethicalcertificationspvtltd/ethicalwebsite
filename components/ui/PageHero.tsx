"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  dark?: boolean;
}) {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative overflow-hidden pt-36 pb-16 md:pt-40 md:pb-20 gradient-mesh">
      <div className="pointer-events-none absolute inset-0 surface-grid opacity-50" />
      <div className="pointer-events-none absolute -right-16 top-20 h-64 w-64 rounded-full bg-primary/12 blur-3xl" />
      <div className="container-premium relative z-10">
        {breadcrumbs ? (
          <motion.nav
            aria-label="Breadcrumb"
            className="mb-6 text-sm text-muted"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            <ol className="flex flex-wrap items-center gap-2 opacity-70">
              {breadcrumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 ? <span>/</span> : null}
                  {c.href ? (
                    <Link href={c.href} className="transition hover:text-primary">
                      {c.label}
                    </Link>
                  ) : (
                    <span>{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        ) : null}
        {eyebrow ? (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease }}
            className="brand-pill mb-4"
          >
            {eyebrow}
          </motion.p>
        ) : null}
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease }}
          className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-foreground md:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {description ? (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.14, ease }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
          >
            {description}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
