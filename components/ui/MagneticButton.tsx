"use client";

import { Button } from "@/components/ui/Button";

type MagneticButtonProps = React.ComponentProps<typeof Button>;

/** Premium magnetic CTA — thin wrapper over Button with magnetic interaction enabled. */
export function MagneticButton(props: MagneticButtonProps) {
  return <Button magnetic {...props} />;
}
