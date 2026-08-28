import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: [true, "Store ID is required"],
    },
    type: {
      type: String,
      enum: ["code", "link"],
      required: [true, "Coupon type is required"],
    },
    title: {
      type: String,
      required: [true, "Coupon title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Coupon description is required"],
      trim: true,
    },
    code: {
      type: String,
      trim: true,
      // Required if type is 'code'
    },
    couponUrl: {
      type: String,
      trim: true,
      // Required if type is 'link'
    },
    discount: {
      type: String,
      required: [true, "Discount value is required"],
      trim: true,
    },
    terms: {
      type: String,
      trim: true,
    },
    startsAt: {
      type: Date,
    },
    expiresAt: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    homepageSection: {
      type: String,
      enum: ["featured", "secondary", "new", "expiring"],
      default: "featured",
    },
    image: {
      type: String,
      trim: true,
      default: "/images/placeholder.png",
    },
    labelTop: {
      type: String,
      trim: true,
      maxlength: 40,
    },
    labelBottom: {
      type: String,
      trim: true,
      maxlength: 40,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-validate hook to ensure correct fields based on type
couponSchema.pre("validate", function () {
  if (this.type === "code" && !this.code) {
    this.invalidate("code", "Coupon code is required for code type coupons.");
  }
  if (this.type === "link" && !this.couponUrl) {
    this.invalidate("couponUrl", "Coupon URL is required for link type coupons.");
  }
  if (this.startsAt && this.expiresAt && this.expiresAt < this.startsAt) {
    this.invalidate("expiresAt", "Expiry date cannot be before start date.");
  }
});

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);

export default Coupon;
