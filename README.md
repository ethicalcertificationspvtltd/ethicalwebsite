# Ethical Certifications (ET Cert) — Premium Website

Next.js + TypeScript rebuild of [etcert.com](https://etcert.com/) with a premium corporate experience, Framer Motion animations, and React Three Fiber hero visuals.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Quote form email

`POST /api/quote` validates and acknowledges inquiries. Wire an email provider (Resend, SendGrid, Nodemailer) inside `app/api/quote/route.ts` when ready. Do not claim delivery until configured.

## Content source

Company copy, contact details, testimonials, client logos and accreditation claims were taken from the live Ethical Certifications websites (`etcert.com` homepage assets + `ksa.etcert.com` inner pages where Pakistan subpages returned 404 at audit time).
