import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./router/index";
import { errorHandler } from "./middleware";
import path from "path";

const app = express();

const allowedOrigins = [process.env.DEV_FRONTEND_URL, process.env.PROD_FRONTEND_URL];
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed"));
            }
        },
        credentials: true,
    })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", router);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(errorHandler);

export default app;
