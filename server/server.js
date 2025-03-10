import express from "express";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";
import { v2 as cloudinary } from "cloudinary";

import router from "./routes/index.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.SERVER_PORT || 8080;

app.get("/", (req, res) => {
  return res.redirect("/auth");
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Placeholder Database Model
const Image = {
  async create(data) {
    console.log("Simulating database save:", data);
    return { id: "fake-db-id", ...data };
  },
};

// Image Upload Endpoint
app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No image file provided.");
  }

  const { title, description, categories } = req.body;

  try {
    // Upload to Cloudinary using a Promise
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(req.file.buffer); // Stream the buffer to Cloudinary
    });

    const imageUrl = uploadResult.secure_url;
    const publicId = uploadResult.public_id;

    try {
      const imageData = {
        title: title,
        description: description,
        categories: categories,
        cloudinary_url: imageUrl,
        cloudinary_public_id: publicId, // Store Cloudinary's public ID
      };

      const savedImage = await Image.create(imageData);

      res.status(201).json({
        message:
          "Image uploaded to Cloudinary and metadata saved successfully!",
        image_url: imageUrl,
        public_id: publicId, // Return Cloudinary's public ID
        db_id: savedImage.id,
      });
    } catch (dbError) {
      console.error("Database error:", dbError);

      // **Important:** Consider deleting the image from Cloudinary if the DB save fails.
      cloudinary.uploader.destroy(publicId, (destroyError, destroyResult) => {
        if (destroyError) {
          console.error("Error deleting image from Cloudinary:", destroyError);
        } else {
          console.log("Image deleted from Cloudinary:", destroyResult);
        }
      });

      res
        .status(500)
        .json({
          error: "Image uploaded to Cloudinary, but database save failed",
          details: dbError.message,
        });
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res
      .status(500)
      .json({
        error: "Cloudinary image upload failed",
        details: error.message,
      });
  }
});

app.use("/courses", router.courses);
app.use("/auth", router.users);
app.use("/programs", router.programs);
app.use("/enrollments", router.enrollments);

// app.get('/test-db', async (req, res) => {
//   try {
//     const users = await prisma.user.findMany({ take: 1 });
//     res.json({ message: 'Database is connected', users });
//   } catch (error) {
//     console.error('Database connection error:', error);
//     res.status(500).json({ message: 'Database connection failed', error: error.message });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
