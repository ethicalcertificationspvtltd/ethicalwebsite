"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeadingScroll } from "@/components/animations/SectionHeadingScroll";
import { gsap, registerGsap } from "@/lib/gsap/config";
import { siteConfig } from "@/lib/site";

const AUTOPLAY_MS = 7000;

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const dragX = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function prev() {
    setDir(-1);
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }
  function next() {
    setDir(1);
    setIndex((i) => (i + 1) % testimonials.length);
  }

  useEffect(() => {
    if (reduce || paused) return;
    const timer = window.setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, reduce]);

  useEffect(() => {
    if (reduce || !sectionRef.current || !carouselRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, y: 48, rotateX: 8, transformPerspective: 1200 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  const prevIndex = (index - 1 + testimonials.length) % testimonials.length;
  const nextIndex = (index + 1) % testimonials.length;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-muted-bg/50 py-20 md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-30" />
      <div className="container-premium relative z-10">
        <SectionHeadingScroll
          eyebrow="Testimonials"
          title="What our customers say about us"
          description={`Rated ${siteConfig.rating.value} out of 5 based on client reviews published on the Ethical Certifications website.`}
          light={false}
        />

        <div ref={carouselRef} className="relative mt-12 perspective-[1400px]">
          <div className="pointer-events-none absolute left-1/2 top-8 h-64 w-[80%] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

          {!reduce && (
            <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
              <TestimonialStackCard
                item={testimonials[prevIndex]}
                position="prev"
                onClick={prev}
              />
              <TestimonialStackCard
                item={testimonials[nextIndex]}
                position="next"
                onClick={next}
              />
            </div>
          )}

          <AnimatePresence mode="wait" custom={dir}>
            <motion.article
              key={testimonials[index].id}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40, rotateY: dir * 8, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1, z: 0 }}
              exit={{ opacity: 0, x: dir * -30, rotateY: dir * -6, scale: 0.92 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                if (info.offset.x > 80) prev();
                else if (info.offset.x < -80) next();
              }}
              onTouchStart={(e) => {
                dragX.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                const dx = e.changedTouches[0].clientX - dragX.current;
                if (dx > 50) prev();
                if (dx < -50) next();
              }}
              className="surface-light relative z-10 mx-auto max-w-4xl cursor-grab active:cursor-grabbing rounded-3xl border border-border/90 bg-card/95 p-8 shadow-[0_30px_80px_rgba(11,18,16,0.08)] backdrop-blur-sm md:p-12"
              style={{ transformStyle: "preserve-3d" }}
            >
              <TestimonialContent item={testimonials[index]} index={index} />
            </motion.article>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              data-cursor="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition hover:border-primary/30 hover:text-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => {
                    setDir(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index ? "w-7 bg-primary" : "w-2.5 bg-border hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              data-cursor="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition hover:border-primary/30 hover:text-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialStackCard({
  item,
  position,
  onClick,
}: {
  item: (typeof testimonials)[number];
  position: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`pointer-events-auto absolute top-1/2 z-0 hidden w-[min(72%,36rem)] -translate-y-1/2 rounded-3xl border border-border/70 bg-white/70 p-8 opacity-45 shadow-lg backdrop-blur-sm transition hover:opacity-65 md:block md:p-10 ${
        position === "prev" ? "left-[2%] -rotate-2" : "right-[2%] rotate-2"
      }`}
      style={{ transform: `translateY(-50%) scale(0.92) ${position === "prev" ? "rotateY(8deg)" : "rotateY(-8deg)"}` }}
      aria-label={position === "prev" ? "Previous testimonial preview" : "Next testimonial preview"}
    >
      <p className="line-clamp-3 text-left font-display text-lg text-foreground/80">“{item.quote}”</p>
      <p className="mt-4 text-left text-sm font-semibold text-muted">{item.name}</p>
    </button>
  );
}

function TestimonialContent({
  item,
  index,
}: {
  item: (typeof testimonials)[number];
  index: number;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 12 },
          show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
        }}
        className="mb-5 flex gap-1 text-accent"
      >
        {Array.from({ length: item.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </motion.div>
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 16 },
          show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
        }}
        className="font-display text-2xl leading-relaxed text-foreground"
      >
        “{item.quote}”
      </motion.p>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 12 },
          show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
        }}
        className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-6"
      >
        <div>
          <p className="font-semibold text-foreground">{item.name}</p>
          <p className="text-sm text-muted">{item.company}</p>
        </div>
        <p className="font-display text-sm text-primary/40">
          {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
        </p>
      </motion.div>
    </motion.div>
  );
}
