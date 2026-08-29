"use client";

import { ShieldCheck } from "lucide-react";

export function VerifyCertificateVisual() {
  return (
    <div className="verify-cert-visual relative mx-auto hidden h-[280px] w-full max-w-[320px] lg:block" aria-hidden>
      <div className="verify-cert-visual-ring verify-cert-visual-ring--1" />
      <div className="verify-cert-visual-ring verify-cert-visual-ring--2" />
      <div className="verify-cert-visual-doc">
        <div className="verify-cert-visual-doc-header" />
        <div className="verify-cert-visual-doc-line verify-cert-visual-doc-line--long" />
        <div className="verify-cert-visual-doc-line" />
        <div className="verify-cert-visual-doc-line" />
        <div className="verify-cert-visual-doc-line verify-cert-visual-doc-line--short" />
        <div className="verify-cert-visual-doc-seal" />
      </div>
      <div className="verify-cert-visual-badge">
        <ShieldCheck className="h-6 w-6 text-white" strokeWidth={2} />
        <svg className="verify-cert-visual-check" viewBox="0 0 24 24" fill="none">
          <path
            className="verify-cert-visual-check-path"
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
