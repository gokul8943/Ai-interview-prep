import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import { dbConnection } from "./database/dbConnection"
import authRouter from "../adapters/routes/auth.routes"
import interviewRouter from '../adapters/routes/interview.routes'
import adminRouter from '../adapters/routes/admin.routes'
import healthRouter from '../adapters/routes/health.routes'

dotenv.config()
const app = express()
const Port = process.env.PORT || 8000
const allowedOrigins = ['https://localhost:5173', 'https://intelliprep-kw3t.onrender.com']

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors(
    corsOptions
))
app.use(cookieParser());

app.use('/auth', authRouter)
app.use('/interview', interviewRouter)
app.use('/admin',adminRouter)
app.use('/health',healthRouter)

dbConnection()

app.listen(Port, () => {
    console.log(`[server]: Server is running at http://localhost:${Port}`);;
});