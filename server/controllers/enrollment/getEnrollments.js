import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getEnrollment = async (req, res) => {
  try {
    const programs = await prisma.enrollment.findMany();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getEnrollment;
