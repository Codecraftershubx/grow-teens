import dotenv from "dotenv";

dotenv.config({ path: `/.env` });

export const PORT = process.env.SERVER_PORT;
export const DATABASE_URL =
  process.env.NODE_ENV !== "development"
    ? process.env.DATABASE_LIVE_URL
    : process.env.DATABASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
