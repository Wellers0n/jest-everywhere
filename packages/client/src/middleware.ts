import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

export default async function middleware(request: NextRequest) {
  try {
    // get auth token from cookies
    const authToken = request.cookies.get("auth-token")?.value;

    // verify if auth token exist
    if (!authToken)
      return NextResponse.redirect(new URL("/login", request.url));

    await jose.jwtVerify(
      authToken,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return NextResponse.next();
  } catch (error: any) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  runtime: "experimental-edge",
  fallback: false,
  matcher: ["/home/:path*"],
};
