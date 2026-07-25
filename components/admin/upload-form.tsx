"use client";

import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";

export function UploadForm({ onUpload }: { onUpload: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (selected.size > 10 * 1024 * 1024) {
      setError("File size must be under 10MB");
      return;
    }

    setFile(selected);
    setError(null);
    setSuccess(false);

    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(selected);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      if (droppedFile.size > 10 * 1024 * 1024) {
        setError("File size must be under 10MB");
        return;
      }
      setFile(droppedFile);
      setError(null);
      setSuccess(false);
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(droppedFile);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function clearFile() {
    setFile(null);
    setPreview(null);
    setError(null);
    setSuccess(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file) {
      setError("Please select an image");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setSuccess(true);
      onUpload();
      clearFile();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileRef.current?.click()}
        className={`relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-all duration-500 ${
          preview
            ? "border-luxury-gold/30 bg-luxury-gold/3"
            : "border-border/50 bg-secondary/20 hover:border-luxury-gold/25 hover:bg-luxury-gold/3"
        }`}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {preview ? (
          <div className="relative w-full max-w-sm">
            <Image
              src={preview}
              alt="Preview"
              width={400}
              height={500}
              className="mx-auto max-h-72 rounded-xl object-cover shadow-soft"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-red-500 text-white shadow-lg transition-transform duration-300 hover:scale-110"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground/50">
              {file?.name} ({((file?.size || 0) / 1024 / 1024).toFixed(2)} MB)
            </p>
          </div>
        ) : (
          <>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-muted/40">
              <ImagePlus className="h-6 w-6 text-muted-foreground/30" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Drag and drop an image here, or click to browse
            </p>
            <p className="mt-1 text-xs text-muted-foreground/35">
              PNG, JPG, WEBP up to 10MB
            </p>
          </>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-3 text-sm text-red-500">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-green-500/10 bg-green-500/5 px-4 py-3 text-sm text-green-600">
          Image uploaded successfully!
        </div>
      )}

      <Button type="submit" variant="gold" size="lg" disabled={uploading || !file} className="w-full">
        {uploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading to Cloudinary...
          </>
        ) : (
          "Upload Image"
        )}
      </Button>
    </form>
  );
}
