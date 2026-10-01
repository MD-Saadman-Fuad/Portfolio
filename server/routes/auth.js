import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "portfolio-super-secret-key-12345";

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check default fallback admin or DB user
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      if (email === "admin@portfolio.com" && password === "admin123") {
        const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
        return res.json({ token, user: { email, role: "admin" } });
      }
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email, role: "admin" }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
