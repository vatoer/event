import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
//import { auth } from "@auth/auth";
import authConfig from "@auth/auth.config";
import NextAuth from "next-auth";
import {
  API_AUTH_PREFIX,
  AUTH_ROUTES,
  PUBLIC_ROUTES,
  DEFAULT_ROUTE_AFTER_LOGIN,
} from "./route";
import { Logger } from "tslog";

// Create a Logger instance with custom settings
const logger = new Logger({
  hideLogPositionForProduction: true,
});

const { auth } = NextAuth(authConfig);

// Function to extract IP address
const getIpAddress = (req: NextRequest): string => {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  return req.ip || "";
};

function getCookieValue(
  cookieString: string,
  cookieName: string
): string | null {
  const cookies = cookieString.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=").map((c) => c.trim());
    if (name === cookieName) {
      return value;
    }
  }
  return null;
}

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

  // check if the route is a public route or sub route
  const isPublicRoute =
    PUBLIC_ROUTES.includes(nextUrl.pathname) ||
    PUBLIC_ROUTES.some(
      (route) => nextUrl.pathname.startsWith(route) && route !== "/"
    );

  // if the route is an Auth route, we don't need to redirect
  if (isApiAuthRoute) {
    return;
  }

  // if the route is a public route or sub route, skip the middleware
  if (isPublicRoute) {
    logger.info("[MIDDLEWARE] Public Route");
    return;
  } else {
    logger.warn("[MIDDLEWARE] Not Public Route");
  }

  // if the route is an Auth route and is log in, redirect to the default route
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_ROUTE_AFTER_LOGIN, nextUrl));
    }
    return;
  }

  logger.info("[Auth] Request URL:", req.url);
  //console.log("[MIDDLEWARE]", nextUrl.pathname);
  //console.log("[MIDDLEWARE PATHNAME]", nextUrl.pathname.split("/"));

  // if the route is not an Auth route and is not log in, redirect to the login page
  // Extract and log the IP address
  const ipAddress = getIpAddress(req);
  logger.info(`Request from IP: ${ipAddress}`);
  if (!isLoggedIn && !isPublicRoute) {
    logger.warn("[MIDDLEWARE] Redirect to login");
    return NextResponse.redirect(
      new URL("/login?callbackUrl=" + nextUrl.pathname, nextUrl)
    );
  }
  return;
});

// Config for the middleware
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
