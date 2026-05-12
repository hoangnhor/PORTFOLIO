export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000").replace(/\/$/, "");

const PORTFOLIO_ENDPOINT = `${API_BASE_URL}/api/portfolio`;
const PROJECTS_CACHE_KEY = "portfolio_projects_cache_v1";
const PROJECTS_CACHE_TTL_MS = 5 * 60 * 1000;

function readProjectsCache() {
  try {
    const raw = localStorage.getItem(PROJECTS_CACHE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.projects) || typeof parsed.updatedAt !== "number") {
      return null;
    }

    if (Date.now() - parsed.updatedAt > PROJECTS_CACHE_TTL_MS) {
      return null;
    }

    return parsed.projects;
  } catch {
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

export async function getPortfolioProjects() {
  const cached = readProjectsCache();
  if (cached) {
    return cached;
  }

  const response = await fetch(PORTFOLIO_ENDPOINT);
  if (!response.ok) {
    throw new Error(`Failed to fetch portfolio: ${response.status}`);
  }

  const data = await response.json();
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  writeProjectsCache(projects);
  return projects;
}
