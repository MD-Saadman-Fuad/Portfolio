import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const setupCloudinary = () => {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME?.replace(/['"]/g, "").trim();
  const api_key = process.env.CLOUDINARY_API_KEY?.replace(/['"]/g, "").trim();
  const api_secret = process.env.CLOUDINARY_API_SECRET?.replace(/['"]/g, "").trim();

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
    secure: true,
  });
  return cloudinary;
};

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const isPdf = req.file.mimetype === "application/pdf" || req.file.originalname.endsWith(".pdf");
    const folder = req.body.folder || (isPdf ? "portfolio/cv" : "portfolio");

    // Primary: Upload to Cloudinary Global CDN
    try {
      const cld = setupCloudinary();
      const uploadOptions = {
        folder,
        resource_type: "auto",
        public_id: isPdf ? `cv_${Date.now()}` : undefined,
      };

      const uploadPromise = new Promise((resolve, reject) => {
        const stream = cld.uploader.upload_stream(uploadOptions, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
        stream.end(req.file.buffer);
      });

      const result = await uploadPromise;
      console.log(`Cloudinary Global Upload Success: ${result.secure_url}`);
      return res.json({ url: result.secure_url, public_id: result.public_id });
    } catch (cldError) {
      console.warn("Cloudinary upload notice (falling back to local storage if needed):", cldError.message);

      // Fallback: Save file locally in server/uploads/
      const ext = path.extname(req.file.originalname) || (isPdf ? ".pdf" : ".png");
      const filename = `${isPdf ? "cv" : "file"}_${Date.now()}${ext}`;
      const filePath = path.join(uploadsDir, filename);

      fs.writeFileSync(filePath, req.file.buffer);

      const host = req.get("host") || "localhost:5000";
      const protocol = req.protocol || "http";
      const localUrl = `${protocol}://${host}/uploads/${filename}`;

      return res.json({
        url: localUrl,
        filename,
        message: "Cloudinary pending verification; uploaded to local server storage fallback",
      });
    }
  } catch (error) {
    console.error("Upload route error:", error);
    res.status(500).json({ message: error.message || "Upload failed" });
  }
});

export default router;
