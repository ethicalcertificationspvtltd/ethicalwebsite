/**
 * Existing project videos.
 * Original files (exact names, U+2026 ellipsis) live in /app and
 * public/assets/videos. ASCII-safe copies are used for reliable HTTP serving.
 */
export const VIDEO_FILES = {
  /** Video 1 — industrial inspection / precision */
  inspection: {
    original: "Inspector_examining_industrial_m…_202608261528.mp4",
    /** Dense-keyframe encode for smooth scroll scrubbing */
    src: "/videos/inspection-precision-scrub.mp4",
  },
  /** Video 2 — auditor / certification trust */
  trust: {
    original: "Auditor_reviewing_document_in_of…_202608261528.mp4",
    src: "/videos/certification-trust-scrub.mp4",
  },
} as const;
