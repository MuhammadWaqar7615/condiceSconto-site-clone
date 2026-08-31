import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Badge from "@/models/Badge";
import connectMongo from "@/lib/mongodb";
import { getSession } from "@/lib/auth/session";
import { ROLES } from "@/lib/auth/roles";
import cloudinary from "@/lib/cloudinary";

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
    if (!validId(id)) return NextResponse.json({ message: "Invalid badge ID" }, { status: 400 });
    await connectMongo();
    const badge = await Badge.findById(id).lean();
    if (!badge) return NextResponse.json({ message: "Badge not found" }, { status: 404 });
    return NextResponse.json({ badge });
  } catch (error) {
    console.error("GET /api/badges/[id] Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const authError = await requireAdmin();
    if (authError) return NextResponse.json({ message: authError.message }, { status: authError.status });
    const { id } = await params;
    if (!validId(id)) return NextResponse.json({ message: "Invalid badge ID" }, { status: 400 });
    const body = await request.json();
    if (!body.name?.trim() || !body.image?.trim()) return NextResponse.json({ message: "Name and image are required." }, { status: 400 });
    await connectMongo();

    const currentBadge = await Badge.findById(id);
    if (currentBadge && currentBadge.imagePublicId && body.imagePublicId && currentBadge.imagePublicId !== body.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(currentBadge.imagePublicId);
      } catch (err) {
        console.error("Failed to delete old badge image from Cloudinary:", err);
      }
    }

    const badge = await Badge.findByIdAndUpdate(id, { name: body.name, image: body.image, imagePublicId: body.imagePublicId }, { new: true, runValidators: true }).lean();
    if (!badge) return NextResponse.json({ message: "Badge not found" }, { status: 404 });
    return NextResponse.json({ badge });
  } catch (error) {
    console.error("PUT /api/badges/[id] Error:", error);
    if (error.name === "ValidationError") return NextResponse.json({ message: Object.values(error.errors).map((item) => item.message).join(", ") }, { status: 400 });
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const authError = await requireAdmin();
    if (authError) return NextResponse.json({ message: authError.message }, { status: authError.status });
    const { id } = await params;
    if (!validId(id)) return NextResponse.json({ message: "Invalid badge ID" }, { status: 400 });
    await connectMongo();

    const badgeToDelete = await Badge.findById(id);
    if (!badgeToDelete) return NextResponse.json({ message: "Badge not found" }, { status: 404 });

    if (badgeToDelete.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(badgeToDelete.imagePublicId);
      } catch (err) {
        console.error("Failed to delete badge image from Cloudinary:", err);
      }
    }

    const badge = await Badge.findByIdAndDelete(id);
    return NextResponse.json({ message: "Badge deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/badges/[id] Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
