"use client";

import { useEffect, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrandLogoInteractive } from "@/components/ui/BrandLogoInteractive";

const SESSION_KEY = "etcert-loader-seen";

type Listener = () => void;
let showLoader = false;
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return showLoader;
}

function getServerSnapshot() {
  return false;
}

function setShowLoader(next: boolean) {
  if (showLoader === next) return;
  showLoader = next;
  emit();
}

function markSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* ignore */
  }
}

function wasSeen() {
  try {
    return !!sessionStorage.getItem(SESSION_KEY);
  } catch {
    return true;
  }
}

export function PageLoader() {
  const reduce = useReducedMotion();
  const show = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.classList.add("app-ready");

    if (reduce || wasSeen()) {
      markSeen();
      setShowLoader(false);
      return;
    }

    // Defer show to next frame so we don't call setState sync in effect body path
    const start = window.setTimeout(() => setShowLoader(true), 0);
    const end = window.setTimeout(() => {
      setShowLoader(false);
      markSeen();
    }, 240);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(end);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-gradient-to-b from-[#24a87c] via-[#2eb583] to-[#24a87c]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative flex flex-col items-center gap-5">
            <BrandLogoInteractive priority className="relative z-10 h-12 w-[140px] [&_img]:brightness-0 [&_img]:invert" />
            <div className="h-[2px] w-36 overflow-hidden rounded-full bg-white/20">
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
