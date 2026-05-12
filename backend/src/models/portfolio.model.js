import mongoose from "mongoose";

const { Schema, model } = mongoose;

const socialSchema = new Schema(
  {
    label: { type: String, required: true },
    url: { type: String, required: true }
  },
  { _id: false }
);

const skillSchema = new Schema(
  {
    category: { type: String, required: true },
    items: { type: [String], default: [] }
  },
  { _id: false }
);

const linkSchema = new Schema(
  {
    label: { type: String, required: true },
    url: { type: String, required: true }
  },
  { _id: false }
);

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    role: { type: String, default: "" },
    period: { type: String, default: "" },
    summary: { type: String, required: true },
    stack: { type: [String], default: [] },
    links: { type: [linkSchema], default: [] },
    highlights: { type: [String], default: [] },
    featured: { type: Boolean, default: false }
  },
  { _id: false }
);

const experienceSchema = new Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: [String], default: [] }
  },
  { _id: false }
);

const educationSchema = new Schema(
  {
    school: { type: String, required: true },
    period: { type: String, required: true },
    major: { type: String, default: "" },
    track: { type: String, default: "" }
  },
  { _id: false }
);

const portfolioSchema = new Schema(
  {
    fullName: { type: String, required: true },
    headline: { type: String, required: true },
    intro: { type: String, required: true },
    careerObjective: { type: String, default: "" },
    location: { type: String, default: "" },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    birthDate: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    cvRawText: { type: String, default: "" },
    socials: { type: [socialSchema], default: [] },
    education: { type: [educationSchema], default: [] },
    skills: { type: [skillSchema], default: [] },
    projects: { type: [projectSchema], default: [] },
    experiences: { type: [experienceSchema], default: [] }
  },
  { timestamps: true }
);

const Portfolio = model("Portfolio", portfolioSchema);

export default Portfolio;
