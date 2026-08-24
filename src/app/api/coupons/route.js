import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Coupon from "@/models/Coupon";
import { requireRole } from "@/lib/auth/auth";
import { ROLES } from "@/lib/auth/roles";
import mongoose from "mongoose";

// GET /api/coupons - Fetch all coupons
export async function GET(request) {
  try {
    // Only admins should ideally see all coupons in one raw list, but for now we'll just check auth
    // Wait, the instructions say "Admin Coupon List", let's secure it for ADMIN
    await requireRole(ROLES.ADMIN);
    
    await connectMongo();
    
    const { searchParams } = new URL(request.url);
    const storeId = searchParams.get("storeId");
    
    let query = {};
    if (storeId && mongoose.Types.ObjectId.isValid(storeId)) {
      query.storeId = storeId;
    }

    const coupons = await Coupon.find(query)
      .populate("storeId", "name slug logoPath")
      .sort({ createdAt: -1 })
      .lean();
      
    return NextResponse.json({ success: true, data: coupons });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    if (error.message === "Unauthorized" || error.message === "Forbidden") {
       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

// POST /api/coupons - Create a new coupon
export async function POST(request) {
  try {
    await requireRole(ROLES.ADMIN);
    await connectMongo();
    
    const body = await request.json();
    
    // Validate required fields based on type
    if (body.type === "code" && !body.code) {
      return NextResponse.json({ success: false, error: "Coupon code is required for 'code' type" }, { status: 400 });
    }
    if (body.type === "link" && !body.couponUrl) {
      return NextResponse.json({ success: false, error: "Coupon URL is required for 'link' type" }, { status: 400 });
    }
    
    const newCoupon = await Coupon.create(body);
    
    return NextResponse.json({ success: true, data: newCoupon }, { status: 201 });
  } catch (error) {
    console.error("Error creating coupon:", error);
    if (error.message === "Unauthorized" || error.message === "Forbidden") {
       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    // Mongoose validation errors
    if (error.name === 'ValidationError') {
       const messages = Object.values(error.errors).map(val => val.message);
       return NextResponse.json({ success: false, error: messages.join(', ') }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message || "Server Error" }, { status: 500 });
  }
}
