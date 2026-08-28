import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Category from "@/models/Category";
import connectMongo from "@/lib/mongodb";
import { getSession } from "@/lib/auth/session";
import { ROLES } from "@/lib/auth/roles";
import cloudinary from "@/lib/cloudinary";

async function requireAdmin() {
  const session = await getSession();
  if (!session?.user) return { message: "Unauthorized", status: 401 };
  if (session.user.role !== ROLES.ADMIN) return { message: "Forbidden", status: 403 };
  return null;
}

function validateId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!validateId(id)) return NextResponse.json({ message: "Invalid category ID" }, { status: 400 });
    await connectMongo();
    const category = await Category.findById(id).lean();
    if (!category) return NextResponse.json({ message: "Category not found" }, { status: 404 });
    return NextResponse.json({ category });
  } catch (error) {
    console.error("GET /api/categories/[id] Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const authError = await requireAdmin();
    if (authError) return NextResponse.json({ message: authError.message }, { status: authError.status });
    const { id } = await params;
    if (!validateId(id)) return NextResponse.json({ message: "Invalid category ID" }, { status: 400 });

    await connectMongo();
    const body = await request.json();

    // Check if image changed and delete old image from Cloudinary
    const currentCategory = await Category.findById(id);
    if (currentCategory && currentCategory.imagePublicId && body.imagePublicId && currentCategory.imagePublicId !== body.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(currentCategory.imagePublicId);
      } catch (err) {
        console.error("Failed to delete old category image from Cloudinary:", err);
      }
    }

    const category = await Category.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
    if (!category) return NextResponse.json({ message: "Category not found" }, { status: 404 });
    return NextResponse.json({ category });
  } catch (error) {
    console.error("PUT /api/categories/[id] Error:", error);
    if (error.name === "ValidationError") {
      return NextResponse.json({ message: Object.values(error.errors).map((item) => item.message).join(", ") }, { status: 400 });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const authError = await requireAdmin();
    if (authError) return NextResponse.json({ message: authError.message }, { status: authError.status });
    const { id } = await params;
    if (!validateId(id)) return NextResponse.json({ message: "Invalid category ID" }, { status: 400 });

    await connectMongo();
    const categoryToDelete = await Category.findById(id);
    if (!categoryToDelete) return NextResponse.json({ message: "Category not found" }, { status: 404 });

    // Delete image from Cloudinary if it exists
    if (categoryToDelete.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(categoryToDelete.imagePublicId);
      } catch (err) {
        console.error("Failed to delete category image from Cloudinary:", err);
      }
    }

    await Category.findByIdAndDelete(id);
    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/categories/[id] Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
