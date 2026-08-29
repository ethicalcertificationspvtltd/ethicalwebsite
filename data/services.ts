export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  href: string;
  summary: string;
  description: string;
  highlights: string[];
  icon: "certification" | "inspection" | "calibration" | "training" | "psi" | "auditing";
};

export const services: Service[] = [
  {
    slug: "certification",
    title: "ISO Certification",
    shortTitle: "Certification",
    href: "/services/certification",
    summary:
      "Independent third-party ISO certification across quality, environment, health & safety, food safety and more.",
    description:
      "Choosing Ethical Certifications brings internationally accredited certification recognized through IAF-member accreditation bodies including the Saudi Accreditation Center (SAAC) and Pakistan National Accreditation Council (PNAC). Our certifications support government tenders, supplier qualification and global market access.",
    highlights: [
      "IAF-recognized accreditation pathway",
      "Experienced multi-industry auditors",
      "Support for tenders and supplier qualification",
      "Integrated management system pathways",
    ],
    icon: "certification",
  },
  {
    slug: "inspection",
    title: "Third Party Inspection",
    shortTitle: "Inspection",
    href: "/services/inspection",
    summary:
      "Independent lifting equipment and earthmoving machinery inspection to help manage risk and verify capacity.",
    description:
      "Ethical Certification provides independent third-party lifting equipment inspection services across industrial sectors. We deliver comprehensive testing for lifting equipment and earthmoving machinery to verify stated capacity and compliance with inspection standards and procedures.",
    highlights: [
      "Lifting equipment & accessories",
      "Earthmoving machinery inspections",
      "Risk reduction for defective parts",
      "Alignment with inspection standards",
    ],
    icon: "inspection",
  },
  {
    slug: "calibration",
    title: "Calibration Services",
    shortTitle: "Calibration",
    href: "/services/calibration",
    summary:
      "On-site and in-house laboratory calibration with master equipment traceable to international standards.",
    description:
      "Ethical Certifications provides both on-site and in-house calibration services. Our laboratory offers a one-stop calibration capability designed to meet standard requirements, with policies and procedures aligned to international standards.",
    highlights: [
      "Pressure / vacuum",
      "Temperature & humidity",
      "Force / torque",
      "Electrical & dimensional",
      "Flow measurements",
    ],
    icon: "calibration",
  },
  {
    slug: "training",
    title: "ISO Lead Auditor Training",
    shortTitle: "Training",
    href: "/services/training",
    summary:
      "CQI/IRCA approved auditor training delivered with Managing For Quality (MFQ), a UK training partner.",
    description:
      "Managing For Quality (MFQ), a UK training body, has joined with Ethical Certifications to provide CQI and IRCA Approved Training courses. Learning emphasizes practical auditing skills through exercises, discussion, role play and simulated certification audits.",
    highlights: [
      "CQI and IRCA certified courses",
      "QMS / EMS / OHSMS auditor focus",
      "Simulated certification audits",
      "Practical skill development",
    ],
    icon: "training",
  },
  {
    slug: "pre-shipment-inspection",
    title: "Pre-Shipment Inspection",
    shortTitle: "Pre-Shipment",
    href: "/services/pre-shipment-inspection",
    summary:
      "Independent PSI / product inspection aligned with ISO 17020 practices before goods leave the supplier.",
    description:
      "Ethical Certifications offers Pre-Shipment Inspection (PSI) services to verify that products meet agreed specifications and quality standards when fully produced, packed and ready to ship. Inspections are independent from importers, exporters, suppliers and manufacturers.",
    highlights: [
      "On-site expert inspection",
      "Quality, packaging & quantity checks",
      "Detailed report within 24 hours",
      "Food, textiles, consumer goods & machinery",
    ],
    icon: "psi",
  },
  {
    slug: "auditing",
    title: "ISO Auditing Support",
    shortTitle: "Auditing",
    href: "/services/auditing",
    summary:
      "Professional audit delivery grounded in multi-industry experience and ethical certification practice.",
    description:
      "Our experienced professionals bring backgrounds across multiple industries. This expertise supports thorough evaluations with a deep understanding of each organization’s unique needs during the audit process.",
    highlights: [
      "Industry-aware audit approach",
      "Clear communication throughout audits",
      "Value-focused evaluations",
      "Pathway to ongoing compliance",
    ],
    icon: "auditing",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
