import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Sadece /admin ile başlayan sayfalar için kontrol
  if (pathname.startsWith("/admin")) {
    // Kullanıcı login değilse yönlendir
    // Basit kontrol: login olup olmadığını cookie ile kontrol et
    const isLoggedIn = request.cookies.get("sb-access-token");
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
