import express, { Request, Response } from "express";
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
app.get("/", (req: Request, res: Response) => {
    res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>PB Server</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: linear-gradient(120deg, #1e3c72, #2a5298);
                    margin: 0;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    color: #fff;
                }
            </style>
        </head>

        <body>
            <div class="container">
                <h1>🚀 Reppoo Server Running</h1>
            </div>
        </body>
        </html>
    `);
});

export default app;
