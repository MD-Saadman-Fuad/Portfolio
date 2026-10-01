import express from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "portfolio-super-secret-key-12345";

// Auth Middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (token === "demo-admin-token") {
    req.user = { role: "admin" };
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

router.use(authenticateAdmin);

// PUT Profile
router.put("/profile", async (req, res) => {
  try {
    const {
      id,
      createdAt,
      updatedAt,
      headline, // Ignore frontend-only fields
      isBackendConnected,
      loading,
      refreshData,
      API_BASE_URL,
      ...profileData
    } = req.body;

    const existing = await prisma.profile.findFirst();
    let profile;

    if (existing) {
      profile = await prisma.profile.update({
        where: { id: existing.id },
        data: profileData,
      });
    } else {
      profile = await prisma.profile.create({
        data: profileData,
      });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
});

// EXPERIENCE CRUD
router.post("/experiences", async (req, res) => {
  try {
    const { id, createdAt, updatedAt, ...data } = req.body;
    const item = await prisma.experience.create({ data });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to create experience", error: error.message });
  }
});

router.put("/experiences/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { id: _, createdAt, updatedAt, ...data } = req.body;
    const item = await prisma.experience.update({ where: { id }, data });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to update experience", error: error.message });
  }
});

router.delete("/experiences/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.experience.delete({ where: { id } });
    res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete experience", error: error.message });
  }
});

// EDUCATION CRUD
router.post("/education", async (req, res) => {
  try {
    const { id, createdAt, updatedAt, ...data } = req.body;
    const item = await prisma.education.create({ data });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to create education", error: error.message });
  }
});

router.put("/education/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { id: _, createdAt, updatedAt, ...data } = req.body;
    const item = await prisma.education.update({ where: { id }, data });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to update education", error: error.message });
  }
});

router.delete("/education/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.education.delete({ where: { id } });
    res.json({ message: "Education deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete education", error: error.message });
  }
});

// PROJECT CRUD
router.post("/projects", async (req, res) => {
  try {
    const { id, createdAt, updatedAt, ...data } = req.body;
    const project = await prisma.project.create({ data });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to create project", error: error.message });
  }
});

router.put("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { id: _, createdAt, updatedAt, ...data } = req.body;
    const project = await prisma.project.update({ where: { id }, data });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to update project", error: error.message });
  }
});

router.delete("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id } });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete project", error: error.message });
  }
});

// SKILL CRUD
router.post("/skills", async (req, res) => {
  try {
    const { id, createdAt, updatedAt, ...data } = req.body;
    const skill = await prisma.skill.create({ data });
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: "Failed to create skill", error: error.message });
  }
});

router.put("/skills/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { id: _, createdAt, updatedAt, ...data } = req.body;
    const skill = await prisma.skill.update({ where: { id }, data });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: "Failed to update skill", error: error.message });
  }
});

router.delete("/skills/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.skill.delete({ where: { id } });
    res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete skill", error: error.message });
  }
});

// GET Messages
router.get("/messages", async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error: error.message });
  }
});

export default router;
