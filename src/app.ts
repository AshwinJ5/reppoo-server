import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./router/index";
import { errorHandler } from "./middleware";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", router);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(errorHandler);

export default app;
