import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    phone: { type: String, trim: true, maxlength: 30, default: "" },
    subject: { type: String, required: true, trim: true, maxlength: 160 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    consentAt: { type: Date, required: true },
    notificationStatus: {
      type: String,
      enum: ["pending", "sent", "failed", "not_configured"],
      default: "pending",
    },
    senderConfirmationStatus: {
      type: String,
      enum: ["pending", "sent", "failed", "not_configured"],
      default: "pending",
    },
    adminStatus: {
      type: String,
      enum: ["new", "replied", "archived"],
      default: "new",
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.ContactMessage ||
  mongoose.model("ContactMessage", contactMessageSchema);
