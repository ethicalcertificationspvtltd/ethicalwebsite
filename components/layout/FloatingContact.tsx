"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const phoneDisplay = siteConfig.phones.pakistanSales;
const phoneTel = siteConfig.phones.pakistanSalesTel;
/** Digits only for wa.me */
const whatsappNumber = phoneTel.replace(/\D/g, "");
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  `Hello ${siteConfig.name}, I would like to inquire about ISO certification.`,
)}`;

export function FloatingContact() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent | TouchEvent) => {
      const node = rootRef.current;
      if (!node) return;
      if (e.target instanceof Node && !node.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed bottom-5 right-4 z-[70] flex flex-col items-end gap-3 sm:bottom-8 sm:right-6"
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            role="menu"
            aria-label="Contact options"
            initial={reduce ? false : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex w-[min(100vw-2rem,17.5rem)] flex-col gap-2 rounded-2xl border border-border bg-white/95 p-2 shadow-[0_20px_50px_rgba(26,37,22,0.16)] backdrop-blur-md"
          >
            <ContactAction
              href={whatsappHref}
              label="WhatsApp"
              detail={phoneDisplay}
              external
              tone="whatsapp"
              icon={<WhatsAppIcon className="h-5 w-5" />}
              onNavigate={() => setOpen(false)}
            />
            <ContactAction
              href={`tel:${phoneTel}`}
              label="Call us"
              detail={phoneDisplay}
              tone="phone"
              icon={<Phone className="h-5 w-5" strokeWidth={2.25} />}
              onNavigate={() => setOpen(false)}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close contact menu" : "Open WhatsApp and phone contact"}
        data-cursor="button"
        onClick={() => setOpen((v) => !v)}
        whileTap={reduce ? undefined : { scale: 0.96 }}
        className={cn(
          "pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_14px_36px_rgba(0,89,83,0.35)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          open ? "bg-foreground" : "bg-primary hover:bg-primary-mid",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={reduce ? false : { opacity: 0, rotate: -40 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={reduce ? undefined : { opacity: 0, rotate: 40 }}
              transition={{ duration: 0.18 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18 }}
              className="relative"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-white shadow" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

function ContactAction({
  href,
  label,
  detail,
  icon,
  tone,
  external,
  onNavigate,
}: {
  href: string;
  label: string;
  detail: string;
  icon: ReactNode;
  tone: "whatsapp" | "phone";
  external?: boolean;
  onNavigate: () => void;
}) {
  return (
    <a
      href={href}
      role="menuitem"
      data-cursor="button"
      onClick={onNavigate}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 transition",
        tone === "whatsapp"
          ? "hover:bg-[#25D366]/12"
          : "hover:bg-primary-soft",
      )}
    >
      <span
        className={cn(
          "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white",
          tone === "whatsapp"
            ? "bg-[#25D366]"
            : "bg-primary hover:bg-primary-mid",
        )}
      >
        {icon}
      </span>
      <span className="min-w-0 text-left">
        <span className="block text-sm font-semibold text-foreground">{label}</span>
        <span className="block truncate text-xs text-muted">{detail}</span>
      </span>
    </a>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.55 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.16-3.45-8.44ZM12.07 21.15h-.01a9.24 9.24 0 0 1-4.71-1.29l-.34-.2-3.74.98 1-3.64-.22-.37a9.25 9.25 0 0 1-1.42-4.94c0-5.11 4.16-9.27 9.28-9.27a9.2 9.2 0 0 1 6.56 2.72 9.2 9.2 0 0 1 2.71 6.56c0 5.11-4.16 9.27-9.27 9.27Zm5.08-6.94c-.28-.14-1.64-.81-1.9-.9-.25-.1-.44-.14-.62.14-.18.28-.71.9-.87 1.08-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.47h-.53c-.18 0-.48.07-.73.34-.25.28-.96.94-.96 2.3 0 1.35.98 2.66 1.12 2.84.14.18 1.93 2.95 4.68 4.14.65.28 1.17.45 1.57.57.66.21 1.26.18 1.73.11.53-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.11-.25-.18-.53-.32Z" />
    </svg>
  );
}
