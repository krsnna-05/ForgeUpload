import type { Request, Response } from "express";
import filesRepo from "../db/files.repo";
import { randomUUID } from "crypto";

export const filesUploadController = (
  req: Request & { file?: Express.Multer.File },
  res: Response
) => {
  console.log("Uploaded file info:", req.file);

  filesRepo.createFileRecord({
    id: randomUUID(),
    originalName: req.file!.originalname,
    storedPath: req.file!.path,
    mimeType: req.file!.mimetype,
    size: req.file!.size,
  });

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({ message: "File uploaded successfully" });
};

export const videoUploadController = (req: Request, res: Response) => {
  res.status(200).json({ message: "Video uploaded successfully" });
};
