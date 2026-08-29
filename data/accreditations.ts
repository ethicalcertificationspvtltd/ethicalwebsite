export type Accreditation = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  logo: string;
};

export const accreditations: Accreditation[] = [
  {
    id: "saac",
    name: "SAAC",
    shortName: "SAAC / SAC",
    description:
      "IAF-recognized accreditation supporting internationally accepted certification outcomes for organizations requiring SAC-accredited certification.",
    logo: "/assets/accreditations/saac.png",
  },
  {
    id: "pnac",
    name: "Pakistan National Accreditation Council",
    shortName: "PNAC",
    description:
      "National accreditation body recognition supporting trusted certification and inspection services under internationally aligned frameworks.",
    logo: "/assets/accreditations/pnac.png",
  },
  {
    id: "iaf",
    name: "International Accreditation Forum",
    shortName: "IAF",
    description:
      "Association of accreditation bodies that supports global recognition of certifications issued by accredited conformity assessment bodies.",
    logo: "/assets/accreditations/aia.png",
  },
];

export const accreditationDocs = [
  {
    title: "Accreditation mark",
    src: "/assets/accreditations/accr-sign.png",
  },
  {
    title: "QMS accreditation mark",
    src: "/assets/accreditations/accr-sign-qms.jpg",
  },
  {
    title: "SAAC certificate excerpt",
    src: "/assets/accreditations/saac-45001.jpg",
  },
  {
    title: "PNAC accreditation document",
    src: "/assets/accreditations/pnac-doc-fresh.jpeg",
  },
  {
    title: "PNAC accreditation document (alt)",
    src: "/assets/accreditations/pnac-doc-fresh-2.jpeg",
  },
];
