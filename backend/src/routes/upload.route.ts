import { Router } from "express";
import {
  filesUploadController,
  videoUploadController,
} from "../controllers/upload.controllers";
import { fileUpload } from "../providers/multer.provider";

const uploadRouter = Router();

uploadRouter.post(
  "/files",
  fileUpload.single("basicFiles"),
  filesUploadController
);

uploadRouter.post("/video", videoUploadController);

export default uploadRouter;
