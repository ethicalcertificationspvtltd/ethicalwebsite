import type { LucideIcon } from "lucide-react";
import {
  Award,
  BadgeCheck,
  Building2,
  Factory,
  Globe2,
  Handshake,
  HeartPulse,
  Layers,
  MapPin,
  ShieldCheck,
  Truck,
  UtensilsCrossed,
  Zap,
  Users,
  ClipboardCheck,
  Headphones,
} from "lucide-react";

export type HomeCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const heroTrustBadges = [
  { label: "SAAC Accreditation", icon: BadgeCheck },
  { label: "IAF Recognition", icon: Globe2 },
  { label: "Internationally Recognized", icon: Award },
  { label: "Experienced Auditors", icon: Users },
  { label: "Saudi Arabia Based", icon: MapPin },
  { label: "Global Certification Services", icon: ShieldCheck },
] as const;

export const whyChooseUs: HomeCard[] = [
  {
    title: "Accredited Certification",
    description:
      "Independent certification pathways supported through SAAC and PNAC accreditation on internationally aligned standards.",
    icon: BadgeCheck,
  },
  {
    title: "Experienced Auditors",
    description:
      "Multi-industry auditors who understand operational realities and evaluate systems with clarity and professionalism.",
    icon: ClipboardCheck,
  },
  {
    title: "International Recognition",
    description:
      "Certification outcomes aligned with IAF recognition principles to support credibility in domestic and export markets.",
    icon: Globe2,
  },
  {
    title: "Industry Expertise",
    description:
      "Experience across manufacturing, logistics, pharmaceuticals, infrastructure, food, and service sectors.",
    icon: Layers,
  },
  {
    title: "Transparent Process",
    description:
      "Clear communication from inquiry through audit, certification decision, and ongoing surveillance support.",
    icon: ShieldCheck,
  },
  {
    title: "Dedicated Client Support",
    description:
      "Responsive guidance for quotes, applications, audit preparation, and certificate verification requests.",
    icon: Headphones,
  },
];

export const certificationSteps = [
  {
    step: "01",
    title: "Submit Inquiry",
    description: "Share your organization details, scope, and certification objectives with our team.",
  },
  {
    step: "02",
    title: "Initial Assessment",
    description: "We review readiness, applicable standards, and the most suitable certification pathway.",
  },
  {
    step: "03",
    title: "Audit & Evaluation",
    description: "Independent audit activity evaluates system implementation against the selected standard.",
  },
  {
    step: "04",
    title: "Certification Decision",
    description: "Upon satisfactory conformity, certification is granted with defined scope and validity.",
  },
  {
    step: "05",
    title: "Ongoing Improvement",
    description: "Surveillance audits and continual improvement support long-term compliance and performance.",
  },
] as const;

export const saudiBenefits = [
  "Supplier qualification for corporate and industrial buyers",
  "Stronger positioning for government and private tenders",
  "Enhanced market credibility across the Kingdom and GCC",
  "Improved readiness for regulatory and customer expectations",
  "Operational improvement through structured management systems",
  "Support for international business and export opportunities",
] as const;

export const industries = [
  { name: "Construction", icon: Building2 },
  { name: "Manufacturing", icon: Factory },
  { name: "Food & Beverage", icon: UtensilsCrossed },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Logistics", icon: Truck },
  { name: "Engineering", icon: Layers },
  { name: "Energy", icon: Zap },
  { name: "Hospitality", icon: Handshake },
  { name: "Trading", icon: Globe2 },
] as const;

export const faqItems = [
  {
    question: "What is ISO certification?",
    answer:
      "ISO certification is independent third-party confirmation that an organization's management system meets the requirements of an international standard such as ISO 9001, ISO 14001, or ISO 45001.",
  },
  {
    question: "How long does ISO certification take?",
    answer:
      "Timelines depend on organization size, scope, standard selected, and readiness. After an initial assessment, Ethical Certifications provides a realistic pathway based on your context.",
  },
  {
    question: "Which ISO standard does my business need?",
    answer:
      "The right standard depends on your sector, customer requirements, and objectives. Quality (ISO 9001), environment (ISO 14001), occupational health and safety (ISO 45001), and food safety (ISO 22000) are common starting points.",
  },
  {
    question: "Is ISO certification internationally recognized?",
    answer:
      "Certifications issued through accredited conformity assessment pathways are designed to support international recognition, particularly when supported by IAF-member accreditation arrangements.",
  },
  {
    question: "What is the certification process?",
    answer:
      "The process typically includes inquiry, readiness review, audit and evaluation, certification decision, and ongoing surveillance to maintain certified status.",
  },
  {
    question: "What documents are required?",
    answer:
      "Requirements vary by standard and scope. Common preparation includes policies, procedures, records, scope definition, and evidence of system implementation. Our team guides you during the initial assessment.",
  },
  {
    question: "How often are surveillance audits performed?",
    answer:
      "Surveillance frequency follows the certification cycle defined for your certificate and standard. Your certification agreement outlines the schedule and expectations.",
  },
  {
    question: "How can I verify an Ethical Certifications certificate?",
    answer:
      "Use the certificate verification service on our Clients page by entering the unique certificate number, or email a scanned copy to our team for confirmation.",
  },
] as const;
