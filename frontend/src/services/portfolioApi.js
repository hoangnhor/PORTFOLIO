export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000").replace(/\/$/, "");

const PORTFOLIO_ENDPOINT = `${API_BASE_URL}/api/portfolio`;
const PROJECTS_CACHE_KEY = "portfolio_projects_cache_v3";
const DYNAMIC_CACHE_KEY = "portfolio_dynamic_sections_cache_v1";
const PROJECTS_CACHE_TTL_MS = 5 * 60 * 1000;
const PROJECTS_REQUEST_TIMEOUT_MS = 10000;

function readProjectsCache() {
  try {
    const raw = localStorage.getItem(PROJECTS_CACHE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.projects) || typeof parsed.updatedAt !== "number") {
      localStorage.removeItem(PROJECTS_CACHE_KEY);
      return null;
    }

    if (Date.now() - parsed.updatedAt > PROJECTS_CACHE_TTL_MS) {
      localStorage.removeItem(PROJECTS_CACHE_KEY);
      return null;
    }

    return parsed.projects;
  } catch {
    localStorage.removeItem(PROJECTS_CACHE_KEY);
    return null;
  }
}

function writeProjectsCache(projects) {
  try {
    localStorage.setItem(
      PROJECTS_CACHE_KEY,
      JSON.stringify({
        projects,
        updatedAt: Date.now()
      })
    );
  } catch {
    // ignore cache write errors
  }
}

async function fetchWithTimeout(url, options = {}, timeoutMs = PROJECTS_REQUEST_TIMEOUT_MS) {
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

export async function getPortfolioProjects({ skipCache = false } = {}) {
  const cached = skipCache ? null : readProjectsCache();
  if (cached) {
    return cached;
  }

  const response = await fetchWithTimeout(PORTFOLIO_ENDPOINT, {
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    const httpError = new Error(`Failed to fetch portfolio: ${response.status}`);
    httpError.code = "HTTP_ERROR";
    httpError.status = response.status;
    throw httpError;
  }

  const data = await response.json();
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  writeProjectsCache(projects);
  return projects;
}

function readDynamicCache() {
  try {
    const raw = localStorage.getItem(DYNAMIC_CACHE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.updatedAt !== "number" || typeof parsed.data !== "object") {
      localStorage.removeItem(DYNAMIC_CACHE_KEY);
      return null;
    }

    if (Date.now() - parsed.updatedAt > PROJECTS_CACHE_TTL_MS) {
      localStorage.removeItem(DYNAMIC_CACHE_KEY);
      return null;
    }

    return parsed.data;
  } catch {
    localStorage.removeItem(DYNAMIC_CACHE_KEY);
    return null;
  }
}

function writeDynamicCache(data) {
  try {
    localStorage.setItem(
      DYNAMIC_CACHE_KEY,
      JSON.stringify({
        data,
        updatedAt: Date.now()
      })
    );
  } catch {
    // ignore cache write errors
  }
}

export async function getPortfolioDynamicSections({ skipCache = false } = {}) {
  const cached = skipCache ? null : readDynamicCache();
  if (cached) {
    return cached;
  }

  const response = await fetchWithTimeout(PORTFOLIO_ENDPOINT, {
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    const httpError = new Error(`Failed to fetch portfolio: ${response.status}`);
    httpError.code = "HTTP_ERROR";
    httpError.status = response.status;
    throw httpError;
  }

  const data = await response.json();
  const dynamicSections = {
    skills: Array.isArray(data?.skills) ? data.skills : [],
    projects: Array.isArray(data?.projects) ? data.projects : [],
    experiences: Array.isArray(data?.experiences) ? data.experiences : []
  };

  writeDynamicCache(dynamicSections);
  return dynamicSections;
}
