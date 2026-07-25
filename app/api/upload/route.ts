import { NextRequest, NextResponse } from "next/server";

import { addUploadedItem } from "@/lib/uploads";
import { slugify } from "@/lib/utils";
import type { Category, GalleryItem } from "@/types/gallery";
import { ALL_CATEGORIES } from "@/types/gallery";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const designer = (formData.get("designer") as string) || "";
    const collection = (formData.get("collection") as string) || "";
    const category = (formData.get("category") as string) || "";
    const year = (formData.get("year") as string) || "";
    const alt = (formData.get("alt") as string) || "";
    const description = (formData.get("description") as string) || "";
    const materialsStr = (formData.get("materials") as string) || "";
    const colorsStr = (formData.get("colors") as string) || "";
    const paletteStr = (formData.get("palette") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    if (!designer || !collection || !category) {
      return NextResponse.json(
        { error: "Designer, collection, and category are required" },
        { status: 400 }
      );
    }

    if (!ALL_CATEGORIES.includes(category as Category)) {
      return NextResponse.json({ error: `Invalid category: ${category}` }, { status: 400 });
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

    const materials = materialsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const colors = colorsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const palette = paletteStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const id = slugify(collection) + "-" + Date.now();

    const newItem: GalleryItem = {
      id,
      designer,
      collection,
      category: category as Category,
      year: year || new Date().getFullYear().toString(),
      image: result.secure_url,
      alt: alt || `${collection} by ${designer}`,
      height: Math.min(Math.max(Math.round((result.height / result.width) * 500), 400), 800),
      description: description || "",
      materials: materials.length > 0 ? materials : ["N/A"],
      colors: colors.length > 0 ? colors : ["N/A"],
      palette: palette.length > 0 ? palette : ["#C9A227", "#111111", "#F8F8F8", "#FFFFFF"],
      featured: false,
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
