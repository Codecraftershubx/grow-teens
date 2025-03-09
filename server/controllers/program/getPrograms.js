import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPrograms = async (req, res) => {
  try {
    const programs = await prisma.program.findMany();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getPrograms;
