import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUser = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getUser;
