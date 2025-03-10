import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deletePrograms = async (req, res) => {
  try {
    const programs = await prisma.program.delete({
        where: { id: Number(req.params.id) },
    });
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default deletePrograms;
