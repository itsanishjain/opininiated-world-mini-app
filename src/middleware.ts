import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const publicPaths = ["/"];
  const isPublicPath = publicPaths.includes(path);

  // Define paths that should be ignored by middleware
  const ignorePaths = ["/api/auth", "/_next", "/favicon.ico"];
  const shouldIgnore = ignorePaths.some((ignorePath) =>
    path.startsWith(ignorePath)
  );

  if (shouldIgnore) {
    return NextResponse.next();
  }

  // Get the token from the cookies
  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  // If the user is on a public path and has a token, redirect to profile
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // If the user is not on a public path and doesn't have a token, redirect to signin
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
