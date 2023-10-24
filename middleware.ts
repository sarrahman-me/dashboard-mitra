import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("tx");
  const { pathname, origin } = request.nextUrl;

  if (pathname === "/favicon.ico" || pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }

  if (!token) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(`${origin}/`);
    }
  }

  try {
    if (pathname === "/login" || pathname === "/register" || pathname === "/verify-email") {
      if (token) {
        return NextResponse.redirect(`${origin}/dashboard`);
      }
    }
    return NextResponse.next();
  } catch (error) {
    if (pathname !== "/login") {
      return NextResponse.redirect(`${origin}/login`);
    }
    return NextResponse.next();
  }
}
