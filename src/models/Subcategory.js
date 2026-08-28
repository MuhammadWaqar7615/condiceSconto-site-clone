import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Subcategory title is required"],
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Parent category is required"],
    },
    seoTitle: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    seoDescription: {
      type: String,
      trim: true,
      maxlength: 320,
    },
    status: {
      type: String,
      enum: ["enabled", "disabled"],
      default: "enabled",
    },
  },
  { timestamps: true }
);

subcategorySchema.index({ parentCategory: 1, title: 1 });
subcategorySchema.index({ status: 1 });

const Subcategory = mongoose.models.Subcategory || mongoose.model("Subcategory", subcategorySchema);

export default Subcategory;
