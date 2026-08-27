import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Subcategory from "@/models/Subcategory";
import Category from "@/models/Category";
import connectMongo from "@/lib/mongodb";
import { getSession } from "@/lib/auth/session";
import { ROLES } from "@/lib/auth/roles";

async function requireAdmin() {
  const session = await getSession();
  if (!session?.user) return { message: "Unauthorized", status: 401 };
  if (session.user.role !== ROLES.ADMIN) return { message: "Forbidden", status: 403 };
  return null;
}

function validId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function validParent(parentCategory) {
  return validId(parentCategory) && Boolean(await Category.exists({ _id: parentCategory }));
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!validId(id)) return NextResponse.json({ message: "Invalid subcategory ID" }, { status: 400 });
    await connectMongo();
    const subcategory = await Subcategory.findById(id).populate("parentCategory", "title").lean();
    if (!subcategory) return NextResponse.json({ message: "Subcategory not found" }, { status: 404 });
    return NextResponse.json({ subcategory });
  } catch (error) {
    console.error("GET /api/subcategories/[id] Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const authError = await requireAdmin();
    if (authError) return NextResponse.json({ message: authError.message }, { status: authError.status });
    const { id } = await params;
    if (!validId(id)) return NextResponse.json({ message: "Invalid subcategory ID" }, { status: 400 });

    const body = await request.json();
    if (!body.title?.trim()) return NextResponse.json({ message: "Title is required." }, { status: 400 });
    if (!(await validParent(body.parentCategory))) {
      return NextResponse.json({ message: "A valid parent category is required." }, { status: 400 });
    }

    await connectMongo();
    const subcategory = await Subcategory.findByIdAndUpdate(
      id,
      {
        title: body.title,
        description: body.description,
        parentCategory: body.parentCategory,
        seoTitle: body.seoTitle,
        seoDescription: body.seoDescription,
        status: body.status,
      },
      { new: true, runValidators: true }
    ).lean();

    if (!subcategory) return NextResponse.json({ message: "Subcategory not found" }, { status: 404 });
    return NextResponse.json({ subcategory });
  } catch (error) {
    console.error("PUT /api/subcategories/[id] Error:", error);
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
    if (!validId(id)) return NextResponse.json({ message: "Invalid subcategory ID" }, { status: 400 });

    await connectMongo();
    const subcategory = await Subcategory.findByIdAndDelete(id);
    if (!subcategory) return NextResponse.json({ message: "Subcategory not found" }, { status: 404 });
    return NextResponse.json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/subcategories/[id] Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
