import { NextResponse } from "next/server";

import { getUploadedItems } from "@/lib/uploads";

export const runtime = "nodejs";

export async function GET() {
  try {
    const items = await getUploadedItems();
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error("Fetch uploads error:", error);
    return NextResponse.json({ error: "Failed to fetch uploads" }, { status: 500 });
  }
}
