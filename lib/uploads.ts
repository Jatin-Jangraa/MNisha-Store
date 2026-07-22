import { access, readFile, writeFile } from "fs/promises";
import path from "path";

import type { GalleryItem } from "@/types/gallery";

const UPLOADS_FILE = path.join(process.cwd(), "data", "uploads.json");

async function ensureFileExists() {
  try {
    await access(UPLOADS_FILE);
  } catch {
    await writeFile(UPLOADS_FILE, "[]", "utf-8");
  }
}

export async function getUploadedItems(): Promise<GalleryItem[]> {
  try {
    await ensureFileExists();
    const data = await readFile(UPLOADS_FILE, "utf-8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function addUploadedItem(item: GalleryItem): Promise<GalleryItem[]> {
  const items = await getUploadedItems();
  items.unshift(item);
  await writeFile(UPLOADS_FILE, JSON.stringify(items, null, 2), "utf-8");
  return items;
}

export async function removeUploadedItem(id: string): Promise<GalleryItem[]> {
  const items = await getUploadedItems();
  const filtered = items.filter((item) => item.id !== id);
  await writeFile(UPLOADS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return filtered;
}

export async function getUploadedItem(id: string): Promise<GalleryItem | undefined> {
  const items = await getUploadedItems();
  return items.find((item) => item.id === id);
}
