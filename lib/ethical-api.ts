import { normalizeCertificateNumber } from "@/lib/certificate-verify";

function resolveApiBaseUrl(): string {
  if (process.env.API_BASE_URL) {
    return process.env.API_BASE_URL.replace(/\/+$/, "");
  }
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL.replace(/\/+$/, "");
  }
  // Local dev: backend runs on 3000; this site may run on 3002
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return "http://backend-env.eba-qz3uuupm.eu-north-1.elasticbeanstalk.com";
}

export const API_BASE_URL = resolveApiBaseUrl();

const FETCH_TIMEOUT_MS = 8_000;

export type EthicalWebClientResult = {
  id: string;
  companyName: string;
  address?: string;
  scope?: string;
  sector?: string;
  standards?: string;
  auditPhase?: string;
  certifyingBody?: string;
  certificateNumber?: string;
  issueDate?: string;
  expiryDate?: string;
  registryStatus?: string;
  status?: "active" | "suspended" | "expired";
};

export type EthicalWebNewsItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  dateLabel?: string;
  link?: string;
};

async function fetchFromApi(path: string): Promise<Response | null> {
  try {
    return await fetch(`${API_BASE_URL}${path}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[ethical-api] Unreachable: ${API_BASE_URL}${path}`);
    }
    return null;
  }
}

export async function searchEthicalWebClients(query: string): Promise<EthicalWebClientResult[]> {
  const q = encodeURIComponent(query.trim());
  if (!q) return [];

  const response = await fetchFromApi(`/ethical-web/clients/search?q=${q}`);
  if (!response?.ok) {
    if (!response) {
      throw new Error("Verification service is temporarily unavailable. Please try again later.");
    }
    throw new Error(`Verification search failed (HTTP ${response.status})`);
  }

  const data = await response.json().catch(() => []);
  return Array.isArray(data) ? data : [];
}

/** Verify by certificate number only — company/name matches are excluded. */
export async function searchEthicalWebClientsByCertificateNumber(
  certificateNumber: string,
): Promise<EthicalWebClientResult[]> {
  const normalized = normalizeCertificateNumber(certificateNumber);
  if (!normalized) return [];

  const results = await searchEthicalWebClients(normalized);

  return results.filter((client) => {
    if (!client.certificateNumber?.trim()) return false;
    return normalizeCertificateNumber(client.certificateNumber) === normalized;
  });
}

/** Returns an empty array when the backend is unreachable — callers can fall back to static data. */
export async function fetchEthicalWebNews(): Promise<EthicalWebNewsItem[]> {
  const response = await fetchFromApi("/ethical-web/news");
  if (!response?.ok) return [];

  const data = await response.json().catch(() => []);
  return Array.isArray(data) ? data : [];
}
