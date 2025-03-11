import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const add = async (req, res) => {
  const { title, description, type } = req.body;
  

  if (!req.cloudinaryUrl) {
    return res.status(500).send("Image upload failed.");
  }
  // Access the Cloudinary URL from req.cloudinaryUrl
  const imageUrl = req.cloudinaryUrl;
  const publicId = req.cloudinaryPublicId;

  try {
    if (
      [title, type, description,].some((field) => !field || field.trim() === "")
    ) {
      return res
        .status(400)
        .json({ error: "Title, type and description are required" });
    }

    const program = await prisma.program.create({
      data: {
        title,
        description,
        type,
        image: imageUrl,
        startDate: new Date(),
      },
    });

    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default add;
