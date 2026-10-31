import mongoose from "mongoose";

const newsletterSubscriptionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    active: { type: Boolean, default: true, index: true },
    subscribedAt: { type: Date, default: Date.now },
    consentAt: { type: Date, required: true },
    confirmationSentAt: { type: Date },
    confirmationEmailStatus: {
      type: String,
      enum: ["pending", "sent", "failed", "not_configured"],
      default: "pending",
    },
    unsubscribedAt: { type: Date },
  },
  { timestamps: true },
);

newsletterSubscriptionSchema.index({ email: 1 }, { unique: true });

export default mongoose.models.NewsletterSubscription ||
  mongoose.model("NewsletterSubscription", newsletterSubscriptionSchema);
