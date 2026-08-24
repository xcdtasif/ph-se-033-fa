import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface User {
  id: string;
  email: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
  name: string;
}

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    return NextResponse.next();
  }

  const res = await fetch(`${backendUrl}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("accessToken");
    return response;
  }

  const user: User = await res.json();

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/dashboard/landlord") && user.role !== "LANDLORD") {
    return NextResponse.redirect(new URL("/dashboard/tenant", request.url));
  }

  if (pathname.startsWith("/dashboard/admin") && user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard/tenant", request.url));
  }

  if (pathname.startsWith("/dashboard/tenant") && user.role !== "TENANT") {
    const target = `/dashboard/${user.role.toLowerCase()}`;
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/tenant/:path*",
    "/dashboard/landlord/:path*",
    "/dashboard/admin/:path*",
  ],
};
