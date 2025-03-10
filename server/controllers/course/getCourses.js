import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getCourses = async (req, res) => {
  try {
    const courses = await prisma.courseModule.findMany({
      include: {
        program: true,
      },
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getCourses;
