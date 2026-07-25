import { getImageUrl, slugify } from "@/lib/utils";

const image = (id: string, width?: number) => getImageUrl(id, width);

export const designers = [
  {
    id: slugify("Amara Valen"),
    photo: image("photo-1494790108377-be9c29b29330")
  },
  {
    id: slugify("Luca Ren"),
    photo: image("photo-1500648767791-00dcc994a43e")
  },
  {
    id: slugify("Ira Mehta"),
    photo: image("photo-1534528741775-53994a69daeb")
  },
  {
    id: slugify("Mika Sato"),
    photo: image("photo-1508214751196-bcfd4ca60f91")
  }
];
