import prisma from "../prismaClient.js";

export const createProgram = async (req, res) => {
  const { title, description, type } = req.body;

  if (!req.cloudinaryUrl) {
    return res.status(500).send("Image upload failed.");
  }
  // Access the Cloudinary URL from req.cloudinaryUrl
  const imageUrl = req.cloudinaryUrl;
  const publicId = req.cloudinaryPublicId;

  try {
    if (
      [title, type, description].some((field) => !field || field.trim() === "")
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

export const updateProgram = async (req, res) => {
  const { id } = req.params;
  const { title, description, type } = req.body;
  try {
    const program = await prisma.program.update({
      where: { id: +id },
      data: { title, description, type },
    });
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProgram = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.program.delete({ where: { id: +id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProgramById = async (req, res) => {
  const { id } = req.params;
  try {
    const program = await prisma.program.findFirstOrThrow({
      where: { id: +id },
      include: { modules: true },
    });
    if (!program) return res.status(404).json({ error: "Program not found" });
    res.status(200).json(program);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Program not found" });
  }
};

export const getPrograms = async (req, res) => {
  const count = await prisma.program.count();
  const products = await prisma.program.findMany({
    include: { modules: true },
    skip: +req.query.skip || 0,
    take: 10,
  });
  res.status(200).json({ count, data: products });
};
