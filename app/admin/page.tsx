"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { UploadForm } from "@/components/admin/upload-form";
import { UploadedItemsList } from "@/components/admin/uploaded-items-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);

  function handleUpload() {
    setRefreshKey((k) => k + 1);
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="pt-24">
      <section className="relative bg-background py-12 md:py-20">
        <div className="absolute inset-0 noise pointer-events-none opacity-20" />
        <div className="container relative max-w-4xl">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="gold">Admin</Badge>
              <h1 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">
                Upload Images
              </h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="mt-2 shrink-0"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-2xl">Upload New Image</h2>
              <div className="mt-6">
                <UploadForm onUpload={handleUpload} />
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl">Uploaded Images</h2>
              <div className="mt-6">
                <UploadedItemsList refreshKey={refreshKey} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
