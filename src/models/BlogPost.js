import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Blog post title is required"], trim: true, maxlength: 180 },
    description: { type: String, required: [true, "Blog post description is required"], trim: true, maxlength: 800 },
    image: { type: String, required: [true, "Blog post image is required"], trim: true, default: "/images/placeholder.png" },
    imagePublicId: { type: String, default: "" },
    status: { type: String, enum: ["enabled", "disabled"], default: "enabled" },
  },
  { timestamps: true }
);

blogPostSchema.index({ status: 1, createdAt: -1 });

const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;
