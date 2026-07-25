import { NextRequest, NextResponse } from "next/server";

import { addUploadedItem } from "@/lib/uploads";
import { slugify } from "@/lib/utils";
import type { GalleryItem } from "@/types/gallery";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const cloudinary = (await import("@/lib/cloudinary")).cloudinary;

    const result = await new Promise<{
      public_id: string;
      secure_url: string;
      width: number;
      height: number;
    }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "mnisha-gallery",
          resource_type: "image",
          transformation: [
            { width: 1400, crop: "limit" },
            { quality: "auto:good" },
            { fetch_format: "auto" }
          ]
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result as { public_id: string; secure_url: string; width: number; height: number });
        }
      );
      uploadStream.end(buffer);
    });

    const id = slugify(file.name.replace(/\.[^.]+$/, "")) + "-" + Date.now();

    const newItem: GalleryItem = {
      id,
      image: result.secure_url,
      height: Math.min(Math.max(Math.round((result.height / result.width) * 500), 400), 800),
      uploaded: true,
      cloudinaryPublicId: result.public_id
    };

    await addUploadedItem(newItem);

    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
