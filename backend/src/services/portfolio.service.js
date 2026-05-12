import { findPortfolio, upsertPortfolio } from "../repositories/portfolio.repository.js";

function sanitizeString(value, fallback = "") {
  if (typeof value !== "string") {
    return fallback;
  }
  return value.trim();
}

function sanitizeStringArray(items) {
  if (!Array.isArray(items)) {
    return [];
  }
  return items
    .map((item) => sanitizeString(item))
    .filter(Boolean);
}

function sanitizeLinkList(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      label: sanitizeString(item.label),
      url: sanitizeString(item.url)
    }))
    .filter((item) => item.label && item.url);
}

function sanitizePortfolioPayload(payload = {}) {
  return {
    fullName: sanitizeString(payload.fullName),
    headline: sanitizeString(payload.headline),
    intro: sanitizeString(payload.intro),
    careerObjective: sanitizeString(payload.careerObjective),
    location: sanitizeString(payload.location),
    email: sanitizeString(payload.email).toLowerCase(),
    phone: sanitizeString(payload.phone),
    birthDate: sanitizeString(payload.birthDate),
    resumeUrl: sanitizeString(payload.resumeUrl),
    cvRawText: sanitizeString(payload.cvRawText),
    socials: sanitizeLinkList(payload.socials),
    education: Array.isArray(payload.education)
      ? payload.education
          .filter((item) => item && typeof item === "object")
          .map((item) => ({
            school: sanitizeString(item.school),
            period: sanitizeString(item.period),
            major: sanitizeString(item.major),
            track: sanitizeString(item.track)
          }))
      : [],
    skills: Array.isArray(payload.skills)
      ? payload.skills
          .filter((item) => item && typeof item === "object")
          .map((item) => ({
            category: sanitizeString(item.category),
            items: sanitizeStringArray(item.items)
          }))
      : [],
    projects: Array.isArray(payload.projects)
      ? payload.projects
          .filter((item) => item && typeof item === "object")
          .map((item) => ({
            title: sanitizeString(item.title),
            role: sanitizeString(item.role),
            period: sanitizeString(item.period),
            summary: sanitizeString(item.summary),
            stack: sanitizeStringArray(item.stack),
            links: sanitizeLinkList(item.links),
            highlights: sanitizeStringArray(item.highlights),
            featured: Boolean(item.featured)
          }))
      : [],
    experiences: Array.isArray(payload.experiences)
      ? payload.experiences
          .filter((item) => item && typeof item === "object")
          .map((item) => ({
            company: sanitizeString(item.company),
            role: sanitizeString(item.role),
            period: sanitizeString(item.period),
            description: sanitizeString(item.description),
            details: sanitizeStringArray(item.details)
          }))
      : []
  };
}

export async function getPortfolioFromDb() {
  return findPortfolio();
}

export async function upsertPortfolioToDb(payload) {
  const safePayload = sanitizePortfolioPayload(payload);
  return upsertPortfolio(safePayload);
}
