import { NextResponse } from "next/server";
import { initDb, createFeedback } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { topic, details } = await req.json();
    
    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }
    
    await initDb();
    
    const id = crypto.randomUUID();
    await createFeedback({ id, topic, details });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving feedback:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
