import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if ([email, password].some((field) => !field || field.trim() === "")) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        enrollments: true,
        enrollments: {
          include: { program: true, program: { include: { modules: true } } },
        },
      },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const { password: _, ...userWithoutPassword } = user;

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true, // Ensure secure cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({ user: userWithoutPassword, accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default loginUser;
