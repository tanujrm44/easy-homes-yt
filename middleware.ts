import { NextRequest, NextResponse } from "next/server"

const protectedRoutes = [
  "/properties/add",
  "/saved-properties",
  "/messages",
  "/profile",
]
const editPropertyRouteRegex = /^\/properties\/\d+\/edit$/

export function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token")?.value

  const isProtectedRoute =
    protectedRoutes.includes(req.nextUrl.pathname) ||
    editPropertyRouteRegex.test(req.nextUrl.pathname)

  if (!token && isProtectedRoute) {
    const loginUrl = new URL("/", req.url)
    loginUrl.searchParams.set("error", "login_required")
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}
