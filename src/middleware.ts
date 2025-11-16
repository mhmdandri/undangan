import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/rsvp/confirm"];
  const isProtected = protectedRoutes.some((path) => pathname.startsWith(path));

  if (isProtected && !token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
  if (token && pathname === "/login") {
    const rsvpUrl = new URL("/rsvp/confirm", req.url);
    return NextResponse.redirect(rsvpUrl);
  }
  return NextResponse.next();
}
