import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Coupon from "@/models/Coupon";
import { requireRole } from "@/lib/auth/auth";
import { ROLES } from "@/lib/auth/roles";
import mongoose from "mongoose";

// GET /api/coupons/[id]
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid Coupon ID" }, { status: 400 });
    }
    
    await connectMongo();
    const coupon = await Coupon.findById(id).populate("storeId", "name slug logoPath").lean();
    
    if (!coupon) {
      return NextResponse.json({ success: false, error: "Coupon not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: coupon });
  } catch (error) {
    console.error("Error fetching coupon:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

// PUT /api/coupons/[id]
export async function PUT(request, { params }) {
  try {
    await requireRole(ROLES.ADMIN);
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid Coupon ID" }, { status: 400 });
    }
    
    await connectMongo();
    const body = await request.json();
    
    // Extra validation
    if (body.type === "code" && !body.code) {
      return NextResponse.json({ success: false, error: "Coupon code is required for 'code' type" }, { status: 400 });
    }
    if (body.type === "link" && !body.couponUrl) {
      return NextResponse.json({ success: false, error: "Coupon URL is required for 'link' type" }, { status: 400 });
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(id, body, { 
      new: true,
      runValidators: true 
    });
    
    if (!updatedCoupon) {
      return NextResponse.json({ success: false, error: "Coupon not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: updatedCoupon });
  } catch (error) {
    console.error("Error updating coupon:", error);
    if (error.message === "Unauthorized" || error.message === "Forbidden") {
       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (error.name === 'ValidationError') {
       const messages = Object.values(error.errors).map(val => val.message);
       return NextResponse.json({ success: false, error: messages.join(', ') }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

// DELETE /api/coupons/[id]
export async function DELETE(request, { params }) {
  try {
    await requireRole(ROLES.ADMIN);
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid Coupon ID" }, { status: 400 });
    }
    
    await connectMongo();
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    
    if (!deletedCoupon) {
      return NextResponse.json({ success: false, error: "Coupon not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: "Coupon deleted successfully" });
  } catch (error) {
    console.error("Error deleting coupon:", error);
    if (error.message === "Unauthorized" || error.message === "Forbidden") {
       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}
