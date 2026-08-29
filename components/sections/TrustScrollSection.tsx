"use client";

import { ScrollScrubVideo } from "@/components/ui/ScrollScrubVideo";
import { siteConfig } from "@/lib/site";
import { VIDEO_FILES } from "@/lib/videos";

/**
 * Video 2 — auditor / certification trust / global recognition storytelling.
 * Placed after About on the homepage.
 */
export function TrustScrollSection() {
  return (
    <ScrollScrubVideo
      src={VIDEO_FILES.trust.src}
      eyebrow="Trusted worldwide"
      title="Certification recognized beyond borders"
      description={`Accredited by SAAC and PNAC on ${siteConfig.accreditationStandards.join(" & ")} — an IAF-recognized pathway that supports internationally accepted certification outcomes.`}
      ariaLabel="Auditor reviewing certification documents — scroll-driven animation"
      aside={
        <p>
          Global market access starts with credible certification. Our auditors bring multi-industry
          depth to every engagement, helping organizations demonstrate trust to clients, regulators,
          and partners worldwide.
        </p>
      }
      trackVhDesktop={180}
      trackVhMobile={130}
    />
  );
}
