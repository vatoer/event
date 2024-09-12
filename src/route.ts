export interface RouteItem {
  name: string;
  label: string;
  href: string;
  iconName?: string;
  permissions?: string[];
  displayOrder?: number;
  displayAsMenu?: boolean;
  cascadePermissions?: boolean; // cascade permissions to sub routes
  subRoutes?: RouteItem[];
}

export const routes: RouteItem[] = [];

export const API_AUTH_PREFIX = "/api/auth";

export const AUTH_ROUTES = [
  "/",
  "/login",
  "/logout",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export const PUBLIC_ROUTES = ["/", "/e","/r","/qr","/privacy","/terms-of-service"];

export const DEFAULT_ROUTE_AFTER_LOGIN = "/e/resdip79";
export const DEFAULT_ROUTE_AFTER_LOGOUT = "/";
export const DEFAULT_ROUTE_AFTER_REGISTER = "/login";
export const DEFAULT_ROUTE_AFTER_FORGOT_PASSWORD = "/login";
export const DEFAULT_ROUTE_AFTER_RESET_PASSWORD = "/login";
