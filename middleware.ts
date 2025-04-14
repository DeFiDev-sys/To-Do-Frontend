import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const path = req.nextUrl.pathname;
  const isProtectedRoute = ['/dashboard', '/profile'].includes(path);
  const isPublicRoute = ['/SignIn', '/RegisterUser'].includes(path);

  if (path === '/') {
    return NextResponse.redirect(new URL('/SignIn', req.url));
  }

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/SignIn', req.url));
  }

  // Redirect authenticated users away from SignIn or RegisterUser
  if (isPublicRoute && token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL('/dashboard', req.url));
    } catch (error) {
      console.log(error)
      const response = NextResponse.next();
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/','/RegisterUser', '/dashboard', '/profile'],
};