import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { deleteImage } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteImage(id);
    revalidatePath("/");
    revalidatePath("/gallery");
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
