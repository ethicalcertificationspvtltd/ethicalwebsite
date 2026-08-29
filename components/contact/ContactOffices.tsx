"use client";

import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { OfficeCard } from "@/components/contact/OfficeCard";
import { siteConfig } from "@/lib/site";

export function ContactOffices() {
  return (
    <div className="space-y-5">
      <OfficeCard
        title="Pakistan Office"
        lines={[
          { icon: MapPin, text: siteConfig.addresses.pakistan },
          { icon: Clock, text: siteConfig.hours.pakistan },
          { icon: Mail, text: siteConfig.email, href: `mailto:${siteConfig.email}` },
          {
            icon: Phone,
            text: siteConfig.phones.pakistanSales,
            href: `tel:${siteConfig.phones.pakistanSalesTel}`,
          },
          {
            icon: Phone,
            text: siteConfig.phones.pakistanAdmin,
            href: `tel:${siteConfig.phones.pakistanAdminTel}`,
          },
        ]}
      />
      <div className="overflow-hidden rounded-3xl border border-border bg-muted-bg">
        <iframe
          title="Ethical Certifications Lahore map"
          src="https://www.google.com/maps?q=Muhafiz+Town+Phase+II+Defence+Road+Lahore&output=embed"
          className="h-64 w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
