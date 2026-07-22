import { NextResponse } from "next/server";

import { deleteImage } from "@/lib/cloudinary";
import { getUploadedItem, removeUploadedItem } from "@/lib/uploads";

export const runtime = "nodejs";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await getUploadedItem(id);

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    if (item.cloudinaryPublicId) {
      try {
        await deleteImage(item.cloudinaryPublicId);
      } catch (err) {
        console.error("Cloudinary delete error (non-fatal):", err);
      }
    }

    await removeUploadedItem(id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
