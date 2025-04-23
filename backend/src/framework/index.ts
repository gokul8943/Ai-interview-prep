import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import { dbConnection } from "./database/dbConnection"

dotenv.config()
const app = express()
const Port = process.env.PORT || 8000

const corsOptions = {
    origin: ['http://localhost:4173', 'http://localhost:4174', "https://design.trendgully.com"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors(
    corsOptions
))
dbConnection()

app.listen(Port, () => {
    console.log(`[server]: Server is running at http://localhost:${Port}`);;
});