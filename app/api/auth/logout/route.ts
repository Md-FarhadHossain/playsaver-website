import { NextRequest, NextResponse } from "next/server";
import { getSessionToken } from "@/lib/session";
import { clearSessionCookie } from "@/lib/session";
import { deleteSessionByJwt } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const token = getSessionToken(request);

    if (token) {
      // Delete session from DB
      await deleteSessionByJwt(token);
    }

    const response = NextResponse.json({ success: true });
    clearSessionCookie(response);
    return response;
  } catch (err) {
    console.error("[POST /api/auth/logout]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
