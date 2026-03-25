import { NextResponse } from "next/server";
import { initDb, createUninstallFeedback } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { reason, details } = await req.json();
    
    if (!reason) {
      return NextResponse.json({ error: "Reason is required" }, { status: 400 });
    }
    
    await initDb();
    
    const id = crypto.randomUUID();
    await createUninstallFeedback({ id, reason, details });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving uninstall feedback:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
