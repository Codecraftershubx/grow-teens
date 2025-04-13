import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextAuthUserSessionWithToken } from "./types";

export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|widgets|auth|images|assets|icons).*)",
  ],
};

export async function middleware(request: NextRequest) {
  // Retrieve the JWT token
  const token = (await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })) as NextAuthUserSessionWithToken;
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Define the allowed prefixes for each entity type
  const protectedRoute: Record<string, string> = {
    TEEN: "/dashboard",
    SPONSOR: "/sponsors",
    MENTOR: "/mentors",
    ADMIN: "/admin",
  };

  if (token) {
    const { email, role } = token;

    if (!email)
      return NextResponse.redirect(new URL(`/auth/signin`, request.url));

    // Check if the user is accessing an allowed route
    const allowedPrefix = protectedRoute[role];

    if (allowedPrefix && !pathname.startsWith(allowedPrefix)) {
      const publicPaths = ['/', '/auth/signin', '/auth/signup'];
      if (publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL(allowedPrefix, request.url));
      }
      return NextResponse.redirect(new URL(allowedPrefix, request.url));
    }
  } else {
    const matchedProtectedRoute = Object.values(protectedRoute).find((prefix) =>
      pathname.startsWith(prefix)
    );
    if (matchedProtectedRoute) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  // Public routes e.g Website
  return NextResponse.next();
}
