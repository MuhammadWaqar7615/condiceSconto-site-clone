import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/User";
import connectMongo from "@/lib/mongodb";
import { hashPassword } from "@/lib/auth/password";
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
    const authError = await requireAdmin();
    if (authError) return NextResponse.json({ message: authError.message }, { status: authError.status });
    const { id } = await params;
    if (!validId(id)) return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    await connectMongo();
    const user = await User.findById(id).select("-passwordHash").lean();
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json({ user });
  } catch (error) {
    console.error("GET /api/users/[id] Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const authError = await requireAdmin();
    if (authError) return NextResponse.json({ message: authError.message }, { status: authError.status });
    const { id } = await params;
    if (!validId(id)) return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    const body = await request.json();
    if (!body.name?.trim() || !body.email?.trim()) return NextResponse.json({ message: "Name and email are required." }, { status: 400 });
    if (![ROLES.ADMINISTRATION, ROLES.EDITOR, ROLES.SUBSCRIBOR].includes(body.role)) return NextResponse.json({ message: "Invalid role." }, { status: 400 });

    const update = { name: body.name, email: body.email, description: body.description, role: body.role, verified: Boolean(body.verified), status: body.status === "disabled" ? "disabled" : "enabled" };
    if (body.password) update.passwordHash = await hashPassword(body.password);
    await connectMongo();
    const user = await User.findByIdAndUpdate(id, update, { new: true, runValidators: true }).select("-passwordHash").lean();
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json({ user });
  } catch (error) {
    console.error("PUT /api/users/[id] Error:", error);
    if (error.code === 11000) return NextResponse.json({ message: "A user with this email already exists." }, { status: 409 });
    if (error.name === "ValidationError") return NextResponse.json({ message: Object.values(error.errors).map((item) => item.message).join(", ") }, { status: 400 });
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const authError = await requireAdmin();
    if (authError) return NextResponse.json({ message: authError.message }, { status: authError.status });
    const { id } = await params;
    if (!validId(id)) return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    await connectMongo();
    const user = await User.findByIdAndDelete(id);
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/users/[id] Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
