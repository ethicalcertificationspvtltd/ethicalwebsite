"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Loader2, MapPin, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { certificateNumberValidationMessage } from "@/lib/certificate-verify";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "done" | "error";

type ClientResult = {
  id: string;
  companyName: string;
  address?: string;
  scope?: string;
  sector?: string;
  standards?: string;
  auditPhase?: string;
  certifyingBody?: string;
  certificateNumber?: string;
  issueDate?: string;
  expiryDate?: string;
  registryStatus?: string;
  status?: "active" | "suspended" | "expired";
};

function formatCertDate(value?: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function statusLabel(client: ClientResult): string {
  if (client.registryStatus?.trim()) return client.registryStatus.trim();
  if (client.status === "active") return "Active";
  if (client.status === "suspended") return "Suspended";
  return "Expired";
}

const fieldClass =
  "h-12 w-full rounded-xl border border-primary/20 bg-white px-4 text-sm text-primary outline-none transition duration-300 placeholder:text-primary/40 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,89,83,0.12)]";

export function CertificateVerifySearch() {
  const [certificateNumber, setCertificateNumber] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [results, setResults] = useState<ClientResult[]>([]);

  async function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const searchValue = certificateNumber.trim();
    const validationError = certificateNumberValidationMessage(searchValue);
    if (validationError) {
      setStatus("error");
      setMessage(validationError);
      setResults([]);
      return;
    }

    setStatus("loading");
    setMessage("");
    setResults([]);

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ certificateNumber: searchValue }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification request failed");

      const clients = (data.clients || []) as ClientResult[];
      setResults(clients);
      setStatus("done");
      setMessage(
        clients.length > 0
          ? `Found ${clients.length} matching certification record${clients.length === 1 ? "" : "s"}.`
          : "No matching certification records found for this certificate number.",
      );
    } catch (err) {
      setStatus("error");
      setResults([]);
      setMessage(
        err instanceof Error
          ? err.message
          : `Unable to search. Please email ${siteConfig.email}.`,
      );
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-[0_20px_50px_rgba(26,37,22,0.06)] md:p-8">
      <div className="mb-6">
        <span className="inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(0,89,83,0.28)]">
          ISO certification verification
        </span>
      </div>

      <form onSubmit={onSearch} className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="certificate-number">
          Certificate number
        </label>
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id="certificate-number"
            value={certificateNumber}
            onChange={(e) => {
              setCertificateNumber(e.target.value);
              if (status !== "idle") {
                setStatus("idle");
                setMessage("");
                setResults([]);
              }
            }}
            className={cn(fieldClass, "pl-10")}
            placeholder="Enter certificate number (e.g. EC-211282K301-Q)"
            autoComplete="off"
            spellCheck={false}
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
      <p className="mt-3 text-xs leading-relaxed text-muted">
        Enter the certificate number printed on your certificate. Company or client name cannot be
        used for verification.
      </p>

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
            {message}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {results.length > 0 ? (
        <div className="mt-6 space-y-4">
          {results.map((client) => (
            <article
              key={client.id}
              className="rounded-2xl border border-primary/15 bg-white p-5 shadow-[0_10px_30px_rgba(0,89,83,0.06)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 text-primary">
                    <Building2 className="h-4 w-4" />
                    <h3 className="font-display text-xl font-bold">{client.companyName}</h3>
                  </div>
                  {client.address ? (
                    <p className="flex items-start gap-2 text-sm text-muted">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                      {client.address}
                    </p>
                  ) : null}
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                    client.status === "active"
                      ? "bg-primary/10 text-primary"
                      : "bg-danger/10 text-danger",
                  )}
                >
                  {statusLabel(client)}
                </span>
              </div>

              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                {client.standards ? (
                  <div>
                    <dt className="font-semibold text-primary">Certified Standards</dt>
                    <dd className="text-muted mt-1">{client.standards}</dd>
                  </div>
                ) : null}
                {client.scope ? (
                  <div>
                    <dt className="font-semibold text-primary">Scope</dt>
                    <dd className="text-muted mt-1">{client.scope}</dd>
                  </div>
                ) : null}
                {client.auditPhase ? (
                  <div>
                    <dt className="font-semibold text-primary">Audit Phase</dt>
                    <dd className="text-muted mt-1">{client.auditPhase}</dd>
                  </div>
                ) : null}
                {client.sector ? (
                  <div>
                    <dt className="font-semibold text-primary">Sector (IAF)</dt>
                    <dd className="text-muted mt-1">{client.sector}</dd>
                  </div>
                ) : null}
                {client.certifyingBody ? (
                  <div className="sm:col-span-2">
                    <dt className="font-semibold text-primary">Certification Body</dt>
                    <dd className="text-muted mt-1">{client.certifyingBody}</dd>
                  </div>
                ) : null}
                {client.certificateNumber ? (
                  <div>
                    <dt className="font-semibold text-primary">Certificate No.</dt>
                    <dd className="text-muted mt-1">{client.certificateNumber}</dd>
                  </div>
                ) : null}
                {formatCertDate(client.issueDate) ? (
                  <div>
                    <dt className="font-semibold text-primary">Issue Date</dt>
                    <dd className="text-muted mt-1">{formatCertDate(client.issueDate)}</dd>
                  </div>
                ) : null}
                {formatCertDate(client.expiryDate) ? (
                  <div>
                    <dt className="font-semibold text-primary">Expiry Date</dt>
                    <dd className="text-muted mt-1">{formatCertDate(client.expiryDate)}</dd>
                  </div>
                ) : null}
              </dl>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}
