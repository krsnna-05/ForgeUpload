import type { Request, Response } from "express";
import filesRepo from "../db/files.repo";
import { randomUUID } from "crypto";
import fs from "fs/promises";

export const filesUploadController = async (
  req: Request & { file?: Express.Multer.File },
  res: Response
) => {
  console.log("Uploaded file info:", req.file);

  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  await filesRepo.createFileRecord({
    id: randomUUID(),
    originalName: req.file!.originalname,
    storedPath: req.file!.path,
    mimeType: req.file!.mimetype,
    size: req.file!.size,
  });

  res.status(200).json({ message: "File uploaded successfully" });
};

export const getFileByIdController = async (req: Request, res: Response) => {
  const fileId = req.params.id;

  const fileRecord = await filesRepo.getFileById(fileId);

  if (!fileRecord) {
    return res.status(404).json({ success: false, message: "File not found" });
  }

  res.status(200).json({ success: true, data: fileRecord });
};

export const getFilesController = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const files = await filesRepo.getFiles(page, limit);

  if (files.length === 0) {
    return res.status(404).json({ success: false, message: "No files found" });
  }

  res.status(200).json({ success: true, data: files });
};

export const deleteFileByIdController = async (req: Request, res: Response) => {
  const fileId = req.params.id;

  try {
    const fileRecord = await filesRepo.deleteFileById(fileId);

    fs.unlink(fileRecord.storedPath).catch((err) => {
      return res
        .status(500)
        .json({ success: false, message: "Error deleting file from server" });
    });

    res
      .status(200)
      .json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error deleting file" });
  }
};

export const videoUploadController = (req: Request, res: Response) => {
  res.status(200).json({ message: "Video uploaded successfully" });
};
