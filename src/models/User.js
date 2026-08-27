import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true, maxlength: 120 },
    email: { type: String, required: [true, "Email is required"], trim: true, lowercase: true, unique: true, maxlength: 160 },
    description: { type: String, trim: true, maxlength: 500 },
    passwordHash: { type: String, required: [true, "Password is required"] },
    role: { type: String, enum: ["administration", "editor", "subscribor"], default: "subscribor" },
    verified: { type: Boolean, default: false },
    status: { type: String, enum: ["enabled", "disabled"], default: "enabled" },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
