import { NextRequest, NextResponse } from "next/server";
import { verifyJwt, type JwtPayload } from "./auth";

export const SESSION_COOKIE = "timesaver_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

// ── Cookie Setters ────────────────────────────────────────────────────────
export function setSessionCookie(response: NextResponse, jwt: string): void {
  response.cookies.set({
    name:     SESSION_COOKIE,
    value:    jwt,
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   COOKIE_MAX_AGE,
    path:     "/",
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set({
    name:     SESSION_COOKIE,
    value:    "",
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   0,
    path:     "/",
  });
}

// ── Cookie Readers ────────────────────────────────────────────────────────
export function getSessionToken(request: NextRequest): string | null {
  return request.cookies.get(SESSION_COOKIE)?.value ?? null;
}

export async function getSessionPayload(
  request: NextRequest
): Promise<JwtPayload | null> {
  const token = getSessionToken(request);
  if (!token) return null;
  return verifyJwt(token);
}

// ── Server-side cookie helper (for Server Components) ────────────────────
export async function getServerSession(): Promise<JwtPayload | null> {
  // Dynamically import next/headers only in a RSC context
  const { cookies } = await import("next/headers");
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyJwt(token);
}
