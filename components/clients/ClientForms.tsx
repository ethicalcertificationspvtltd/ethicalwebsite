"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const fieldClass =
  "h-12 w-full rounded-xl border border-primary/20 bg-white px-4 text-sm text-primary outline-none transition duration-300 placeholder:text-primary/40 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,89,83,0.12)]";

const relationships = [
  "Certified Client",
  "Independent Individual",
  "Regulatory Authority",
  "Other",
] as const;

const natures = [
  "Complaint against Auditor",
  "Complaint against Certified Client",
  "Complaint against Certification Decision",
  "Service Quality Issue",
  "Other",
] as const;

export function ComplaintForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/complaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setStatus("success");
      setMessage(data.message || "Complaint received.");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
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
      <h3 className="font-display text-2xl tracking-tight">Complaint submission</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Company name" name="company" required />
        <Field label="Complainant name" name="complainant" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Date" name="date" type="date" />
      </div>
      <Field label="Address" name="address" required />
      <div className="grid gap-4 md:grid-cols-2">
        <SelectField label="Relationship to Ethical Certifications" name="relationship" required options={relationships} />
        <SelectField label="Nature of complaint" name="nature" required options={natures} />
      </div>
      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium">
          Detailed description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="w-full rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm text-primary outline-none transition placeholder:text-primary/40 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,89,83,0.12)]"
        />
      </div>
      <Button type="submit" disabled={status === "loading"} className="neu-btn">
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting…
          </>
        ) : (
          "Submit complaint"
        )}
      </Button>
      <StatusBanner status={status} message={message} />
    </form>
  );
}

export function FeedbackForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setStatus("success");
      setMessage(data.message || "Thank you for your feedback.");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
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
      <h3 className="font-display text-2xl tracking-tight">Feedback form</h3>
      <p className="text-sm leading-relaxed text-muted">
        Rating scale 1–5 (1 = Very Poor, 5 = Excellent). This form is for service evaluation only —
        not for complaints or appeals.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Company name" name="company" required />
        <Field label="Date" name="date" type="date" />
      </div>
      <Field label="Address" name="address" />
      <div className="grid gap-4 sm:grid-cols-2">
        <RatingField label="Auditor's professionalism" name="professionalism" />
        <RatingField label="Certification lead time" name="leadTime" />
        <RatingField label="Audit planning & coordination" name="coordination" />
        <RatingField label="Overall satisfaction" name="satisfaction" />
      </div>
      <div>
        <label htmlFor="comments" className="mb-2 block text-sm font-medium">
          Comments / suggestions
        </label>
        <textarea
          id="comments"
          name="comments"
          rows={4}
          className="w-full rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm text-primary outline-none transition placeholder:text-primary/40 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,89,83,0.12)]"
        />
      </div>
      <Button type="submit" disabled={status === "loading"} className="neu-btn">
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting…
          </>
        ) : (
          "Submit feedback"
        )}
      </Button>
      <StatusBanner status={status} message={message} />
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
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
        {required ? " *" : ""}
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

function SelectField({
  label,
  name,
  required,
  options,
}: {
  label: string;
  name: string;
  required?: boolean;
  options: readonly string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
        {required ? " *" : ""}
      </label>
      <select id={name} name={name} required={required} className={fieldClass} defaultValue="">
        <option value="" disabled>
          Select choice
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function RatingField({ label, name }: { label: string; name: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <select id={name} name={name} className={fieldClass} defaultValue="5">
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>
  );
}

function StatusBanner({ status, message }: { status: Status; message: string }) {
  if (!message) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex items-start gap-2 rounded-xl px-4 py-3 text-sm",
          status === "success" ? "bg-primary/8 text-primary" : "bg-danger/10 text-danger",
        )}
      >
        {status === "success" ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : null}
        <span>{message}</span>
      </motion.div>
    </AnimatePresence>
  );
}
