export const siteConfig = {
  name: "Ethical Certifications",
  shortName: "ET Cert",
  tagline: "Excellence Certified, Worldwide Recognized",
  description:
    "Independent third-party ISO certification, inspection, calibration and training body accredited by SAAC and PNAC.",
  url: "https://etcert.com",
  email: "info@etcert.com",
  emailCan: "can@etcert.com",
  phones: {
    pakistanSales: "+92 339 111 9001",
    pakistanSalesTel: "+923391119001",
    pakistanAdmin: "+92 (0)423 5447881",
    pakistanAdminTel: "+924235447881",
    pakistanSalesAlt: "+92 333 862 4360",
    pakistanSalesAltTel: "+923338624360",
    canadaSales: "+1 (403) 992-7474",
    canadaSalesTel: "+14039927474",
  },
  hours: {
    pakistan: "Monday – Saturday, 09:30 AM – 05:00 PM",
  },
  addresses: {
    pakistan:
      "Plot # 169, Block-B, Muhafiz Town, Phase-II, Near DHA Rahbar, Main Defence Road, Lahore, Pakistan.",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/105093782",
    youtube: "https://www.youtube.com/@etcert/videos",
    facebook: "https://www.facebook.com/Ethicalcert/",
  },
  rating: {
    value: 4.7,
    label: "Client Reviews",
  },
  stats: [
    { label: "ISO Certification Services", value: 18, suffix: "+ Years" },
    { label: "Third Party Inspections", value: 10, suffix: "+ Years" },
    { label: "Calibration Services", value: 6, suffix: "+ Years" },
    { label: "ISO Lead Auditor Training", value: 9, suffix: "+ Years" },
  ],
  accreditationStandards: ["ISO/IEC 17021-1:2015", "ISO 22003:2022"],
} as const;
