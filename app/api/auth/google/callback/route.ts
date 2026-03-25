import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { exchangeCodeForToken, verifyGoogleToken, signJwt, jwtExpiresAt } from "@/lib/auth";
import { upsertUser, createSession, initDb } from "@/lib/db";
import { setSessionCookie } from "@/lib/session";

export async function GET(request: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  try {
    const { searchParams } = new URL(request.url);
    const code  = searchParams.get("code");
    const error = searchParams.get("error");

    if (error || !code) {
      return NextResponse.redirect(`${appUrl}/?auth=cancelled`);
    }

    // 1. Exchange authorization code for access token
    const accessToken = await exchangeCodeForToken(code);
    if (!accessToken) {
      return NextResponse.redirect(`${appUrl}/?auth=error`);
    }

    // 2. Verify the access token → get user info
    const googleUser = await verifyGoogleToken(accessToken);
    if (!googleUser) {
      return NextResponse.redirect(`${appUrl}/?auth=error`);
    }

    // 3. Ensure DB schema
    await initDb();

    // 4. Upsert user
    const user = await upsertUser({
      id:     googleUser.sub,
      email:  googleUser.email,
      name:   googleUser.name ?? googleUser.email,
      avatar: googleUser.picture ?? "",
    });

    // 5. Sign JWT + create session
    const jwt       = await signJwt({ sub: user.id, email: user.email });
    const expiresAt = jwtExpiresAt();

    await createSession({
      id:     uuidv4(),
      userId: user.id,
      jwt,
      expiresAt,
    });

    // 6. Set httpOnly cookie and redirect to dashboard
    const response = NextResponse.redirect(`${appUrl}/dashboard`);
    setSessionCookie(response, jwt);
    return response;
  } catch (err) {
    console.error("[GET /api/auth/google/callback]", err);
    return NextResponse.redirect(`${appUrl}/?auth=error`);
  }
}
