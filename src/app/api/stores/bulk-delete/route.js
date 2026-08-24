import { NextResponse } from "next/server";
import Store from "@/models/Store";
import connectMongo from "@/lib/mongodb";
import { getSession } from "@/lib/auth/session";
import { ROLES } from "@/lib/auth/roles";

export async function POST(request) {
  try {
    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== ROLES.ADMIN) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await connectMongo();
    const data = await request.json();
    
    if (!data.storeIds || !Array.isArray(data.storeIds) || data.storeIds.length === 0) {
      return NextResponse.json({ message: "Invalid or empty storeIds array." }, { status: 400 });
    }

    const result = await Store.deleteMany({ _id: { $in: data.storeIds } });

    return NextResponse.json(
      { message: `Successfully deleted ${result.deletedCount} stores.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/stores/bulk-delete Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
