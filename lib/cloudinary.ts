import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export { cloudinary };

const FOLDER = "mnisha-gallery";

export async function listImages(maxResults = 500) {
  const result = await cloudinary.api.resources({
    type: "upload",
    prefix: `${FOLDER}/`,
    max_results: maxResults
  });

  return result.resources.map((resource: Record<string, unknown>) => ({
    id: (resource.public_id as string).replace(`${FOLDER}/`, ""),
    image: resource.secure_url as string,
    height: Math.min(Math.max(Math.round(((resource.height as number) / (resource.width as number)) * 500), 400), 800),
    cloudinaryPublicId: resource.public_id as string
  }));
}

export async function getImage(publicId: string) {
  const fullId = `${FOLDER}/${publicId}`;
  try {
    const result = await cloudinary.api.resource(fullId);
    return {
      id: publicId,
      image: result.secure_url as string,
      height: Math.min(Math.max(Math.round(((result.height as number) / (result.width as number)) * 500), 400), 800),
      cloudinaryPublicId: result.public_id as string
    };
  } catch {
    return null;
  }
}

export async function deleteImage(publicId: string) {
  const fullId = publicId.startsWith(FOLDER) ? publicId : `${FOLDER}/${publicId}`;
  return cloudinary.uploader.destroy(fullId);
}
