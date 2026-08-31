"use client";

import Link from "next/link";
import { BrandLogoInteractive } from "@/components/ui/BrandLogoInteractive";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, ShieldCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services/certification", label: "Certification" },
  { href: "/services/inspection", label: "Inspection" },
  { href: "/services/calibration", label: "Calibration" },
  { href: "/services/training", label: "Training" },
  { href: "/accreditation", label: "Accreditation" },
  { href: "/news", label: "Resources" },
  { href: "/contact", label: "Contact" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    queueMicrotask(() => setOpen(false));
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = (href: string) =>
    cn(
      "nav-link-premium whitespace-nowrap rounded-lg px-2 py-2 text-[0.8125rem] font-medium transition-colors duration-300 2xl:px-2.5 2xl:text-sm",
      isActive(pathname, href)
        ? "text-[#005953]"
        : "text-[#005953]/70 hover:text-[#005953]",
    );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
          transparent
            ? "border-transparent bg-[#eef8f5]/72 backdrop-blur-xl"
            : "surface-light border-primary/15 bg-white/78 shadow-[0_4px_32px_rgba(0,89,83,0.1)] backdrop-blur-2xl",
        )}
      >
        <div className="container-premium flex h-[4.5rem] items-center justify-between gap-3 md:h-[4.75rem] xl:gap-4">
          <BrandLogoInteractive priority />

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex"
            aria-label="Primary"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass(link.href)}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-2.5">
            <Button
              href="/clients#verify"
              size="sm"
              variant="outline"
              className="!border-primary/20 !bg-white !text-[#005953] hover:!bg-[#f8fcfb]"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Verify Certificate</span>
            </Button>
            <Button href="/contact#quote" size="sm" className="hidden sm:inline-flex">
              Get Free Quote
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
            <button
              type="button"
              className="inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-primary/15 bg-white text-[#005953] transition hover:border-primary/30 xl:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              data-cursor="button"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="surface-light fixed inset-0 z-[80] overflow-y-auto bg-white px-6 pb-10 pt-24 xl:hidden"
            data-lenis-prevent
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "border-b border-border py-4 text-lg font-display",
                    isActive(pathname, link.href) ? "text-[#005953]" : "text-[#005953]/80",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="space-y-3 pt-8">
                <Link
                  href="/clients#verify"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-primary/20 bg-white text-sm font-semibold text-[#005953]"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Verify Certificate
                </Link>
                <Link
                  href="/contact#quote"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-white shadow-[0_12px_28px_rgba(0,89,83,0.28)]"
                >
                  Get Free Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
