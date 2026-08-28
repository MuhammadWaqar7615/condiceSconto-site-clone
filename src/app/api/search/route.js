import connectMongo from "@/lib/mongodb";
import Store from "@/models/Store";
import Coupon from "@/models/Coupon";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    if (!q || q.length < 2) {
      return NextResponse.json({ stores: [], coupons: [] });
    }

    await connectMongo();

    // Limit the results for live search
    const stores = await Store.find({
      name: { $regex: q, $options: "i" },
      isActive: { $ne: false }
    })
      .select("name slug logoPath")
      .limit(5)
      .lean();

    const coupons = await Coupon.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ],
      isActive: { $ne: false }
    })
      .populate("storeId", "name slug logoPath")
      .select("title type discount storeId")
      .limit(5)
      .lean();

    return NextResponse.json({ stores, coupons });
  } catch (error) {
    console.error("Live Search API error:", error);
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    );
  }
}
