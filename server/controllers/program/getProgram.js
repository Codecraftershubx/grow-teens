import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getProgram = async (req, res) => {
  const { id } = req.params;
  try {
    const program = await prisma.program.findUnique({
      where: { id: Number(id) },
      include: { modules: true },
    });
    if (!program) return res.status(404).json({ error: "Program not found" });
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getProgram;