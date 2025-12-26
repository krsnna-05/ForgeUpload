import type { Request, Response, NextFunction } from "express";
import multer from "multer";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    let message = err.message;

    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        message = "File size is too large.";
        break;
      case "LIMIT_UNEXPECTED_FILE":
        message = "Single file is allowed.";
        break;
    }

    return res.status(400).json({ success: false, message: message });
  }

  if (err instanceof Error) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    error: "Internal server error",
  });
};

export default errorMiddleware;
