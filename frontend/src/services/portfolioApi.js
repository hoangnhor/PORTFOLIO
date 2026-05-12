export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000").replace(/\/$/, "");

const PORTFOLIO_ENDPOINT = `${API_BASE_URL}/api/portfolio`;

export async function getPortfolio() {
  const response = await fetch(PORTFOLIO_ENDPOINT);

  if (!response.ok) {
    throw new Error(`Failed to fetch portfolio: ${response.status}`);
  }

  return response.json();
}
