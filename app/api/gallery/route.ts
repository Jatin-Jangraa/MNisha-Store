import { NextResponse } from "next/server";

import { listImages } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function GET() {
  try {
    const items = await listImages();
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error("Fetch images error:", error);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
