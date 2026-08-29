export type Certification = {
  slug: string;
  code: string;
  year: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  href: string;
  featured?: boolean;
};

export const certifications: Certification[] = [
  {
    slug: "iso-9001",
    code: "ISO 9001",
    year: "2015",
    title: "Quality Management",
    category: "QMS",
    summary:
      "The internationally recognized framework for Quality Management Systems that strengthens process control, customer confidence and continual improvement.",
    description:
      "ISO 9001:2015 provides a framework for effective quality management, helping organizations improve product and service quality, manage risk and demonstrate commitment to customers and regulators.",
    href: "/certifications/iso-9001",
    featured: true,
  },
  {
    slug: "iso-14001",
    code: "ISO 14001",
    year: "2015",
    title: "Environmental Management",
    category: "EMS",
    summary:
      "Environmental Management System certification supporting responsible operations, compliance and sustainability objectives.",
    description:
      "ISO 14001:2015 helps organizations manage environmental responsibilities systematically, reduce impact and demonstrate environmental stewardship to stakeholders.",
    href: "/certifications/iso-14001",
    featured: true,
  },
  {
    slug: "iso-45001",
    code: "ISO 45001",
    year: "2018",
    title: "Occupational Health & Safety",
    category: "OHSMS",
    summary:
      "Occupational health and safety management certification focused on safer workplaces and risk reduction.",
    description:
      "ISO 45001:2018 provides a framework to improve employee safety, reduce workplace risks and create better, safer working conditions.",
    href: "/certifications/iso-45001",
    featured: true,
  },
  {
    slug: "iso-22000",
    code: "ISO 22000",
    year: "2018",
    title: "Food Safety Management",
    category: "FSMS",
    summary:
      "Food Safety Management System certification for organizations across the food chain.",
    description:
      "ISO 22000:2018 helps organizations identify and control food safety hazards and demonstrate a robust food safety management system.",
    href: "/certifications/iso-22000",
    featured: true,
  },
  {
    slug: "iso-27001",
    code: "ISO 27001",
    year: "2022",
    title: "Information Security",
    category: "ISMS",
    summary:
      "Information security management certification supporting confidentiality, integrity and availability of information.",
    description:
      "ISO 27001:2022 provides requirements for establishing, implementing and continually improving an Information Security Management System.",
    href: "/certifications/iso-27001",
  },
  {
    slug: "iso-13485",
    code: "ISO 13485",
    year: "2016",
    title: "Medical Devices QMS",
    category: "MDQMS",
    summary:
      "Quality management requirements tailored for medical device organizations.",
    description:
      "ISO 13485:2016 specifies requirements for a quality management system where an organization needs to demonstrate its ability to provide medical devices and related services.",
    href: "/certifications/iso-13485",
  },
  {
    slug: "iso-17025",
    code: "ISO 17025",
    year: "2017",
    title: "Testing & Calibration Laboratories",
    category: "Laboratory",
    summary:
      "Competence requirements for testing and calibration laboratories.",
    description:
      "ISO/IEC 17025:2017 specifies general requirements for the competence, impartiality and consistent operation of laboratories.",
    href: "/certifications/iso-17025",
  },
  {
    slug: "iso-41001",
    code: "ISO 41001",
    year: "2018",
    title: "Facility Management",
    category: "FMS",
    summary:
      "Facility management system standard supporting efficient and effective facility services.",
    description:
      "ISO 41001:2018 specifies requirements for a facility management system when an organization needs to demonstrate effective and efficient delivery of FM.",
    href: "/certifications/iso-41001",
  },
  {
    slug: "iso-31000",
    code: "ISO 31000",
    year: "2018",
    title: "Risk Management",
    category: "Risk",
    summary:
      "Guidelines for establishing a risk management framework and process.",
    description:
      "ISO 31000:2018 provides guidelines on managing risk faced by organizations and can be applied throughout the life of an organization.",
    href: "/certifications/iso-31000",
  },
  {
    slug: "iso-22483",
    code: "ISO 22483",
    year: "2020",
    title: "Tourism & Related Services",
    category: "Hospitality",
    summary:
      "Service requirements related to tourism and hospitality operations.",
    description:
      "ISO 22483:2020 addresses service requirements for hotels and related tourism services, supporting consistent guest experience and operational quality.",
    href: "/certifications/iso-22483",
  },
  {
    slug: "halal",
    code: "Halal",
    year: "",
    title: "Halal Certification",
    category: "Halal",
    summary:
      "Halal certification support for organizations seeking trusted market access.",
    description:
      "Ethical Certifications provides Halal certification services to help organizations meet applicable Halal requirements for relevant markets.",
    href: "/certifications/halal",
  },
  {
    slug: "ce",
    code: "CE",
    year: "",
    title: "CE Marking Support",
    category: "Conformity",
    summary:
      "CE-related conformity support for products intended for applicable markets.",
    description:
      "Ethical Certifications supports organizations seeking CE-related conformity pathways. Contact our team for scope and applicability guidance.",
    href: "/certifications/ce",
  },
];

export function getCertification(slug: string) {
  return certifications.find((c) => c.slug === slug);
}
