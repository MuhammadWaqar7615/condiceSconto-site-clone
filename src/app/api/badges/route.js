import { NextResponse } from "next/server";
import Badge from "@/models/Badge";
import connectMongo from "@/lib/mongodb";
import { getSession } from "@/lib/auth/session";
import { ROLES } from "@/lib/auth/roles";

async function requireAdmin() {
  const session = await getSession();
  if (!session?.user) return { message: "Unauthorized", status: 401 };
  if (![ROLES.ADMIN, ROLES.ADMINISTRATION].includes(session.user.role)) return { message: "Forbidden", status: 403 };
  return null;
}

export async function GET() {
  try {
    await connectMongo();
    const badges = await Badge.find().sort({ name: 1 }).lean();
    return NextResponse.json({ badges });
  } catch (error) {
    console.error("GET /api/badges Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authError = await requireAdmin();
    if (authError) return NextResponse.json({ message: authError.message }, { status: authError.status });
    const body = await request.json();
    if (!body.name?.trim() || !body.image?.trim()) {
      return NextResponse.json({ message: "Name and image are required." }, { status: 400 });
    }
    await connectMongo();
    const badge = await Badge.create({ name: body.name, image: body.image });
    return NextResponse.json({ badge }, { status: 201 });
  } catch (error) {
    console.error("POST /api/badges Error:", error);
    if (error.name === "ValidationError") return NextResponse.json({ message: Object.values(error.errors).map((item) => item.message).join(", ") }, { status: 400 });
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
