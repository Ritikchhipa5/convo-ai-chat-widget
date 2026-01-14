// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher(["/", "/auth(.*)", "/portal(.*)"]);

// export default clerkMiddleware(async (auth, req) => {
//   if (!isPublicRoute(req)) {
//     await auth.protect();
//   }
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  /^\/$/, // home
  /^\/auth(\/.*)?$/, // auth pages
  /^\/portal(\/.*)?$/, // portal pages
  /^\/chatbot(\/.*)?$/, // Chatbot for public
];

function isPublicRoute(pathname: string) {
  return publicRoutes.some((route) => route.test(pathname));
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // ✅ Always allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // ✅ Protect ONLY app routes
  if (!token) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};
