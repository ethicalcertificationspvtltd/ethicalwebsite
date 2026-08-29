export type Client = {
  name: string;
  logo: string;
};

/** Client logos featured on etcert.com */
export const clients: Client[] = [
  { name: "NLC", logo: "/assets/clients/nlc.png" },
  { name: "Martin Dow", logo: "/assets/clients/martin.png" },
  { name: "FAST Cables", logo: "/assets/clients/fast.png" },
  { name: "AINA", logo: "/assets/clients/aina.png" },
  { name: "Abedin International", logo: "/assets/clients/abedin.png" },
  { name: "PLRA / PLRD", logo: "/assets/clients/plrd.png" },
  { name: "Popler", logo: "/assets/clients/popler.png" },
  { name: "Qarshi", logo: "/assets/clients/qarshi.png" },
  { name: "SNGPL", logo: "/assets/clients/sui.png" },
  { name: "Waves", logo: "/assets/clients/waves.png" },
];

/** Prestigious clients listed on etcert.com/clients */
export const prestigiousClients = [
  "Din Textile Mills Limited",
  "Martin Dow Marker Limited",
  "Al Meezan Investment Management Limited (AIMS)",
  "Center for Energy Research and Development (CERAD) – UET Lahore",
  "National Logistics Corporation (NLC)",
  "Newage Cables (Private) Limited",
  "Alif Industries (Turk Plast) Private Limited",
  "Punjab Land Records Authority (PLRA) – Arazi Record Centers (ARC)",
  "Sui Northern Gas Pipelines Limited (SNGPL)",
  "Solution Engineering (Private) Limited",
  "PDH Pharmaceuticals (Private) Limited",
  "Links 2000 (Private) Limited",
  "PKG International Shipping & Logistics (Private) Limited",
  "Abedin International (Private) Limited",
  "Fast Cables Limited",
  "Building Standards (Private) Limited",
  "National Highways & Motorway Police Training College",
] as const;

/** Certificate / site images from the live Clients page gallery */
export const clientGallery = [
  "/assets/clients/gallery/cert-01.jpeg",
  "/assets/clients/gallery/cert-02.jpeg",
  "/assets/clients/gallery/cert-03.jpeg",
  "/assets/clients/gallery/cert-04.jpeg",
  "/assets/clients/gallery/cert-05.jpeg",
  "/assets/clients/gallery/cert-06.jpeg",
  "/assets/clients/gallery/cert-07.jpeg",
  "/assets/clients/gallery/cert-08.jpeg",
  "/assets/clients/gallery/cert-09.jpeg",
] as const;

export const whyChoosePoints = [
  "Recognized ISO certification body with global credibility",
  "Expertise in auditing and compliance with international standards",
  "Supporting clients with export competitiveness and global market access",
  "Trusted by leading organizations across textiles, pharmaceuticals, logistics, and infrastructure",
  "Commitment to ethical practices, transparency, and long-term partnerships",
] as const;
