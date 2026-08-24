import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Coupon from "@/models/Coupon";
import mongoose from "mongoose";

// GET /api/stores/[id]/coupons
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    // Validate store ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid Store ID" }, { status: 400 });
    }
    
    await connectMongo();
    
    // Find all coupons where storeId matches
    const coupons = await Coupon.find({ storeId: id })
      .sort({ isFeatured: -1, createdAt: -1 })
      .lean();
      
    return NextResponse.json({ success: true, data: coupons });
  } catch (error) {
    console.error("Error fetching store coupons:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}
