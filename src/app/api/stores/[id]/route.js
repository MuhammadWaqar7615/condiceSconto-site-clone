import { NextResponse } from "next/server";
import Store from "@/models/Store";
import connectMongo from "@/lib/mongodb";
import { getSession } from "@/lib/auth/session";
import { ROLES } from "@/lib/auth/roles";

async function checkAdminAuth() {
  const session = await getSession();
  if (!session || !session.user) {
    return { error: "Unauthorized", status: 401 };
  }
  if (session.user.role !== ROLES.ADMIN) {
    return { error: "Forbidden", status: 403 };
  }
  return null;
}

export async function GET(request, { params }) {
  try {
    await connectMongo();
    const { id } = params;

    const store = await Store.findById(id);
    if (!store) {
      return NextResponse.json({ message: "Store not found" }, { status: 404 });
    }

    return NextResponse.json({ store }, { status: 200 });
  } catch (error) {
    console.error(`GET /api/stores/${params.id} Error:`, error);
    if (error.name === "CastError") {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const authError = await checkAdminAuth();
    if (authError) return NextResponse.json({ message: authError.error }, { status: authError.status });

    await connectMongo();
    const { id } = params;
    const data = await request.json();

    // If slug is updated, verify it doesn't conflict
    if (data.slug) {
      const existingStore = await Store.findOne({ slug: data.slug, _id: { $ne: id } });
      if (existingStore) {
        return NextResponse.json({ message: "A store with this slug already exists." }, { status: 409 });
      }
    }

    const updatedStore = await Store.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedStore) {
      return NextResponse.json({ message: "Store not found" }, { status: 404 });
    }

    return NextResponse.json({ store: updatedStore }, { status: 200 });
  } catch (error) {
    console.error(`PUT /api/stores/${params.id} Error:`, error);
    if (error.name === "CastError") {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const authError = await checkAdminAuth();
    if (authError) return NextResponse.json({ message: authError.error }, { status: authError.status });

    await connectMongo();
    const { id } = params;

    const deletedStore = await Store.findByIdAndDelete(id);

    if (!deletedStore) {
      return NextResponse.json({ message: "Store not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Store deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(`DELETE /api/stores/${params.id} Error:`, error);
    if (error.name === "CastError") {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
