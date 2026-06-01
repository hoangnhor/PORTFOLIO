import { findPortfolio, findPortfolioMeta, upsertPortfolio } from "../repositories/portfolio.repository.js";
import { defaultPortfolio } from "../utils/defaultPortfolio.js";

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
  const safePayload = {};
  const has = (key) => Object.prototype.hasOwnProperty.call(payload, key);

  if (has("fullName")) safePayload.fullName = sanitizeString(payload.fullName);
  if (has("headline")) safePayload.headline = sanitizeString(payload.headline);
  if (has("intro")) safePayload.intro = sanitizeString(payload.intro);
  if (has("careerObjective")) safePayload.careerObjective = sanitizeString(payload.careerObjective);
  if (has("location")) safePayload.location = sanitizeString(payload.location);
  if (has("email")) safePayload.email = sanitizeString(payload.email).toLowerCase();
  if (has("phone")) safePayload.phone = sanitizeString(payload.phone);
  if (has("birthDate")) safePayload.birthDate = sanitizeString(payload.birthDate);
  if (has("resumeUrl")) safePayload.resumeUrl = sanitizeString(payload.resumeUrl);
  if (has("cvRawText")) safePayload.cvRawText = sanitizeString(payload.cvRawText);
  if (has("socials")) safePayload.socials = sanitizeLinkList(payload.socials);

  if (has("education")) {
    safePayload.education = Array.isArray(payload.education)
      ? payload.education
          .filter((item) => item && typeof item === "object")
          .map((item) => ({
            school: sanitizeString(item.school),
            period: sanitizeString(item.period),
            major: sanitizeString(item.major),
            track: sanitizeString(item.track),
            details: sanitizeStringArray(item.details)
          }))
      : [];
  }

  if (has("skills")) {
    safePayload.skills = Array.isArray(payload.skills)
      ? payload.skills
          .filter((item) => item && typeof item === "object")
          .map((item) => ({
            category: sanitizeString(item.category),
            items: sanitizeStringArray(item.items)
          }))
      : [];
  }

  if (has("projects")) {
    safePayload.projects = Array.isArray(payload.projects)
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
      : [];
  }

  if (has("experiences")) {
    safePayload.experiences = Array.isArray(payload.experiences)
      ? payload.experiences
          .filter((item) => item && typeof item === "object")
          .map((item) => ({
            company: sanitizeString(item.company),
            role: sanitizeString(item.role),
            period: sanitizeString(item.period),
            description: sanitizeString(item.description),
            details: sanitizeStringArray(item.details)
          }))
      : [];
  }

  return safePayload;
}

export async function getPortfolioFromDb() {
  const existing = await findPortfolio();
  if (existing) {
    return existing;
  }
  return upsertPortfolio(defaultPortfolio);
}

export async function getPortfolioMetaFromDb() {
  const existingMeta = await findPortfolioMeta();
  if (existingMeta) {
    return existingMeta;
  }
  const created = await upsertPortfolio(defaultPortfolio);
  return { updatedAt: created?.updatedAt || null };
}

export async function upsertPortfolioToDb(payload) {
  const safePayload = sanitizePortfolioPayload(payload);
  return upsertPortfolio(safePayload);
}
