"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Props = {
  src: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Accessible label for the video */
  ariaLabel: string;
  /** Extra copy shown beside / under the frame (text is the a11y source of truth) */
  aside?: ReactNode;
  className?: string;
  /** Desktop scroll track height in vh */
  trackVhDesktop?: number;
  /** Mobile scroll track height in vh */
  trackVhMobile?: number;
};

/** ~24fps frame step — skip micro-seeks that cause decode thrash */
const FRAME = 1 / 24;

/**
 * Sticky scroll-scrubbed video.
 * Seeks only after the previous seek settles (seeked), and quantizes to frames
 * so Lenis/Framer scroll updates don't flood the decoder.
 */
export function ScrollScrubVideo({
  src,
  eyebrow,
  title,
  description,
  ariaLabel,
  aside,
  className,
  trackVhDesktop = 180,
  trackVhMobile = 130,
}: Props) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const targetRef = useRef(0);
  const seekingRef = useRef(false);
  const primedRef = useRef(false);
  const activeRef = useRef(false);
  const rafRef = useRef(0);

  const [ready, setReady] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const sync = () => setIsCoarse(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Only decode / scrub while near viewport
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const on = Boolean(entry?.isIntersecting);
        activeRef.current = on;
        setActive(on);
        if (!on) {
          const v = videoRef.current;
          if (v && !v.paused) v.pause();
        }
      },
      { rootMargin: "40% 0px", threshold: 0.01 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const trackVh = isCoarse ? trackVhMobile : trackVhDesktop;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
    { stiffness: 120, damping: 32, restDelta: 0.001 },
  );

  const applySeek = useCallback(() => {
    const video = videoRef.current;
    const duration = durationRef.current;
    if (!video || !duration || seekingRef.current) return;
    if (!activeRef.current && !reduce) return;

    let next = targetRef.current;
    // Quantize to frame boundaries for cheaper keyframe hits
    next = Math.round(next / FRAME) * FRAME;
    next = Math.min(Math.max(next, 0), Math.max(duration - FRAME, 0));

    if (Math.abs(video.currentTime - next) < FRAME * 0.75) return;

    seekingRef.current = true;
    try {
      if (typeof video.fastSeek === "function") {
        video.fastSeek(next);
      } else {
        video.currentTime = next;
      }
    } catch {
      seekingRef.current = false;
    }
  }, [reduce]);

  const scheduleSeek = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      applySeek();
    });
  }, [applySeek]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onSeeked = () => {
      seekingRef.current = false;
      // If scroll moved further while we were seeking, catch up once
      scheduleSeek();
    };
    const onSeeking = () => {
      seekingRef.current = true;
    };

    video.addEventListener("seeked", onSeeked);
    video.addEventListener("seeking", onSeeking);
    return () => {
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("seeking", onSeeking);
    };
  }, [scheduleSeek, ready]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reduce) return;
    // Mobile / coarse: lighter — only scrub when section is active
    if (isCoarse && !activeRef.current) return;

    const duration = durationRef.current;
    if (!duration) return;

    targetRef.current = Math.min(Math.max(progress, 0), 1) * duration;
    scheduleSeek();
  });

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const syncDuration = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const d = video.duration;
    if (Number.isFinite(d) && d > 0) {
      durationRef.current = d;
      setReady(true);
      targetRef.current = scrollYProgress.get() * d;
      scheduleSeek();
    }
  }, [scrollYProgress, scheduleSeek]);

  const primeSeek = useCallback(async () => {
    const video = videoRef.current;
    if (!video || primedRef.current) return;
    try {
      video.muted = true;
      video.playsInline = true;
      await video.play();
      video.pause();
      primedRef.current = true;
      syncDuration();
    } catch {
      syncDuration();
    }
  }, [syncDuration]);

  useEffect(() => {
    if (reduce || !active) return;
    void primeSeek();
  }, [reduce, active, primeSeek]);

  const frame = (
    <div className="media-frame relative aspect-[16/11] w-full overflow-hidden sm:aspect-[16/10]">
      <video
        ref={videoRef}
        className="h-full w-full object-cover [transform:translateZ(0)] will-change-[opacity]"
        src={src}
        muted
        playsInline
        // Only fully buffer when section is near — otherwise metadata
        preload={active ? "auto" : "metadata"}
        controls={false}
        disablePictureInPicture
        aria-label={ariaLabel}
        onLoadedMetadata={syncDuration}
        onLoadedData={() => {
          void primeSeek();
        }}
        onCanPlay={syncDuration}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-primary-soft/20" />
      {!ready ? (
        <div className="pointer-events-none absolute inset-0 animate-pulse bg-primary/5" aria-hidden />
      ) : null}
    </div>
  );

  if (reduce || isCoarse) {
    return (
      <section
        ref={containerRef}
        className={cn("relative overflow-x-clip bg-background py-16 md:py-28", className)}
      >
        <div className="container-premium">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <div className="mt-10">{frame}</div>
          {aside ? <div className="mt-8 max-w-2xl text-muted">{aside}</div> : null}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className={cn("relative bg-background", className)}
      style={{ height: `${trackVh}vh` }}
      aria-label={title}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 tech-grid opacity-25" />
        <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

        <div className="container-premium relative z-10 grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
          <div className="order-2 lg:order-1">
            <SectionHeading eyebrow={eyebrow} title={title} description={description} />
            {aside ? (
              <div className="mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
                {aside}
              </div>
            ) : null}
            <div className="mt-8 hidden w-44 md:block">
              <p className="brand-pill mb-2">Scroll</p>
              <div className="h-1 overflow-hidden rounded-full bg-primary/10">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  style={{ width: progressWidth }}
                />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            {frame}
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-primary/10 md:hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                style={{ width: progressWidth }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
