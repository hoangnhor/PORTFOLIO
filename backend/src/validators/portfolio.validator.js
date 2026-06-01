import { ARRAY_FIELDS, emailRegex, httpRegex, ROOT_FIELDS } from "./portfolio/constants.js";
import { buildBadRequest, isObjectLike, isString } from "./portfolio/helpers.js";
import {
  validateEducation,
  validateExperiences,
  validateLinkArray,
  validateProjects,
  validateSkills
} from "./portfolio/rules.js";

export function validatePortfolioPayload(req, res, next) {
  try {
    const payload = req.body;

    if (!isObjectLike(payload)) {
      throw buildBadRequest("Payload must be a JSON object");
    }

    const unknown = Object.keys(payload).filter((key) => !ROOT_FIELDS.includes(key));
    if (unknown.length) {
      throw buildBadRequest(`Unknown fields: ${unknown.join(", ")}`);
    }

    for (const key of ARRAY_FIELDS) {
      if (key in payload && !Array.isArray(payload[key])) {
        throw buildBadRequest(`${key} must be an array`);
      }
    }

    if ("email" in payload && payload.email && (!isString(payload.email) || !emailRegex.test(payload.email.trim()))) {
      throw buildBadRequest("email must be a valid email address");
    }

    if ("resumeUrl" in payload && payload.resumeUrl && !isString(payload.resumeUrl)) {
      throw buildBadRequest("resumeUrl must be a string");
    }
    if ("resumeUrl" in payload && isString(payload.resumeUrl) && payload.resumeUrl.trim()) {
      const resumeValue = payload.resumeUrl.trim();
      const isPublicUrl = httpRegex.test(resumeValue);
      const isLocalAssetPath = /^[\w./-]+\.pdf$/i.test(resumeValue);
      if (!isPublicUrl && !isLocalAssetPath) {
        throw buildBadRequest("resumeUrl must be a valid URL or local PDF path");
      }
    }

    if ("socials" in payload) {
      validateLinkArray("socials", payload.socials);
    }
    if ("education" in payload) {
      validateEducation(payload.education);
    }
    if ("skills" in payload) {
      validateSkills(payload.skills);
    }
    if ("projects" in payload) {
      validateProjects(payload.projects);
    }
    if ("experiences" in payload) {
      validateExperiences(payload.experiences);
    }

    return next();
  } catch (error) {
    return res.status(error?.status || 400).json({
      message: error?.message || "Invalid payload",
      requestId: req.requestId || null
    });
  }
}
