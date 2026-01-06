import express from "express";
import uploadRouter from "./routes/upload.route";
import errorMiddleware from "./middlewares/error.middleware";
import cors from "cors";
import streamRouter from "./routes/stream.route";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Server running" });
});

app.use("/api/upload", uploadRouter);
app.use("/api/stream", streamRouter);

app.use(errorMiddleware);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
