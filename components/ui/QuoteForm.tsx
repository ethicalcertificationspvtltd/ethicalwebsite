"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import { certifications } from "@/data/certifications";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const fieldClass =
  "h-12 w-full rounded-xl border border-primary/20 bg-white px-4 text-sm text-primary outline-none transition duration-300 placeholder:text-primary/40 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,89,83,0.08)]";

export function QuoteForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setStatus("success");
      setMessage(data.message || "Thank you. Your inquiry has been received.");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please email info@etcert.com.",
      );
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "space-y-4 rounded-3xl border border-border/90 bg-card p-6 shadow-[0_24px_60px_rgba(11,18,16,0.06)] md:p-8",
        className,
      )}
      noValidate
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
        <Field label="Company" name="company" autoComplete="organization" />
      </div>

      <div>
        <label htmlFor="service" className="mb-2 block text-sm font-medium text-foreground">
          Service / Certification
        </label>
        <select
          id="service"
          name="service"
          required
          className={fieldClass}
          defaultValue=""
        >
          <option value="" disabled>
            Select an option
          </option>
          <optgroup label="Services">
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </optgroup>
          <optgroup label="Certifications">
            {certifications.map((c) => (
              <option key={c.slug} value={`${c.code}${c.year ? `:${c.year}` : ""}`}>
                {c.code}
                {c.year ? `:${c.year}` : ""} — {c.title}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm text-primary outline-none transition duration-300 placeholder:text-primary/40 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,89,83,0.08)]"
          placeholder="Tell us about your certification or inspection needs"
        />
      </div>

      <Button type="submit" disabled={status === "loading"} className="w-full md:w-auto">
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Send Inquiry"
        )}
      </Button>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.p
            key="ok"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-2 rounded-xl bg-primary/8 px-4 py-3 text-sm text-primary"
            role="status"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            {message}
          </motion.p>
        ) : null}
        {status === "error" ? (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger"
            role="alert"
          >
            {message}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className={fieldClass}
      />
    </div>
  );
}
