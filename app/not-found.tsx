import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="gradient-mesh flex min-h-[80vh] items-center py-32">
      <div className="container-premium text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">404</p>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] tracking-tight">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The page you are looking for does not exist or may have moved. Return home or request a
          free quote.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to Home</Button>
          <Button href="/contact" variant="outline">
            Contact
          </Button>
        </div>
        <p className="mt-8 text-sm text-muted">
          Or browse{" "}
          <Link href="/services" className="text-primary underline-offset-2 hover:underline">
            services
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
