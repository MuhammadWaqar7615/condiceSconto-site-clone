import { notFound } from "next/navigation";
import { requireRole } from "@/lib/auth/auth";
import { ROLES } from "@/lib/auth/roles";
import connectMongo from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import BlogPostForm from "@/components/admin/blog/BlogPostForm";

export const metadata = { title: "Edit Blog Post | CodiceSconto Admin" };

export default async function EditBlogPostPage({ params }) {
  await requireRole([ROLES.ADMIN, ROLES.ADMINISTRATION]);
  const { id } = await params;
  await connectMongo();
  const post = await BlogPost.findById(id).lean();
  if (!post) notFound();
  return <BlogPostForm post={{ ...post, _id: post._id.toString() }} />;
}
