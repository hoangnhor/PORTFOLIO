export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000").replace(/\/$/, "");

const PORTFOLIO_ENDPOINT = `${API_BASE_URL}/api/portfolio`;
const PORTFOLIO_META_ENDPOINT = `${API_BASE_URL}/api/portfolio/meta`;
const REQUEST_TIMEOUT_MS = 10000;

async function fetchWithTimeout(url, options = {}, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } catch (error) {
    if (error?.name === "AbortError") {
      const timeoutError = new Error("Request timeout");
      timeoutError.code = "TIMEOUT";
      throw timeoutError;
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchPortfolio() {
  const response = await fetchWithTimeout(PORTFOLIO_ENDPOINT, {
    headers: {
      Accept: "application/json"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const httpError = new Error(`Failed to fetch portfolio: ${response.status}`);
    httpError.code = "HTTP_ERROR";
    httpError.status = response.status;
    throw httpError;
  }

  const payload = await response.json();
  return payload;
}

export async function getPortfolioMeta() {
  const response = await fetchWithTimeout(PORTFOLIO_META_ENDPOINT, {
    headers: {
      Accept: "application/json"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const httpError = new Error(`Failed to fetch portfolio meta: ${response.status}`);
    httpError.code = "HTTP_ERROR";
    httpError.status = response.status;
    throw httpError;
  }

  const payload = await response.json();
  return payload && typeof payload === "object" ? payload : {};
}

export async function getPortfolioData() {
  const data = await fetchPortfolio();
  return data && typeof data === "object" ? data : {};
}

export async function getPortfolioProjects() {
  const data = await fetchPortfolio();
  return Array.isArray(data?.projects) ? data.projects : [];
}

export async function getPortfolioDynamicSections() {
  const data = await fetchPortfolio();
  return {
    skills: Array.isArray(data?.skills) ? data.skills : [],
    projects: Array.isArray(data?.projects) ? data.projects : [],
    experiences: Array.isArray(data?.experiences) ? data.experiences : []
  };
}
