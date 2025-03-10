import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsers = async (req, res) => {

  // TODO: Add role-based access control
  // if (!req.user) {
  //   return res.status(403).json({ error: "Access denied" });
  // }
  // if (req.user.role !== "ADMIN" || req.user.role !== "MENTOR") {
  //   return res.status(403).json({ error: "Access denied" });
  // }
  
  try {
    const users = await prisma.user.findMany();
    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }
    
    // Remove the password field from each user before sending the response
    const usersWithoutPasswords = users.map(({ password, ...rest }) => rest);
    res.status(200).json(usersWithoutPasswords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getUsers;
