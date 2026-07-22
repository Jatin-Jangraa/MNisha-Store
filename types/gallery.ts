export type Category =
  | "Women"
  | "Men"
  | "Wedding"
  | "Casual"
  | "Luxury"
  | "Traditional"
  | "Modern"
  | "Streetwear"
  | "Summer"
  | "Winter"
  | "Luxury Gowns"
  | "Indian Wear"
  | "International"
  | "Editorial";

export const ALL_CATEGORIES: Category[] = [
  "Women",
  "Men",
  "Wedding",
  "Casual",
  "Luxury",
  "Traditional",
  "Modern",
  "Streetwear",
  "Summer",
  "Winter",
  "Luxury Gowns",
  "Indian Wear",
  "International",
  "Editorial"
];

export type GalleryItem = {
  id: string;
  designer: string;
  collection: string;
  category: Category;
  year: string;
  image: string;
  alt: string;
  height: number;
  description: string;
  materials: string[];
  colors: string[];
  palette: string[];
  featured?: boolean;
  uploaded?: boolean;
  cloudinaryPublicId?: string;
};

export type Designer = {
  id: string;
  name: string;
  photo: string;
  specialty: string;
  yearsActive: string;
  biography: string;
  collections: string[];
  stats: {
    collections: number;
    exhibitions: number;
    editorials: number;
  };
};

export type Collection = {
  id: string;
  title: string;
  season: string;
  description: string;
  image: string;
  tone: string;
  count: number;
};
