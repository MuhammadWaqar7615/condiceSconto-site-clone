import { NextResponse } from "next/server";
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

export async function GET(request) {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const showInMenu = searchParams.get("showInMenu");
    const query = {};

    if (["enabled", "disabled"].includes(status)) query.status = status;
    if (showInMenu === "true" || showInMenu === "false") query.showInMenu = showInMenu === "true";

    const categories = await Category.find(query).sort({ title: 1 }).lean();
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("GET /api/categories Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authError = await requireAdmin();
    if (authError) return NextResponse.json({ message: authError.message }, { status: authError.status });

    await connectMongo();
    const body = await request.json();
    if (!body.title?.trim()) {
      return NextResponse.json({ message: "Title is required." }, { status: 400 });
    }

    const category = await Category.create({
      title: body.title,
      slug: body.slug,
      description: body.description,
      icon: body.icon,
      showInMenu: body.showInMenu,
      featured: body.featured,
      seoTitle: body.seoTitle,
      seoDescription: body.seoDescription,
      status: body.status,
      image: body.image,
      imagePublicId: body.imagePublicId,
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error("POST /api/categories Error:", error);
    if (error.name === "ValidationError") {
      return NextResponse.json({ message: Object.values(error.errors).map((item) => item.message).join(", ") }, { status: 400 });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
