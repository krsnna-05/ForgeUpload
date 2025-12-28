import express from "express";
import uploadRouter from "./routes/upload.route";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();
app.use(express.json());
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Server running" });
});

app.use("/api/upload", uploadRouter);

app.use(errorMiddleware);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
