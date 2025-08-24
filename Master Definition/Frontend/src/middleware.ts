import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const userRole = token?.role as string;
  const department = token?.department ?? null;

  const publicRoutes = ["/register", "/login", "/", "/forgot-password"];
  const isPublicRoute = publicRoutes.includes(pathname);

  // If no token (not logged in)
  if (!token) {
    if (isPublicRoute) {
      return NextResponse.next(); 
    }
    return NextResponse.redirect(new URL("/login", request.url)); 
  }

  // If logged in and trying to access public routes, redirect to dashboard
  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Users without department can only access dashboard and profile
  if (userRole !== "Admin" && !department) {
    const allowedPaths = ["/dashboard", "/profile"];
    if (!allowedPaths.includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Role-based route permissions
  const routePermissions: Record<string, string[]> = {
    "/manage/Faculty": ["Admin", "Hod"],
    "/manage/Hod": ["Admin"],
    "/manage/Student": ["Admin", "Hod", "Faculty"],
    "/leave-requests": ["Hod", "Faculty"], // Admin blocked by design
    "/profile": ["Admin", "Hod", "Faculty", "Student"],
    "/dashboard": ["Admin", "Hod", "Faculty", "Student"],
  };

  // Check if current route requires specific permissions
  for (const [route, allowedRoles] of Object.entries(routePermissions)) {
    if (pathname.startsWith(route)) {
      if (!allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)"],
};
