"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const countries = [
  "Canada",
  "Pakistan",
  "UAE",
  "Bahrain",
  "Dubai",
  "United Kingdom",
];

const isoStandards = [
  "ISO 9001:2015",
  "ISO 14001:2015",
  "ISO 45001:2015",
  "ISO 22000:2018",
  "HACCP",
  "HALAL Certification",
  "ISO 41001:2018",
  "ISO 31000:2018",
  "ISO 22483:2020",
  "Other",
];

const fieldClass =
  "h-12 w-full rounded-xl border border-primary/20 bg-white px-4 text-sm text-primary outline-none transition duration-300 placeholder:text-primary/40 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,89,83,0.08)]";

const areaClass =
  "w-full rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm text-primary outline-none transition duration-300 placeholder:text-primary/40 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,89,83,0.08)]";

export function NewClientForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [standards, setStandards] = useState<string[]>([]);

  function toggleStandard(value: string) {
    setStandards((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = new FormData(e.currentTarget);
    const payload = {
      ...Object.fromEntries(form.entries()),
      standards,
    };

    try {
      const res = await fetch("/api/new-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setStatus("success");
      setMessage(data.message);
      e.currentTarget.reset();
      setStandards([]);
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
        "space-y-6 rounded-3xl border border-border/90 bg-card p-6 shadow-[0_24px_60px_rgba(11,18,16,0.06)] md:p-8",
        className,
      )}
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Country of Registration" name="country" required>
          <select id="country" name="country" required className={fieldClass} defaultValue="">
            <option value="" disabled>
              Select country
            </option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Client Name"
          name="clientName"
          hint="Exact business name as per legal registration (e.g. XYZ LLC / FZE / Pvt Limited)"
          required
        >
          <input id="clientName" name="clientName" required className={fieldClass} />
        </Field>

        <Field
          label="Legal Registration Number"
          name="registrationNumber"
          hint="UAE (TLN), Pakistan (NTN), Canada (BN)"
          required
        >
          <input id="registrationNumber" name="registrationNumber" required className={fieldClass} />
        </Field>

        <Field label="Number of Sites / Outsourced" name="sitesCount">
          <input id="sitesCount" name="sitesCount" className={fieldClass} />
        </Field>
      </div>

      <Field
        label="Address, Head Office, Sites"
        name="address"
        hint="If multiple sites: Head Office : … Site 1 : … Site 2 : …"
        required
      >
        <textarea id="address" name="address" rows={3} required className={areaClass} />
      </Field>

      <Field
        label="Scope of Business"
        name="scope"
        hint="Primary activities, e.g. Engineering Services, Cable Manufacturing, Pharmaceutical Production"
        required
      >
        <textarea id="scope" name="scope" rows={3} required className={areaClass} />
      </Field>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-foreground">
          Select ISO Standard Needed
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {isoStandards.map((standard) => (
            <label
              key={standard}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-primary/20 bg-white px-3 py-2.5 text-sm text-primary transition hover:border-primary/30"
            >
              <input
                type="checkbox"
                checked={standards.includes(standard)}
                onChange={() => toggleStandard(standard)}
                className="h-4 w-4 accent-[var(--primary)]"
              />
              {standard}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Permanent Employees Number"
          name="permanentEmployees"
          hint="Full-time staff with ongoing employment contracts"
        >
          <input id="permanentEmployees" name="permanentEmployees" type="number" min={0} className={fieldClass} />
        </Field>
        <Field
          label="Contractual Employees Number"
          name="contractualEmployees"
          hint="Fixed-term or outsourced manpower"
        >
          <input id="contractualEmployees" name="contractualEmployees" type="number" min={0} className={fieldClass} />
        </Field>
        <Field
          label="Part-Time Employees"
          name="partTimeEmployees"
          hint="Employees working less than full-time hours"
        >
          <input id="partTimeEmployees" name="partTimeEmployees" type="number" min={0} className={fieldClass} />
        </Field>
        <Field
          label="Similar Function Employees"
          name="similarFunctionEmployees"
          hint="Staff performing the same or similar functions"
        >
          <input id="similarFunctionEmployees" name="similarFunctionEmployees" type="number" min={0} className={fieldClass} />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <YesNo label="Previously certified?" name="previouslyCertified" />
        <YesNo label="Any outsourced processes?" name="outsourcedProcesses" />
        <YesNo label="System developed by external consultant?" name="externalConsultant" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Contact Number" name="phone" required>
          <input id="phone" name="phone" type="tel" required className={fieldClass} />
        </Field>
        <Field label="Website" name="website">
          <input id="website" name="website" type="url" placeholder="https://" className={fieldClass} />
        </Field>
        <Field label="Email" name="email" required>
          <input id="email" name="email" type="email" required className={fieldClass} />
        </Field>
        <Field label="Designation" name="designation">
          <input id="designation" name="designation" className={fieldClass} />
        </Field>
      </div>

      <Field
        label="Name of person applying for certification"
        name="applicantName"
        hint="By typing your complete name you confirm the above data is true."
        required
      >
        <input id="applicantName" name="applicantName" required className={fieldClass} />
      </Field>

      <Button type="submit" disabled={status === "loading"} size="lg">
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Applying…
          </>
        ) : (
          "Apply"
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
  hint,
  required,
  children,
}: {
  label: string;
  name: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-foreground">
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </label>
      {children}
      {hint ? <p className="mt-1.5 text-xs leading-relaxed text-muted">{hint}</p> : null}
    </div>
  );
}

function YesNo({ label, name }: { label: string; name: string }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-foreground">{label}</legend>
      <div className="flex gap-4">
        {["YES", "NO"].map((v) => (
          <label key={v} className="inline-flex items-center gap-2 text-sm">
            <input type="radio" name={name} value={v} className="accent-[var(--primary)]" />
            {v}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
