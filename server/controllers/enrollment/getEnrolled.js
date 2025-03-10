import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getEnrolled = async (req, res) => {
  const { userId, programId } = req.params;

  try {
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: parseInt(userId),
        programId: parseInt(programId),
      },
    });

    if (enrollment) {
      return res.json({
        enrolled: true,
        status: enrollment.status,
        enrolledAt: enrollment.enrollmentDate,
      });
    } else {
      return res.json({ enrolled: false });
    }
  } catch (error) {
    console.error("Error fetching enrollment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getEnrolled;
