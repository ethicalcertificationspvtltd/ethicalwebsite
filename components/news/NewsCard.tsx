"use client";

import Image from "next/image";
import { FlyText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";

type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  dateLabel: string;
  image: string;
};

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Reveal>
      <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_18px_40px_rgba(0,89,83,0.05)]">
        <Image
          src={item.image}
          alt={item.title}
          width={800}
          height={600}
          className="h-64 w-full object-cover"
        />
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {item.dateLabel}
          </p>
          <h2 className="mt-2 font-display text-2xl">
            <FlyText text={item.title} maxWords={8} block />
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{item.excerpt}</p>
        </div>
      </article>
    </Reveal>
  );
}
