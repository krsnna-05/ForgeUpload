import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import filesRepo from "../db/files.repo";

/**
 * UPLOAD FILE
 */
export const filesUploadController = async (
  req: Request & { file?: Express.Multer.File },
  res: Response
) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }
  const id = randomUUID();

  await filesRepo.create({
    id: id,
    originalName: req.file.originalname,
    storedPath: req.file.path,
    mimeType: req.file.mimetype,
    size: req.file.size,
  });

  return res.status(201).json({
    success: true,
    message: "File uploaded successfully",
    file: {
      id: id,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
    },
  });
};

/**
 * GET FILE BY ID
 */
export const getFileByIdController = async (req: Request, res: Response) => {
  const fileId = req.params.id;

  const file = await filesRepo.getById(fileId);
  if (!file) {
    return res.status(404).json({
      success: false,
      message: "File not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: file,
  });
};

/**
 * LIST FILES (PAGINATED)
 */
export const getFilesController = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const files = await filesRepo.list(page, limit);

  return res.status(200).json({
    success: true,
    page,
    limit,
    count: files.length,
    data: files,
  });
};

/**
 * DELETE FILE (DISK → DB)
 */
export const deleteFileByIdController = async (req: Request, res: Response) => {
  const fileId = req.params.id;

  // 1️⃣ FETCH FIRST
  const file = await filesRepo.getById(fileId);
  if (!file) {
    return res.status(404).json({
      success: false,
      message: "File not found",
    });
  }

  // 2️⃣ DELETE FROM DISK
  try {
    await fs.unlink(file.storedPath);
  } catch (err: any) {
    if (err.code !== "ENOENT") {
      return res.status(500).json({
        success: false,
        message: "Error deleting file from disk",
        error: err.code,
      });
    }
    // ENOENT = file already gone → continue
  }

  // 3️⃣ DELETE DB ROW LAST
  await filesRepo.deleteById(fileId);

  return res.status(200).json({
    success: true,
    message: "File deleted successfully",
  });
};

/**
 * VIDEO UPLOAD (placeholder)
 */
export const videoUploadController = (_: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Video uploaded successfully",
  });
};
