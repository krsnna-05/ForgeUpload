import { Router } from "express";
import { fileStreamingController } from "../controllers/filestreaming.controllers";

const streamRouter = Router();

streamRouter.get("/file", fileStreamingController);

export default streamRouter;
