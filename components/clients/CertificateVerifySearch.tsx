"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type Tab = "iso" | "inspection";
type Status = "idle" | "loading" | "done" | "error";

const fieldClass =
  "h-12 w-full rounded-xl border border-primary/20 bg-white px-4 text-sm text-primary outline-none transition duration-300 placeholder:text-primary/40 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,89,83,0.12)]";

export function CertificateVerifySearch() {
  const [tab, setTab] = useState<Tab>("iso");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const certificateNumber = query.trim();
    if (!certificateNumber) {
      setStatus("error");
      setMessage("Please enter a certificate number.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          certificateNumber,
          type: tab,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification request failed");
      setStatus("done");
      setMessage(data.message as string);
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : `Unable to submit. Please email ${siteConfig.email}.`,
      );
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-[0_20px_50px_rgba(26,37,22,0.06)] md:p-8">
      <div className="mb-6 flex flex-wrap gap-2">
        <TabButton active={tab === "iso"} onClick={() => setTab("iso")}>
          ISO certification verification
        </TabButton>
        <TabButton active={tab === "inspection"} onClick={() => setTab("inspection")}>
          Inspection certification verification
        </TabButton>
      </div>

      <form onSubmit={onSearch} className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="certificate-number">
          Certificate number
        </label>
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id="certificate-number"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (status !== "idle") {
                setStatus("idle");
                setMessage("");
              }
            }}
            className={cn(fieldClass, "pl-10")}
            placeholder="Enter certificate number"
            autoComplete="off"
          />
        </div>
        <Button type="submit" disabled={status === "loading"} className="neu-btn shrink-0">
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Searching…
            </>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              Verify
            </>
          )}
        </Button>
      </form>

      <AnimatePresence mode="wait">
        {message ? (
          <motion.div
            key={status + message}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={cn(
              "mt-5 rounded-2xl px-4 py-3 text-sm leading-relaxed",
              status === "error"
                ? "bg-danger/10 text-danger"
                : "bg-primary/8 text-foreground",
            )}
          >
            {message}{" "}
            {status === "done" ? (
              <>
                You can also email a scanned copy to{" "}
                <a
                  className="font-semibold text-primary underline-offset-2 hover:underline"
                  href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
                    `Certificate verification — ${query.trim()}`,
                  )}`}
                >
                  {siteConfig.email}
                </a>
                .
              </>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-semibold transition",
        active
          ? "bg-primary text-white shadow-[0_10px_24px_rgba(0,89,83,0.28)]"
          : "border border-primary/20 bg-white text-primary/80 hover:border-primary/30 hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}
