"use client";

import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ALL_CATEGORIES } from "@/types/gallery";

export function UploadForm({ onUpload }: { onUpload: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [designer, setDesigner] = useState("");
  const [collection, setCollection] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [alt, setAlt] = useState("");
  const [description, setDescription] = useState("");
  const [materials, setMaterials] = useState("");
  const [colors, setColors] = useState("");
  const [palette, setPalette] = useState("");

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
    if (!designer.trim()) {
      setError("Designer name is required");
      return;
    }
    if (!collection.trim()) {
      setError("Collection name is required");
      return;
    }
    if (!category) {
      setError("Please select a category");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("designer", designer.trim());
      formData.append("collection", collection.trim());
      formData.append("category", category);
      formData.append("year", year);
      formData.append("alt", alt.trim());
      formData.append("description", description.trim());
      formData.append("materials", materials);
      formData.append("colors", colors);
      formData.append("palette", palette);

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
      clearForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function clearForm() {
    setFile(null);
    setPreview(null);
    setDesigner("");
    setCollection("");
    setCategory("");
    setYear(new Date().getFullYear().toString());
    setAlt("");
    setDescription("");
    setMaterials("");
    setColors("");
    setPalette("");
    if (fileRef.current) fileRef.current.value = "";
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

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/50">
            Designer *
          </label>
          <Input
            value={designer}
            onChange={(e) => setDesigner(e.target.value)}
            placeholder="e.g. Amara Valen"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/50">
            Collection *
          </label>
          <Input
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
            placeholder="e.g. Golden Hour Atelier"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/50">
            Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex h-12 w-full rounded-full border border-border/80 bg-background/90 px-5 text-sm shadow-soft outline-none backdrop-blur-sm transition-all duration-500 placeholder:text-muted-foreground/40 focus:border-luxury-gold focus:ring-4 focus:ring-luxury-gold/8"
          >
            <option value="">Select category</option>
            {ALL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/50">
            Year
          </label>
          <Input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2026"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/50">
          Alt Text
        </label>
        <Input
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          placeholder="Describe the image for accessibility"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/50">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A brief description of this design..."
          rows={3}
          className="flex w-full rounded-2xl border border-border/80 bg-background/90 px-4 py-3 text-sm shadow-soft outline-none backdrop-blur-sm transition-all duration-500 placeholder:text-muted-foreground/35 focus:border-luxury-gold focus:ring-4 focus:ring-luxury-gold/8"
        />
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/50">
            Materials (comma separated)
          </label>
          <Input
            value={materials}
            onChange={(e) => setMaterials(e.target.value)}
            placeholder="e.g. Silk, Cotton, Wool"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/50">
            Colors (comma separated)
          </label>
          <Input
            value={colors}
            onChange={(e) => setColors(e.target.value)}
            placeholder="e.g. Black, Gold, Ivory"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/50">
          Color Palette (comma separated hex codes)
        </label>
        <Input
          value={palette}
          onChange={(e) => setPalette(e.target.value)}
          placeholder="e.g. #B8860B, #111111, #F8F8F8, #FFFFFF"
        />
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

      <Button type="submit" variant="gold" size="lg" disabled={uploading} className="w-full">
        {uploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading to Cloudinary...
          </>
        ) : (
          "Upload Design"
        )}
      </Button>
    </form>
  );
}
