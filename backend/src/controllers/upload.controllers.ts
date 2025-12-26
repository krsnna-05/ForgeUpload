import type { Request, Response } from "express";

export const filesUploadController = (
  req: Request & { file?: Express.Multer.File },
  res: Response
) => {
  console.log("Uploaded file info:", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({ message: "File uploaded successfully" });
};

export const videoUploadController = (req: Request, res: Response) => {
  res.status(200).json({ message: "Video uploaded successfully" });
};
