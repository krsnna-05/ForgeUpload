import { Request, Response } from "express";
import fs from "fs";
import mime from "mime-types";

const fileStreaming = (req: Request, res: Response, filePath: string) => {
  const stats = fs.statSync(filePath);
  const fileSize = stats.size;
  const range = req.headers.range;
  const contentType = mime.lookup(filePath) || "application/octet-stream";

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize || end >= fileSize) {
      res.status(416).setHeader("Content-Range", `bytes */${fileSize}`).end();
      return;
    }

    const chunkSize = end - start + 1;
    const fileStream = fs.createReadStream(filePath, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": contentType,
    });

    fileStream.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": contentType,
    });

    fs.createReadStream(filePath).pipe(res);
  }
};

export const fileStreamingController = (req: Request, res: Response) => {
  const filePath = req.query.filePath as string;

  if (!filePath) {
    res.status(400).json({ error: "filePath query parameter is required" });
    return;
  }

  console.log("Streaming file:", filePath);

  try {
    fileStreaming(req, res, filePath);
  } catch (error) {
    console.error("Error streaming file:", error);
    res.status(500).json({ error: "Failed to stream file" });
  }
};
