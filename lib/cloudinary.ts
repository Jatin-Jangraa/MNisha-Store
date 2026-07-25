import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export { cloudinary };

export async function uploadImage(file: Buffer, folder = "mnisha-gallery") {
  return new Promise<CloudinaryUploadResult>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [
          { width: 1400, crop: "limit" },
          { quality: "auto:good" },
          { fetch_format: "auto" }
        ]
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result as unknown as CloudinaryUploadResult);
      }
    );
    uploadStream.end(file);
  });
}

export async function deleteImage(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}

export type CloudinaryUploadResult = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  folder?: string;
};
