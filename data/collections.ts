import { getImageUrl } from "@/lib/utils";

const image = (id: string, width?: number) => getImageUrl(id, width);

export const collections = [
  {
    id: "summer-collection",
    image: image("photo-1496747611176-843222e1e57c")
  },
  {
    id: "winter-collection",
    image: image("photo-1516762689617-e1cffcef479d")
  },
  {
    id: "luxury-collection",
    image: image("photo-1515886657613-9f3515b0c78f")
  },
  {
    id: "wedding-collection",
    image: image("photo-1594552072238-b8a33785b261")
  },
  {
    id: "traditional-collection",
    image: image("photo-1610030469983-98e550d6193c")
  },
  {
    id: "minimal-collection",
    image: image("photo-1509631179647-0177331693ae")
  }
];
