import {getToken} from "next-auth/jwt";
import {NextRequest, NextResponse} from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

  if (
    !session &&
    (path === "/profile" ||
      path === "/cart" ||
      path === "/reviews/my" ||
      path === "/orders/my" ||
      path === "/categories" ||
      path === "/categories/create" ||
      path === "/authors" ||
      path === "/authors/create" ||
      path === "/books" ||
      path === "/books/create" ||
      path === "/reviews" ||
      path === "/users" ||
      path === "/orders" ||
      path === "/dashboard" ||
      path.startsWith("/orders/details") ||
      path.startsWith("/categories/update") ||
      path.startsWith("/authors/update") ||
      path.startsWith("/books/update") ||
      path.startsWith("/reviews/book") ||
      path.startsWith("/reviews/user") ||
      path.startsWith("/orders/user"))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (
    session &&
    session?.user?.role === "user" &&
    (path === "/categories" ||
    path === "/categories/create" ||
    path === "/authors" ||
    path === "/authors/create" ||
    path === "/books" ||
    path === "/books/create" ||
    path === "/reviews" ||
    path === "/users" ||
    path === "/orders" ||
    path === "/dashboard" ||
    path.startsWith("/categories/update") ||
    path.startsWith("/authors/update") ||
    path.startsWith("/books/update") ||
    path.startsWith("/reviews/book") ||
    path.startsWith("/reviews/user") ||
    path.startsWith("/orders/user"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
