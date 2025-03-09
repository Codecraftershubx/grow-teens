import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const add = async (req, res) => {
  const { title, description, type, startDate, endDate } = req.body;

  try {
    if (
      [title, type, description,].some((field) => !field || field.trim() === "")
    ) {
      return res
        .status(400)
        .json({ error: "Title, type and description are required" });
    }

    const program = await prisma.program.create({
      data: {
        title,
        description,
        type,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default add;
