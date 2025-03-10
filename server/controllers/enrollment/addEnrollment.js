import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const add = async (req, res) => {
  const { userId, programId, enrollmentDate } = req.body;

  try {
    if (
      [userId, programId].some((field) => !field || field.trim() === "")
    ) {
      return res
        .status(400)
        .json({ error: "User and program are required" });
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        programId,
        enrollmentDate: new Date(enrollmentDate),
        status: PENDING,
      },
    });

    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default add;
