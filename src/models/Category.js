import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required"],
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    icon: {
      type: String,
      trim: true,
      default: "",
    },
    showInMenu: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
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
    image: {
      type: String,
      trim: true,
      default: "/images/placeholder.png",
    },
  },
  { timestamps: true }
);

categorySchema.index({ title: 1 });
categorySchema.index({ status: 1, showInMenu: 1 });

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
