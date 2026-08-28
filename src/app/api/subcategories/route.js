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

async function validateParent(parentCategory) {
  if (!validId(parentCategory)) return false;
  return Boolean(await Category.exists({ _id: parentCategory }));
}

export async function GET(request) {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const parentCategory = searchParams.get("parentCategory");
    const query = {};

    if (["enabled", "disabled"].includes(status)) query.status = status;
    if (parentCategory && validId(parentCategory)) query.parentCategory = parentCategory;

    const subcategories = await Subcategory.find(query)
      .populate("parentCategory", "title")
      .sort({ title: 1 })
      .lean();

    return NextResponse.json({ subcategories });
  } catch (error) {
    console.error("GET /api/subcategories Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authError = await requireAdmin();
    if (authError) return NextResponse.json({ message: authError.message }, { status: authError.status });

    await connectMongo();
    const body = await request.json();
    if (!body.title?.trim()) return NextResponse.json({ message: "Title is required." }, { status: 400 });
    if (!(await validateParent(body.parentCategory))) {
      return NextResponse.json({ message: "A valid parent category is required." }, { status: 400 });
    }

    const subcategory = await Subcategory.create({
      title: body.title,
      description: body.description,
      parentCategory: body.parentCategory,
      seoTitle: body.seoTitle,
      seoDescription: body.seoDescription,
      status: body.status,
    });

    return NextResponse.json({ subcategory }, { status: 201 });
  } catch (error) {
    console.error("POST /api/subcategories Error:", error);
    if (error.name === "ValidationError") {
      return NextResponse.json({ message: Object.values(error.errors).map((item) => item.message).join(", ") }, { status: 400 });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
