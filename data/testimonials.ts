export type Testimonial = {
  id: string;
  name: string;
  company: string;
  quote: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: "umar",
    name: "Muhammad Umar",
    company: "TurkPlast",
    rating: 5,
    quote:
      "Ethical Certifications stands out due to its accreditation from a reputable national council, ensuring adherence to international standards. Their global reach and recognition of certifications add significant value to their offerings. Their thorough understanding of business requirements during audits led to a smooth and insightful process. We were particularly impressed by their commitment to ethical practices. Overall, I highly recommend their services for anyone seeking reliable and recognized certification solutions.",
  },
  {
    id: "sehrish",
    name: "Sehrish Afshan",
    company: "Global Clinical Cura Private Limited",
    rating: 5,
    quote:
      "We recently had our ISO 9001 audit conducted by Ethical Certification, and I recommend them highly! Mr. Adil was incredibly explanatory throughout the audit process, making everything straightforward and efficient. Mr. Masoom conducted the audit itself and made the experience smooth and seamless, which really exceeded our expectations. A huge shoutout to Mr. Sharjeel Farooq for fostering such a cooperative and professional team.",
  },
  {
    id: "waseem",
    name: "Waseem Khalid",
    company: "PKG International",
    rating: 5,
    quote:
      "Ethical Certifications is an excellent company that provides exceptional support for obtaining ISO certifications. We successfully achieved ISO 9001, ISO 14001, and ISO 45001 through their services. These certifications have been highly productive, helping us enhance our business objectives and improve overall performance.",
  },
];
