import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getEnrollment = async (req, res) => {
  const { id } = req.params;
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: Number(id) },
      include: { program: true },
    });
    if (!enrollment) return res.status(404).json({ error: "Program not found" });
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getEnrollment;