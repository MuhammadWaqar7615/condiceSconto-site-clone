import { NextResponse } from "next/server";
import PromoBanner from "@/models/PromoBanner";
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
    if (["enabled", "disabled"].includes(status)) query.status = status;
    const promoBanners = await PromoBanner.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ promoBanners });
  } catch (error) {
    console.error("GET /api/promo-banners Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authError = await requireAdmin();
    if (authError) return NextResponse.json({ message: authError.message }, { status: authError.status });
    const body = await request.json();
    if (!body.heading?.trim() || !body.description?.trim() || !body.image?.trim()) {
      return NextResponse.json({ message: "Heading, description, and image are required." }, { status: 400 });
    }
    await connectMongo();
    const promoBanner = await PromoBanner.create({
      heading: body.heading,
      description: body.description,
      image: body.image,
      imagePublicId: body.imagePublicId,
      status: body.status,
    });
    return NextResponse.json({ promoBanner }, { status: 201 });
  } catch (error) {
    console.error("POST /api/promo-banners Error:", error);
    if (error.name === "ValidationError") return NextResponse.json({ message: Object.values(error.errors).map((item) => item.message).join(", ") }, { status: 400 });
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
