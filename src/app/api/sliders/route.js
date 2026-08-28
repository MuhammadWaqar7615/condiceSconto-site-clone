import { NextResponse } from "next/server";
import Slider from "@/models/Slider";
import connectMongo from "@/lib/mongodb";
import { getSession } from "@/lib/auth/session";
import { ROLES } from "@/lib/auth/roles";

async function requireAdmin() {
  const session = await getSession();
  if (!session?.user) return { message: "Unauthorized", status: 401 };
  if (![ROLES.ADMIN, ROLES.ADMINISTRATION].includes(session.user.role)) return { message: "Forbidden", status: 403 };
  return null;
}

export async function GET(request) {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const query = {};
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");
    if (["enabled", "disabled"].includes(status)) query.status = status;
    if (featured === "true" || featured === "false") query.featured = featured === "true";
    const sliders = await Slider.find(query).sort({ featured: -1, createdAt: -1 }).lean();
    return NextResponse.json({ sliders });
  } catch (error) {
    console.error("GET /api/sliders Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authError = await requireAdmin();
    if (authError) return NextResponse.json({ message: authError.message }, { status: authError.status });
    const body = await request.json();
    if (!body.title?.trim()) return NextResponse.json({ message: "Title is required." }, { status: 400 });
    await connectMongo();
    const slider = await Slider.create({ title: body.title, description: body.description, discount: body.discount, logo: body.logo, link: body.link, featured: body.featured, seoTitle: body.seoTitle, seoDescription: body.seoDescription, status: body.status, image: body.image });
    return NextResponse.json({ slider }, { status: 201 });
  } catch (error) {
    console.error("POST /api/sliders Error:", error);
    if (error.name === "ValidationError") return NextResponse.json({ message: Object.values(error.errors).map((item) => item.message).join(", ") }, { status: 400 });
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
