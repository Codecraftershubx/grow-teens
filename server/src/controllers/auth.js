import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, role, age } = req.body;
  // save the username and an irreversibly encrypted password
  // save gilgamesh@gmail.com | aklsdjfasdf.asdf..qwe..q.we...qwe.qw.easd

  // encrypt the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // save the new user and hashed password to the db
  try {
    if (
      [firstName, lastName, email, password, role].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        age,
      },
    });

    // create a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
};

export const loginUser = async (req, res) => {
  // we get their email, and we look up the password associated with that email in the database
  // but we get it back and see it's encrypted, which means that we cannot compare it to the one the user just used trying to login
  // so what we can to do, is again, one way encrypt the password the user just entered

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // if we cannot find a user associated with that username, return out from the function
    if (!user) {
      return res.status(404).send({ message: "Email or Password is Invalid" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    // if the password does not match, return out of the function
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Email or Password is Invalid" });
    }

    const { password: _, ...userWithoutPassword } = user;
    // then we have a successful authentication
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true, // Ensure secure cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({ user: userWithoutPassword, accessToken });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
};
