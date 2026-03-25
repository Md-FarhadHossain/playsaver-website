import { SignJWT, jwtVerify } from "jose";

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable");
}

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const ALGORITHM = "HS256";
const EXPIRY_DAYS = 7;

// ── JWT ───────────────────────────────────────────────────────────────────
export interface JwtPayload {
  sub: string; // userId
  email: string;
}

export async function signJwt(payload: JwtPayload): Promise<string> {
  return new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: ALGORITHM })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${EXPIRY_DAYS}d`)
    .sign(SECRET);
}

export async function verifyJwt(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET, {
      algorithms: [ALGORITHM],
    });
    return {
      sub: payload.sub as string,
      email: payload.email as string,
    };
  } catch {
    return null;
  }
}

export function jwtExpiresAt(): Date {
  const d = new Date();
  d.setDate(d.getDate() + EXPIRY_DAYS);
  return d;
}

// ── Google Token Verification ─────────────────────────────────────────────
export interface GoogleUserInfo {
  sub: string;       // Google user ID
  email: string;
  name: string;
  picture: string;
  email_verified: boolean;
  aud: string;
}

/**
 * Verifies a Google OAuth2 access token (from chrome.identity OR web flow).
 * Returns the user info if valid, null otherwise.
 */
export async function verifyGoogleToken(
  accessToken: string
): Promise<GoogleUserInfo | null> {
  try {
    const res = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!res.ok) return null;
    const info = (await res.json()) as GoogleUserInfo;

    if (!info.email_verified) return null;

    return info;
  } catch {
    return null;
  }
}

/**
 * Exchanges an authorization code (from web OAuth flow) for an access token.
 */
export async function exchangeCodeForToken(code: string): Promise<string | null> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id:     process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        redirect_uri:  `${appUrl}/api/auth/google/callback`,
        grant_type:    "authorization_code",
      }),
    });
    if (!res.ok) return null;
    const data = await res.json() as { access_token?: string };
    return data.access_token ?? null;
  } catch {
    return null;
  }
}
