export function isObjectLike(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function isString(value) {
  return typeof value === "string";
}

export function isOptionalString(value) {
  return value === undefined || isString(value);
}

export function buildBadRequest(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}
