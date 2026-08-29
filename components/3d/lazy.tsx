"use client";

import dynamic from "next/dynamic";
import { patchThreeConsoleWarnings } from "@/lib/three-console";

patchThreeConsoleWarnings();

export const ThreeHeroLazy = dynamic(
  () => import("@/components/3d/ThreeHero").then((m) => m.ThreeHero),
  {
    ssr: false,
    loading: () => (
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="h-40 w-40 animate-pulse rounded-full bg-primary/10" />
      </div>
    ),
  },
);

export const ThreeSealLazy = dynamic(
  () =>
    import("@/components/3d/ThreeCertificationSeal").then((m) => m.ThreeCertificationSeal),
  { ssr: false },
);
