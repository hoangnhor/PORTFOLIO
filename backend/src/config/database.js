import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase() {
  await mongoose.connect(env.mongoUri, {
    maxPoolSize: 20,
    minPoolSize: 3,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000
  });
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
}
