const ROOT_FIELDS = [
  "fullName",
  "headline",
  "intro",
  "careerObjective",
  "location",
  "email",
  "phone",
  "birthDate",
  "resumeUrl",
  "cvRawText",
  "socials",
  "education",
  "skills",
  "projects",
  "experiences"
];

const ARRAY_FIELDS = ["socials", "education", "skills", "projects", "experiences"];

function isObjectLike(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function validatePortfolioPayload(req, res, next) {
  const payload = req.body;

  if (!isObjectLike(payload)) {
    return res.status(400).json({ message: "Payload must be a JSON object" });
  }

  const unknown = Object.keys(payload).filter((key) => !ROOT_FIELDS.includes(key));
  if (unknown.length) {
    return res.status(400).json({ message: `Unknown fields: ${unknown.join(", ")}` });
  }

  for (const key of ARRAY_FIELDS) {
    if (key in payload && !Array.isArray(payload[key])) {
      return res.status(400).json({ message: `${key} must be an array` });
    }
  }

  return next();
}
