import mongoose from "mongoose";

const contentItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["testimonial", "insight"],
      index: true,
    },
    quote: { type: String, trim: true, maxlength: 1600 },
    format: { type: String, enum: ["quote", "video"] },
    name: { type: String, trim: true, maxlength: 120 },
    role: { type: String, trim: true, maxlength: 160 },
    title: { type: String, trim: true, maxlength: 180 },
    slug: { type: String, trim: true, lowercase: true, maxlength: 200 },
    category: { type: String, trim: true, maxlength: 100 },
    excerpt: { type: String, trim: true, maxlength: 400 },
    body: { type: String, trim: true, maxlength: 20000 },
    image: {
      url: { type: String, trim: true, maxlength: 1000 },
      alt: { type: String, trim: true, maxlength: 250 },
    },
    video: {
      provider: { type: String, enum: ["youtube", "cloudinary"] },
      url: { type: String, trim: true, maxlength: 1000 },
    },
    published: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date },
  },
  { timestamps: true },
);

contentItemSchema.index(
  { type: 1, slug: 1 },
  { unique: true, partialFilterExpression: { slug: { $type: "string" } } },
);

export default mongoose.models.ContentItem ||
  mongoose.model("ContentItem", contentItemSchema);
