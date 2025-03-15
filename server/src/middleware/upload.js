import { v2 as cloudinary } from "cloudinary";

export const uploadToCloudinary = async (req, res, next) => {
  if (!req.file) {
    return next(); // No image, proceed to the next middleware/route
  }

  try {
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(req.file.buffer);
    });

    req.cloudinaryUrl = uploadResult.secure_url;
    req.cloudinaryPublicId = uploadResult.public_id; // Store public ID for potential deletion

    next(); // Proceed to the next middleware/route
  } catch (error) {
    console.error("Upload error:", error);
    return res
      .status(500)
      .json({
        error: "Image upload failed",
        details: error.message,
      });
  }
};
