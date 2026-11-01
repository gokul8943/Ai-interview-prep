import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import { errorHandler } from "../adapters/middleware/errorHandler";
import authRouter from "../adapters/routes/auth.routes";
import interviewRouter from "../adapters/routes/interview.routes";
import adminRouter from "../adapters/routes/admin.routes";
import healthRouter from "../adapters/routes/health.routes";

export function buildApp(): Express {
    const app = express();

    app.set("trust proxy", env.trustProxy);

    app.use(express.json({ limit: "100kb" }));
    app.use(express.urlencoded({ extended: true, limit: "100kb" }));

    if (env.nodeEnv !== "test") {
        app.use(morgan("dev"));
    }

    const corsOptions: cors.CorsOptions = {
        origin: (origin, callback) => {
            if (!origin || env.frontendUrls.includes(origin)) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    };
    app.use(cors(corsOptions));

    app.use(cookieParser());

    app.use("/auth", authRouter);
    app.use("/interview", interviewRouter);
    app.use("/admin", adminRouter);
    app.use("/health", healthRouter);

    app.use(errorHandler);

    return app;
}
