import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, unique: true, index: true },
    donorName: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    phone: { type: String, trim: true, maxlength: 30 },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, required: true, default: "KES" },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
      index: true,
    },
    paystackStatus: { type: String, default: "" },
    receiptEmailSentAt: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.models.Donation ||
  mongoose.model("Donation", donationSchema);
