import prisma from "../prismaClient.js";

export const createEnrollment = async (req, res) => {
  const { userId, programId } = req.body;

  try {
    if ([userId, programId].some((field) => !field)) {
      return res.status(400).json({ error: "User and program are required" });
    }

    const existingEnrollment = await prisma.enrollment.findFirst({
      where: { userId, programId },
    });

    if (existingEnrollment) {
      return res
        .status(400)
        .json({ error: "User is already enrolled in this program" });
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        programId,
        // status: statusType.ACTIVE,
      },
    });

    res.status(201).json(enrollment);
  } catch (error) {
    console.error("Error enrolling user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEnrollmentById = async (req, res) => {
  const { userId } = req.params;
  try {
    const enrollment = await prisma.enrollment.findMany({
      where: { userId: +userId },
      include: { program: true },
    });

    if (!enrollment)
      return res.status(404).json({ error: "Enrollment not found" });
    res.status(200).json(enrollment);
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getEnrollmentStatus = async (req, res) => {
  const { userId, courseId } = req.params;
  try {
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: Number(userId),
        programId: Number(courseId),
      },
      include: { program: true },
    });

    if (!enrollment) {
      return res.status(200).json({ enrolled: false });
    }

    return res.status(200).json({
      enrolled: true,
      enrollmentStatus: enrollment.status,
      enrolledAt: enrollment.enrollmentDate,
    });
  } catch (error) {
    console.error("Error fetching enrollment status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
