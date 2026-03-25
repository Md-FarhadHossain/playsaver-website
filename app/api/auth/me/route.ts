import { NextRequest, NextResponse } from "next/server";
import { getSessionPayload } from "@/lib/session";
import { findUserById } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const payload = await getSessionPayload(request);

    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await findUserById(payload.sub);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error("[GET /api/auth/me]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
