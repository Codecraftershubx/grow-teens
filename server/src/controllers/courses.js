import prisma from "../prismaClient.js";

export const createModule = async (req, res) => {
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
        programId: +programId,
        image: imageUrl,
        content,
      },
    });

    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateModule = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await prisma.courseModule.findUnique({
      where: { id: +id },
      include: { program: true },
    });
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteModule = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.courseModule.delete({ where: { id: +id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getModuleById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await prisma.courseModule.findUnique({
      where: { id: +id },
      include: { program: true },
    });
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getModules = async (req, res) => {
  const count = await prisma.courseModule.count();
  const modules = await prisma.courseModule.findMany({
    include: { program: true },
    skip: +req.query.skip || 0,
    take: 10,
  });
  res.status(200).json({ count, data: modules });
};
