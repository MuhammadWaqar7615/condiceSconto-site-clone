import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Store name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Store slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    logoPath: {
      type: String,
      required: [true, "Store logo is required"],
      default: "/images/placeholder.png",
    },
    logoPublicId: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      trim: true,
    },
    websiteUrl: {
      type: String,
      trim: true,
    },
    categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    }],
    subcategories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose caches models; if it's already compiled, use that one.
const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);

export default Store;
