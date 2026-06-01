import { httpRegex } from "./constants.js";
import { buildBadRequest, isObjectLike, isOptionalString, isString } from "./helpers.js";

export function validateStringArray(field, value) {
  if (!Array.isArray(value)) {
    throw buildBadRequest(`${field} must be an array`);
  }

  const hasInvalid = value.some((item) => !isString(item));
  if (hasInvalid) {
    throw buildBadRequest(`${field} must be an array of strings`);
  }
}

export function validateLinkArray(field, value) {
  if (!Array.isArray(value)) {
    throw buildBadRequest(`${field} must be an array`);
  }

  value.forEach((item, index) => {
    if (!isObjectLike(item)) {
      throw buildBadRequest(`${field}[${index}] must be an object`);
    }
    if (!isString(item.label) || !item.label.trim()) {
      throw buildBadRequest(`${field}[${index}].label is required`);
    }
    if (!isString(item.url) || !httpRegex.test(item.url.trim())) {
      throw buildBadRequest(`${field}[${index}].url must be a valid http/https URL`);
    }
  });
}

export function validateEducation(value) {
  if (!Array.isArray(value)) {
    throw buildBadRequest("education must be an array");
  }

  value.forEach((item, index) => {
    if (!isObjectLike(item)) {
      throw buildBadRequest(`education[${index}] must be an object`);
    }
    if (!isString(item.school) || !item.school.trim()) {
      throw buildBadRequest(`education[${index}].school is required`);
    }
    if (!isString(item.period) || !item.period.trim()) {
      throw buildBadRequest(`education[${index}].period is required`);
    }
    if (!isOptionalString(item.major)) {
      throw buildBadRequest(`education[${index}].major must be a string`);
    }
    if (!isOptionalString(item.track)) {
      throw buildBadRequest(`education[${index}].track must be a string`);
    }
    validateStringArray(`education[${index}].details`, item.details || []);
  });
}

export function validateSkills(value) {
  if (!Array.isArray(value)) {
    throw buildBadRequest("skills must be an array");
  }

  value.forEach((item, index) => {
    if (!isObjectLike(item)) {
      throw buildBadRequest(`skills[${index}] must be an object`);
    }
    if (!isString(item.category) || !item.category.trim()) {
      throw buildBadRequest(`skills[${index}].category is required`);
    }
    validateStringArray(`skills[${index}].items`, item.items || []);
  });
}

export function validateProjects(value) {
  if (!Array.isArray(value)) {
    throw buildBadRequest("projects must be an array");
  }

  value.forEach((item, index) => {
    if (!isObjectLike(item)) {
      throw buildBadRequest(`projects[${index}] must be an object`);
    }
    if (!isString(item.title) || !item.title.trim()) {
      throw buildBadRequest(`projects[${index}].title is required`);
    }
    if (!isString(item.summary) || !item.summary.trim()) {
      throw buildBadRequest(`projects[${index}].summary is required`);
    }
    if (!isOptionalString(item.role)) {
      throw buildBadRequest(`projects[${index}].role must be a string`);
    }
    if (!isOptionalString(item.period)) {
      throw buildBadRequest(`projects[${index}].period must be a string`);
    }
    validateStringArray(`projects[${index}].stack`, item.stack || []);
    validateLinkArray(`projects[${index}].links`, item.links || []);
    validateStringArray(`projects[${index}].highlights`, item.highlights || []);
  });
}

export function validateExperiences(value) {
  if (!Array.isArray(value)) {
    throw buildBadRequest("experiences must be an array");
  }

  value.forEach((item, index) => {
    if (!isObjectLike(item)) {
      throw buildBadRequest(`experiences[${index}] must be an object`);
    }
    if (!isString(item.company) || !item.company.trim()) {
      throw buildBadRequest(`experiences[${index}].company is required`);
    }
    if (!isString(item.role) || !item.role.trim()) {
      throw buildBadRequest(`experiences[${index}].role is required`);
    }
    if (!isString(item.period) || !item.period.trim()) {
      throw buildBadRequest(`experiences[${index}].period is required`);
    }
    if (!isOptionalString(item.description)) {
      throw buildBadRequest(`experiences[${index}].description must be a string`);
    }
    validateStringArray(`experiences[${index}].details`, item.details || []);
  });
}
