import mongoose from "mongoose";

const { Schema, model } = mongoose;

const urlRegex = /^https?:\/\/.+/i;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const socialSchema = new Schema(
  {
    kind: { type: String, default: "", trim: true, maxlength: 40 },
    label: { type: String, required: true, trim: true, maxlength: 80 },
    url: { type: String, required: true, trim: true, match: urlRegex }
  },
  { _id: false }
);

const skillSchema = new Schema(
  {
    category: { type: String, required: true, trim: true, maxlength: 80 },
    items: { type: [String], default: [] }
  },
  { _id: false }
);

const linkSchema = new Schema(
  {
    kind: { type: String, default: "", trim: true, maxlength: 40 },
    label: { type: String, required: true, trim: true, maxlength: 80 },
    url: { type: String, required: true, trim: true, match: urlRegex }
  },
  { _id: false }
);

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 140 },
    role: { type: String, default: "", trim: true, maxlength: 120 },
    period: { type: String, default: "", trim: true, maxlength: 80 },
    summary: { type: String, required: true, trim: true, maxlength: 1200 },
    stack: { type: [String], default: [] },
    links: { type: [linkSchema], default: [] },
    highlights: { type: [String], default: [] },
    featured: { type: Boolean, default: false }
  },
  { _id: false }
);

const experienceSchema = new Schema(
  {
    company: { type: String, required: true, trim: true, maxlength: 140 },
    role: { type: String, required: true, trim: true, maxlength: 140 },
    period: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, required: true, trim: true, maxlength: 1600 },
    details: { type: [String], default: [] }
  },
  { _id: false }
);

const educationSchema = new Schema(
  {
    school: { type: String, required: true, trim: true, maxlength: 140 },
    period: { type: String, required: true, trim: true, maxlength: 80 },
    major: { type: String, default: "", trim: true, maxlength: 140 },
    track: { type: String, default: "", trim: true, maxlength: 200 },
    details: { type: [String], default: [] }
  },
  { _id: false }
);

const portfolioSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "main", immutable: true },
    fullName: { type: String, required: true, trim: true, maxlength: 120 },
    headline: { type: String, required: true, trim: true, maxlength: 120 },
    intro: { type: String, required: true, trim: true, maxlength: 2000 },
    careerObjective: { type: String, default: "", trim: true, maxlength: 3000 },
    location: { type: String, default: "", trim: true, maxlength: 160 },
    email: { type: String, required: true, trim: true, lowercase: true, match: emailRegex },
    phone: { type: String, default: "", trim: true, maxlength: 40 },
    birthDate: { type: String, default: "", trim: true, maxlength: 40 },
    resumeUrl: { type: String, default: "", trim: true },
    cvRawText: { type: String, default: "", trim: true },
    socials: { type: [socialSchema], default: [] },
    education: { type: [educationSchema], default: [] },
    skills: { type: [skillSchema], default: [] },
    projects: { type: [projectSchema], default: [] },
    experiences: { type: [experienceSchema], default: [] }
  },
  { timestamps: true }
);

portfolioSchema.index({ updatedAt: -1 });
portfolioSchema.index({ "projects.featured": 1 });

const Portfolio = model("Portfolio", portfolioSchema);

export default Portfolio;
