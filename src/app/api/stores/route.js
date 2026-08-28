import { NextResponse } from "next/server";
import Store from "@/models/Store";
import connectMongo from "@/lib/mongodb";
import { getSession } from "@/lib/auth/session";
import { ROLES } from "@/lib/auth/roles";

export async function GET(request) {
  try {
    await connectMongo();

    const { searchParams } = new URL(request.url);
    const active = searchParams.get("active");
    const search = searchParams.get("search");
    const letter = searchParams.get("letter");

    let query = {};
    if (active === "true") {
      query.isActive = true;
    } else if (active === "false") {
      query.isActive = false;
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    
    if (letter) {
      if (letter === "#") {
        query.name = { ...query.name, $not: /^[a-zA-Z]/ };
      } else {
        query.name = { ...query.name, $regex: `^${letter}`, $options: "i" };
      }
    }

    const stores = await Store.find(query).sort({ name: 1 });
    return NextResponse.json({ stores }, { status: 200 });
  } catch (error) {
    console.error("GET /api/stores Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Only Admin can create stores
    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== ROLES.ADMIN) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await connectMongo();
    const data = await request.json();

    // Check for required fields
    if (!data.name || !data.slug || !data.logoPath) {
      return NextResponse.json(
        { message: "Name, slug, and logo are required." },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const existingStore = await Store.findOne({ slug: data.slug });
    if (existingStore) {
      return NextResponse.json(
        { message: "A store with this slug already exists." },
        { status: 409 }
      );
    }

    const newStore = await Store.create(data);
    return NextResponse.json({ store: newStore }, { status: 201 });
  } catch (error) {
    console.error("POST /api/stores Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
