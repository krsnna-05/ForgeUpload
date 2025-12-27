import { Router } from "express";
import {
  deleteFileByIdController,
  filesUploadController,
  getFileByIdController,
  getFilesController,
  videoUploadController,
} from "../controllers/upload.controllers";
import { fileUpload } from "../providers/multer.provider";

const uploadRouter = Router();

uploadRouter.post(
  "/files",
  fileUpload.single("basicFiles"),
  filesUploadController
);

uploadRouter.get("/files/:id", getFileByIdController);
uploadRouter.get("/files", getFilesController);

uploadRouter.delete("/files/:id", deleteFileByIdController);

uploadRouter.post("/video", videoUploadController);

export default uploadRouter;
