import { getConsoleFunction, setConsoleFunction } from "three";

const CLOCK_DEPRECATION = "THREE.Clock: This module has been deprecated";

let patched = false;

/**
 * Suppresses the THREE.Clock deprecation noise from @react-three/fiber v9
 * until upstream migrates to THREE.Timer (r3f v10+).
 */
export function patchThreeConsoleWarnings() {
  if (patched || typeof window === "undefined") return;
  patched = true;

  const previous = getConsoleFunction();

  setConsoleFunction((type, message, ...params) => {
    if (
      type === "warn" &&
      typeof message === "string" &&
      message.includes(CLOCK_DEPRECATION)
    ) {
      return;
    }

    if (previous) {
      previous(type, message, ...params);
      return;
    }

    const fn = type === "error" ? console.error : type === "warn" ? console.warn : console.log;
    fn(message, ...params);
  });
}
