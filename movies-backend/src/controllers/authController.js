import prisma from '../prismaClient.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signupSchema, loginSchema } from "../validators/userSchema.js";

export const signup = async (req, res) => {
  try {
    const data = signupSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

     await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return res.json({
      message: "Signup successful",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    // Validate input first
    const data = loginSchema.parse(req.body);

    const email = data.email.trim();
    const password = data.password;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
{ id: user.id },
 process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: error.errors[0].message });
    }
    return res.status(400).json({ message: error.message });
  }
};
