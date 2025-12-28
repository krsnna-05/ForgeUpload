import multer, { diskStorage } from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "uploads", "raw");

const allowedMimeTypesFiles = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/dng",
  "application/pdf",
  "text/plain",
];

const allowedMimeTypesVideo = ["video/mp4", "video/mpeg", "video/quicktime"];

// ensure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadDir);
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const ext = path.extname(file.originalname);

    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const fileUpload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },

  fileFilter(req, file, callback) {
    if (allowedMimeTypesFiles.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Invalid file type."));
    }
  },
});

const videoUpload = multer({
  storage: storage,
});

export { fileUpload, videoUpload };
