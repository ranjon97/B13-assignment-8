import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/profile", "/books/"];
  const isProtected = protectedRoutes.some(
    (route) => pathname.startsWith(route) && pathname !== "/all-books"
  );

  if (isProtected && !sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const authRoutes = ["/login", "/register"];
  if (authRoutes.includes(pathname) && sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/books/:path*", "/login", "/register"],
};
