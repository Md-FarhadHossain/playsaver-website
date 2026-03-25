import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { verifyGoogleToken } from "@/lib/auth";
import { signJwt, jwtExpiresAt } from "@/lib/auth";
import { upsertUser, createSession, initDb } from "@/lib/db";
import { setSessionCookie } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { accessToken?: string };
    const { accessToken } = body;

    if (!accessToken || typeof accessToken !== "string") {
      return NextResponse.json(
        { error: "Missing accessToken in request body" },
        { status: 400 }
      );
    }

    // 1. Verify the Google access token server-side
    const googleUser = await verifyGoogleToken(accessToken);
    if (!googleUser) {
      return NextResponse.json(
        { error: "Invalid or expired Google access token" },
        { status: 401 }
      );
    }

    // 2. Ensure DB schema exists
    await initDb();

    // 3. Upsert user in Turso
    const user = await upsertUser({
      id:     googleUser.sub,
      email:  googleUser.email,
      name:   googleUser.name ?? googleUser.email,
      avatar: googleUser.picture ?? "",
    });

    // 4. Sign JWT
    const jwt = await signJwt({ sub: user.id, email: user.email });
    const expiresAt = jwtExpiresAt();

    // 5. Persist session
    await createSession({
      id:        uuidv4(),
      userId:    user.id,
      jwt,
      expiresAt,
    });

    // 6. Return JWT in httpOnly cookie + JSON body (extension can use JSON body)
    const response = NextResponse.json({ user, token: jwt });
    setSessionCookie(response, jwt);

    return response;
  } catch (err) {
    console.error("[POST /api/auth/google]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
