import { NextResponse } from "next/server";
import mongoose from "mongoose";
import BlogPost from "@/models/BlogPost";
import connectMongo from "@/lib/mongodb";
import { getSession } from "@/lib/auth/session";
import { ROLES } from "@/lib/auth/roles";

async function requireAdmin() {
  const session = await getSession();
  if (!session?.user) return { message: "Unauthorized", status: 401 };
  if (![ROLES.ADMIN, ROLES.ADMINISTRATION].includes(session.user.role)) return { message: "Forbidden", status: 403 };
  return null;
}

function validId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!validId(id)) return NextResponse.json({ message: "Invalid blog post ID" }, { status: 400 });
    await connectMongo();
    const post = await BlogPost.findById(id).lean();
    if (!post) return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
    return NextResponse.json({ post });
  } catch (error) {
    console.error("GET /api/blog/[id] Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const authError = await requireAdmin();
    if (authError) return NextResponse.json({ message: authError.message }, { status: authError.status });
    const { id } = await params;
    if (!validId(id)) return NextResponse.json({ message: "Invalid blog post ID" }, { status: 400 });
    const body = await request.json();
    if (!body.title?.trim() || !body.description?.trim() || !body.image?.trim()) return NextResponse.json({ message: "Title, description, and image are required." }, { status: 400 });
    await connectMongo();
    const post = await BlogPost.findByIdAndUpdate(id, { title: body.title, description: body.description, image: body.image, status: body.status }, { new: true, runValidators: true }).lean();
    if (!post) return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
    return NextResponse.json({ post });
  } catch (error) {
    console.error("PUT /api/blog/[id] Error:", error);
    if (error.name === "ValidationError") return NextResponse.json({ message: Object.values(error.errors).map((item) => item.message).join(", ") }, { status: 400 });
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const authError = await requireAdmin();
    if (authError) return NextResponse.json({ message: authError.message }, { status: authError.status });
    const { id } = await params;
    if (!validId(id)) return NextResponse.json({ message: "Invalid blog post ID" }, { status: 400 });
    await connectMongo();
    const post = await BlogPost.findByIdAndDelete(id);
    if (!post) return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/blog/[id] Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
