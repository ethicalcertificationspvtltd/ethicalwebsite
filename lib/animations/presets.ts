import { gsap } from "@/lib/gsap/config";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CARD_STAGGER,
  DEFAULT_DURATION,
  EASE,
  SCROLL_START,
} from "./constants";

type ScrollOpts = {
  trigger?: gsap.TweenTarget;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  once?: boolean;
  delay?: number;
  duration?: number;
  stagger?: number;
  markers?: boolean;
};

function scrollTriggerConfig(
  target: gsap.TweenTarget,
  opts: ScrollOpts,
): ScrollTrigger.Vars {
  const { trigger, start = SCROLL_START, end, scrub, once = true, markers } = opts;
  return {
    trigger: (trigger ?? target) as Element,
    start,
    end,
    scrub,
    markers,
    toggleActions: once ? "play none none none" : "play none none reverse",
  };
}

export function fadeUp(target: gsap.TweenTarget, opts: ScrollOpts = {}) {
  const { delay = 0, duration = DEFAULT_DURATION } = opts;
  return gsap.fromTo(
    target,
    { opacity: 0, y: 48 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: EASE.out,
      scrollTrigger: scrollTriggerConfig(target, opts),
    },
  );
}

export function fadeIn(target: gsap.TweenTarget, opts: ScrollOpts = {}) {
  const { delay = 0, duration = 0.6 } = opts;
  return gsap.fromTo(
    target,
    { opacity: 0 },
    {
      opacity: 1,
      duration,
      delay,
      ease: EASE.out,
      scrollTrigger: scrollTriggerConfig(target, opts),
    },
  );
}

export function scaleIn(target: gsap.TweenTarget, opts: ScrollOpts = {}) {
  const { delay = 0, duration = 0.7 } = opts;
  return gsap.fromTo(
    target,
    { opacity: 0, scale: 0.92 },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: EASE.cinematic,
      scrollTrigger: scrollTriggerConfig(target, opts),
    },
  );
}

export function slideIn(
  target: gsap.TweenTarget,
  direction: "left" | "right" = "left",
  opts: ScrollOpts = {},
) {
  const { delay = 0, duration = DEFAULT_DURATION } = opts;
  const x = direction === "left" ? -48 : 48;
  return gsap.fromTo(
    target,
    { opacity: 0, x },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: EASE.out,
      scrollTrigger: scrollTriggerConfig(target, opts),
    },
  );
}

export function depthReveal(target: gsap.TweenTarget, opts: ScrollOpts = {}) {
  const { delay = 0, duration = 0.8, stagger = 0 } = opts;
  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: 80,
      rotateX: 10,
      transformPerspective: 900,
      transformOrigin: "center bottom",
    },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration,
      delay,
      stagger,
      ease: EASE.cinematic,
      scrollTrigger: scrollTriggerConfig(target, opts),
    },
  );
}

export function staggerCards(
  container: Element,
  selector: string,
  opts: ScrollOpts = {},
) {
  const items = container.querySelectorAll(selector);
  if (!items.length) return;
  return depthReveal(items, {
    ...opts,
    trigger: container,
    stagger: opts.stagger ?? CARD_STAGGER,
  });
}

export function textReveal(target: gsap.TweenTarget, opts: ScrollOpts = {}) {
  const { delay = 0, duration = 0.85 } = opts;
  return gsap.fromTo(
    target,
    { opacity: 0, y: 60, clipPath: "inset(100% 0% 0% 0%)" },
    {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      duration,
      delay,
      ease: EASE.cinematic,
      scrollTrigger: scrollTriggerConfig(target, opts),
    },
  );
}

export function parallax(
  target: gsap.TweenTarget,
  yPercent: number,
  opts: ScrollOpts & { scrub?: boolean | number } = {},
) {
  return gsap.to(target, {
    yPercent,
    ease: "none",
    scrollTrigger: {
      trigger: (opts.trigger ?? target) as Element,
      start: opts.start ?? "top bottom",
      end: opts.end ?? "bottom top",
      scrub: opts.scrub ?? 1.2,
    },
  });
}

export function imageReveal(
  container: Element,
  image?: Element | null,
  opts: ScrollOpts = {},
) {
  const img = image ?? container.querySelector("img");
  const tl = gsap.timeline({
    scrollTrigger: scrollTriggerConfig(container, opts),
  });
  tl.fromTo(
    container,
    { clipPath: "inset(0 100% 0 0)", opacity: 0.85 },
    { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.9, ease: EASE.cinematic },
  );
  if (img) {
    tl.fromTo(
      img,
      { scale: 1.12 },
      { scale: 1, duration: 1.1, ease: EASE.out },
      0,
    );
  }
  return tl;
}

export function cardInnerTimeline(container: Element, opts: ScrollOpts = {}) {
  const icon = container.querySelector('[data-reveal="icon"]');
  const number = container.querySelector('[data-reveal="number"]');
  const title = container.querySelector('[data-reveal="title"]');
  const body = container.querySelector('[data-reveal="body"]');
  const eyebrow = container.querySelector('[data-reveal="eyebrow"]');
  const cta = container.querySelector('[data-reveal="cta"]');

  const targets = [icon, number, eyebrow, title, body, cta].filter(Boolean);
  if (!targets.length) return;

  gsap.set(targets, { opacity: 0 });

  if (icon) gsap.set(icon, { scale: 0.5, y: 20 });
  if (number) gsap.set(number, { scale: 0.7, y: 16 });
  if (eyebrow) gsap.set(eyebrow, { y: 12 });
  if (title) gsap.set(title, { y: 25 });
  if (body) gsap.set(body, { y: 18 });
  if (cta) gsap.set(cta, { x: -20, opacity: 0 });

  const tl = gsap.timeline({
    scrollTrigger: scrollTriggerConfig(container, opts),
    delay: opts.delay ?? 0,
  });

  if (icon) {
    tl.to(icon, { scale: 1, opacity: 1, y: 0, duration: 0.55, ease: EASE.snap });
  }
  if (number) {
    tl.to(number, { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: EASE.snap }, icon ? "-=0.25" : 0);
  }
  if (eyebrow) {
    tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.4, ease: EASE.out }, "-=0.15");
  }
  if (title) {
    tl.to(title, { opacity: 1, y: 0, duration: 0.48, ease: EASE.out }, "-=0.2");
  }
  if (body) {
    tl.to(body, { opacity: 1, y: 0, duration: 0.45, ease: EASE.out }, "-=0.15");
  }
  if (cta) {
    tl.to(cta, { opacity: 1, x: 0, duration: 0.42, ease: EASE.out }, "-=0.1");
  }

  return tl;
}

export function counterAnimation(
  el: Element,
  value: number,
  opts: ScrollOpts & { suffix?: string } = {},
) {
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: value,
    duration: opts.duration ?? 1.8,
    delay: opts.delay ?? 0,
    ease: "power2.out",
    scrollTrigger: scrollTriggerConfig(el, opts),
    onUpdate: () => {
      el.textContent = `${Math.round(obj.val)}${opts.suffix ?? ""}`;
    },
  });
}

export function sectionHeadingReveal(
  container: Element,
  opts: ScrollOpts = {},
) {
  const eyebrow = container.querySelector("[data-heading-eyebrow]");
  const title = container.querySelector("[data-heading-title]");
  const desc = container.querySelector("[data-heading-desc]");

  const tl = gsap.timeline({
    scrollTrigger: scrollTriggerConfig(container, opts),
    delay: opts.delay ?? 0,
  });

  if (eyebrow) {
    tl.fromTo(
      eyebrow,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: EASE.out },
    );
  }
  if (title) {
    tl.fromTo(
      title,
      { opacity: 0, y: 48, clipPath: "inset(100% 0% 0% 0%)" },
      {
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.75,
        ease: EASE.cinematic,
      },
      eyebrow ? "-=0.1" : 0,
    );
  }
  if (desc) {
    tl.fromTo(
      desc,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55, ease: EASE.out },
      "-=0.35",
    );
  }

  return tl;
}
