/** Ethical Certifications certificate numbers (EC- prefix). */
const CERTIFICATE_NUMBER_PATTERN = /^EC-[A-Z0-9]+(?:-[A-Z0-9]+)*$/i;

export function normalizeCertificateNumber(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

export function isCertificateNumberFormat(value: string): boolean {
  const normalized = normalizeCertificateNumber(value);
  if (!normalized) return false;
  return CERTIFICATE_NUMBER_PATTERN.test(normalized);
}

export function certificateNumberValidationMessage(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Please enter a certificate number.";
  if (trimmed.length < 6) return "Please enter a valid certificate number.";
  if (/[|]/.test(trimmed) || /\s{2,}/.test(trimmed)) {
    return "Verification is by certificate number only — not company or client name.";
  }
  if (!isCertificateNumberFormat(trimmed)) {
    return "Enter the certificate number exactly as printed on the certificate.";
  }
  return null;
}
