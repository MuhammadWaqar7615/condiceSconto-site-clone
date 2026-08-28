import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Badge name is required"],
      trim: true,
      maxlength: 120,
    },
    image: {
      type: String,
      required: [true, "Badge image is required"],
      trim: true,
      default: "/images/placeholder.png",
    },
    imagePublicId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

badgeSchema.index({ name: 1 });

const Badge = mongoose.models.Badge || mongoose.model("Badge", badgeSchema);

export default Badge;
