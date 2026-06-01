const SENSITIVE_KEYS = ["authorization", "x-admin-token", "cookie", "set-cookie", "token", "password", "secret"];

function redactObject(value) {
  if (!value || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => redactObject(item));
  }

  const cloned = {};
  for (const [key, itemValue] of Object.entries(value)) {
    const lowered = String(key).toLowerCase();
    if (SENSITIVE_KEYS.includes(lowered)) {
      cloned[key] = "[REDACTED]";
    } else {
      cloned[key] = redactObject(itemValue);
    }
  }
  return cloned;
}

function write(level, message, metadata = {}) {
  const payload = redactObject(metadata);
  const line = JSON.stringify({
    level,
    message,
    ...payload,
    time: new Date().toISOString()
  });

  if (level === "error") {
    console.error(line);
    return;
  }

  if (level === "warn") {
    console.warn(line);
    return;
  }

  console.info(line);
}

export const logger = {
  info(message, metadata) {
    write("info", message, metadata);
  },
  warn(message, metadata) {
    write("warn", message, metadata);
  },
  error(message, metadata) {
    write("error", message, metadata);
  }
};
