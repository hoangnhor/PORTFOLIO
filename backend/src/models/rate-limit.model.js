import mongoose from "mongoose";

const { Schema, model } = mongoose;

const rateLimitSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    count: { type: Number, required: true, default: 0 },
    resetAt: { type: Date, required: true }
  },
  { timestamps: true, collection: "rate_limits" }
);

rateLimitSchema.index({ resetAt: 1 }, { expireAfterSeconds: 0 });

const RateLimitBucket = model("RateLimitBucket", rateLimitSchema);

export default RateLimitBucket;
