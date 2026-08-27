import { NextResponse } from "next/server";
import User from "@/models/User";
import connectMongo from "@/lib/mongodb";
import { hashPassword } from "@/lib/auth/password";
import { getSession } from "@/lib/auth/session";
import { ROLES } from "@/lib/auth/roles";

const userFields = "-passwordHash";

async function requireAdmin() {
  const session = await getSession();
  if (!session?.user) return { message: "Unauthorized", status: 401 };
  if (![ROLES.ADMIN, ROLES.ADMINISTRATION].includes(session.user.role)) return { message: "Forbidden", status: 403 };
  return null;
}

export async function GET() {
  try {
    const authError = await requireAdmin();
    if (authError) return NextResponse.json({ message: authError.message }, { status: authError.status });
    await connectMongo();
    const users = await User.find().select(userFields).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ users });
  } catch (error) {
    console.error("GET /api/users Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authError = await requireAdmin();
    if (authError) return NextResponse.json({ message: authError.message }, { status: authError.status });
    const body = await request.json();
    if (!body.name?.trim() || !body.email?.trim() || !body.password) {
      return NextResponse.json({ message: "Name, email, and password are required." }, { status: 400 });
    }
    if (![ROLES.ADMINISTRATION, ROLES.EDITOR, ROLES.SUBSCRIBOR].includes(body.role)) {
      return NextResponse.json({ message: "Invalid role." }, { status: 400 });
    }

    await connectMongo();
    const user = await User.create({
      name: body.name,
      email: body.email,
      description: body.description,
      passwordHash: await hashPassword(body.password),
      role: body.role,
      verified: Boolean(body.verified),
      status: body.status === "disabled" ? "disabled" : "enabled",
    });
    const responseUser = user.toObject();
    delete responseUser.passwordHash;
    return NextResponse.json({ user: responseUser }, { status: 201 });
  } catch (error) {
    console.error("POST /api/users Error:", error);
    if (error.code === 11000) return NextResponse.json({ message: "A user with this email already exists." }, { status: 409 });
    if (error.name === "ValidationError") return NextResponse.json({ message: Object.values(error.errors).map((item) => item.message).join(", ") }, { status: 400 });
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
