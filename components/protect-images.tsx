"use client";

import { useEffect } from "react";

export function ProtectImages() {
  useEffect(() => {
    const preventImageAction = (event: MouseEvent | DragEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("img")) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventImageAction);
    document.addEventListener("dragstart", preventImageAction);
    return () => {
      document.removeEventListener("contextmenu", preventImageAction);
      document.removeEventListener("dragstart", preventImageAction);
    };
  }, []);

  return null;
}
