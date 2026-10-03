import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET Profile
router.get("/profile", async (req, res) => {
  try {
    const profile = await prisma.profile.findFirst();
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
});

// GET About Highlights
router.get("/highlights", async (req, res) => {
  try {
    const highlights = await prisma.aboutHighlight.findMany({
      orderBy: { order: "asc" },
    });
    res.json(highlights);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch highlights", error: error.message });
  }
});

// GET Experiences
router.get("/experiences", async (req, res) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch experiences", error: error.message });
  }
});

// GET Education
router.get("/education", async (req, res) => {
  try {
    const education = await prisma.education.findMany({
      orderBy: { order: "asc" },
    });
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch education", error: error.message });
  }
});

// GET Projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects", error: error.message });
  }
});

// GET Skills
router.get("/skills", async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { order: "asc" },
    });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch skills", error: error.message });
  }
});

// POST Contact Message
router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = await prisma.contactMessage.create({
      data: { name, email, message },
    });

    res.status(201).json({ message: "Message received successfully!", data: newMessage });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error: error.message });
  }
});

export default router;
