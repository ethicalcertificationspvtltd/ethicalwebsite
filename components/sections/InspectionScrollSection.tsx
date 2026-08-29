"use client";

import { ScrollScrubVideo } from "@/components/ui/ScrollScrubVideo";
import { VIDEO_FILES } from "@/lib/videos";

/**
 * Video 1 — industrial inspection / precision / calibration storytelling.
 * Placed after Services on the homepage.
 */
export function InspectionScrollSection() {
  return (
    <ScrollScrubVideo
      src={VIDEO_FILES.inspection.src}
      eyebrow="Precision"
      title="Inspection & calibration with industrial rigor"
      description="Independent third-party inspection and calibration practices that verify capacity, reduce risk, and support quality outcomes across industrial environments."
      ariaLabel="Inspector examining industrial machinery — scroll-driven animation"
      aside={
        <p>
          From lifting equipment and earthmoving machinery to laboratory calibration, Ethical
          Certifications pairs field expertise with disciplined procedure — so every check stays
          traceable, ethical, and fit for purpose.
        </p>
      }
      trackVhDesktop={180}
      trackVhMobile={130}
    />
  );
}
