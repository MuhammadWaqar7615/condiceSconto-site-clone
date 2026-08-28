import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Coupon from "@/models/Coupon";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectMongo();
    const now = new Date();
    const features = await Coupon.find({
      isActive: true,
      isFeatured: true,
      $or: [{ startsAt: { $exists: false } }, { startsAt: null }, { startsAt: { $lte: now } }],
      $and: [{ $or: [{ expiresAt: { $exists: false } }, { expiresAt: null }, { expiresAt: { $gt: now } }] }],
    })
      .populate("storeId", "name slug logoPath")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ features });
  } catch (error) {
    console.error("GET /api/features Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
