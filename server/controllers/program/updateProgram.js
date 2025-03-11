import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateProgram = async (req, res) => {
  const { id } = req.params;

  const imageUrl = req.cloudinaryUrl;

  try {
    const program = await prisma.program.update({
      where: { id: Number(id) },
      //   include: { modules: true },
      data: { ...req.body, image: imageUrl },
    });
    if (!program) return res.status(404).json({ error: "Program not found" });
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default updateProgram;
