import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, role, age } = req.body;

  try {
    if (
      [firstName, lastName, email, password, role].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { firstName, lastName, email, password: hashedPassword, role, age },
    });

    const { password: _, ...userWithoutPassword } = user;

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default registerUser;
