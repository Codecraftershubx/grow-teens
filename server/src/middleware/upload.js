import { v2 as cloudinary } from "cloudinary";

export const uploadToCloudinary = async (req, res, next) => {
  if (!req.files) {
    return next(); // No files, proceed to the next middleware/route
  }

  try {
    // Handle thumbnail if present
    if (req.files.thumbnail && req.files.thumbnail[0]) {
      const thumbnailResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "image" }, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          })
          .end(req.files.thumbnail[0].buffer);
      });
      req.cloudinaryUrl = thumbnailResult.secure_url;
      req.cloudinaryThumbnailId = thumbnailResult.public_id;
    }

    // Handle cover image if present
    if (req.files.coverImage && req.files.coverImage[0]) {
      const coverImageResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "image" }, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          })
          .end(req.files.coverImage[0].buffer);
      });
      req.coverImageUrl = coverImageResult.secure_url;
      req.cloudinaryCoverImageId = coverImageResult.public_id;
    }

    next(); // Proceed to the next middleware/route
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      error: "Image upload failed",
      details: error.message,
    });
  }
};
