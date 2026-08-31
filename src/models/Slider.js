import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Slider title is required"], trim: true, maxlength: 160 },
    description: { type: String, trim: true, maxlength: 500 },
    discount: { type: String, trim: true, maxlength: 80 },
    logo: { type: String, trim: true, default: "/images/placeholder.png" },
    logoPublicId: { type: String, default: "" },
    link: { type: String, trim: true, default: "#" },
    featured: { type: Boolean, default: false },
    seoTitle: { type: String, trim: true, maxlength: 160 },
    seoDescription: { type: String, trim: true, maxlength: 320 },
    status: { type: String, enum: ["enabled", "disabled"], default: "enabled" },
    image: { type: String, trim: true, default: "/images/placeholder.png" },
    imagePublicId: { type: String, default: "" },
  },
  { timestamps: true }
);

sliderSchema.index({ status: 1, featured: 1 });
sliderSchema.index({ title: 1 });

const Slider = mongoose.models.Slider || mongoose.model("Slider", sliderSchema);

export default Slider;
