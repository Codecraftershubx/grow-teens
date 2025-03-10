import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const add = async (req, res) => {
  const { title, description, programId, content } = req.body;

  if (!req.cloudinaryUrl) {
    return res.status(500).send("Image upload failed.");
  }
  // Access the Cloudinary URL from req.cloudinaryUrl
  const imageUrl = req.cloudinaryUrl;
  const publicId = req.cloudinaryPublicId;

  console.log("Image URL:", imageUrl);
  console.log("Public ID:", publicId);

  try {
    if (
      [title, description, programId].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      return res
        .status(400)
        .json({ error: "Title, program and description are required" });
    }

    const program = await prisma.courseModule.create({
      data: {
        title,
        description,
        programId: Number(programId),
        image: imageUrl,
        content,
      },
    });

    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default add;
