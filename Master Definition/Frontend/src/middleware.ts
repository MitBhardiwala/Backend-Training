import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  // Get session
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("Path name : ", nextUrl.pathname);
  console.log(token);

  return NextResponse.next();
}
