import { NextResponse } from "next/server";
import mongoose from "mongoose";
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

function validId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

const fields = (body) => ({ title: body.title, description: body.description, discount: body.discount, logo: body.logo, link: body.link, featured: body.featured, seoTitle: body.seoTitle, seoDescription: body.seoDescription, status: body.status, image: body.image });

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!validId(id)) return NextResponse.json({ message: "Invalid slider ID" }, { status: 400 });
    await connectMongo();
    const slider = await Slider.findById(id).lean();
    if (!slider) return NextResponse.json({ message: "Slider not found" }, { status: 404 });
    return NextResponse.json({ slider });
  } catch (error) {
    console.error("GET /api/sliders/[id] Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const authError = await requireAdmin();
    if (authError) return NextResponse.json({ message: authError.message }, { status: authError.status });
    const { id } = await params;
    if (!validId(id)) return NextResponse.json({ message: "Invalid slider ID" }, { status: 400 });
    const body = await request.json();
    if (!body.title?.trim()) return NextResponse.json({ message: "Title is required." }, { status: 400 });
    await connectMongo();
    const slider = await Slider.findByIdAndUpdate(id, fields(body), { new: true, runValidators: true }).lean();
    if (!slider) return NextResponse.json({ message: "Slider not found" }, { status: 404 });
    return NextResponse.json({ slider });
  } catch (error) {
    console.error("PUT /api/sliders/[id] Error:", error);
    if (error.name === "ValidationError") return NextResponse.json({ message: Object.values(error.errors).map((item) => item.message).join(", ") }, { status: 400 });
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const authError = await requireAdmin();
    if (authError) return NextResponse.json({ message: authError.message }, { status: authError.status });
    const { id } = await params;
    if (!validId(id)) return NextResponse.json({ message: "Invalid slider ID" }, { status: 400 });
    await connectMongo();
    const slider = await Slider.findByIdAndDelete(id);
    if (!slider) return NextResponse.json({ message: "Slider not found" }, { status: 404 });
    return NextResponse.json({ message: "Slider deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/sliders/[id] Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
