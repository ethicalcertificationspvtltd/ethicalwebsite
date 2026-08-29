"use client";

import { FlyText } from "@/components/ui/AnimatedText";
import { QuoteForm } from "@/components/ui/QuoteForm";

export function ContactQuoteBlock() {
  return (
    <div id="quote" className="scroll-mt-28">
      <h2 className="font-display text-3xl tracking-tight">
        <FlyText text="Get Free Quote" maxWords={4} block />
      </h2>
      <p className="mt-3 text-muted">
        Share your requirements and our team will respond. Email delivery can be connected later via the /api/quote integration.
      </p>
      <div className="mt-6">
        <QuoteForm />
      </div>
    </div>
  );
}
