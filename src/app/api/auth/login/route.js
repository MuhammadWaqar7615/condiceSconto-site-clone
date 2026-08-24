import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/auth/auth";
import { createSession } from "@/lib/auth/session";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await authenticateUser(email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create session (sets HTTP-only cookie)
    await createSession(user);

    return NextResponse.json({ success: true, user: { email: user.email, role: user.role } });
  } catch (error) {
    console.error("Login error:", error);
    // Don't expose internal error details to client
    return NextResponse.json(
      { error: "An error occurred during authentication" },
      { status: 500 }
    );
  }
}
