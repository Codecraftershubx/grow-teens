import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const adminMiddleware = async (req, res, next) => {
  const user = req.user;
  if (user.role !== "ADMIN") {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    next();
  }
};

export default adminMiddleware;
