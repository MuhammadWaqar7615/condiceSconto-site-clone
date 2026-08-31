import mongoose from "mongoose";

const promoBannerSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, "Promo banner heading is required"],
      trim: true,
      maxlength: 180,
    },
    description: {
      type: String,
      required: [true, "Promo banner description is required"],
      trim: true,
      maxlength: 600,
    },
    image: {
      type: String,
      required: [true, "Promo banner image is required"],
      trim: true,
      default: "/images/placeholder.png",
    },
    imagePublicId: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["enabled", "disabled"],
      default: "enabled",
    },
  },
  { timestamps: true }
);

promoBannerSchema.index({ status: 1, createdAt: -1 });

const PromoBanner = mongoose.models.PromoBanner || mongoose.model("PromoBanner", promoBannerSchema);

export default PromoBanner;
