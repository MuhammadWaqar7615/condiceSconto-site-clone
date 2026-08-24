import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth/session";

export async function POST(request) {
  try {
    await destroySession();
    
    // Redirect to login after successful logout (303 to convert POST to GET)
    return NextResponse.redirect(new URL("/account/login", request.url), { status: 303 });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.redirect(new URL("/account/login", request.url), { status: 303 });
  }
}
