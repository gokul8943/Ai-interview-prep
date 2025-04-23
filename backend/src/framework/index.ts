import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import { dbConnection } from "./database/dbConnection"
import authRouter from "../adapters/routes/AuthRoutes"

dotenv.config()
const app = express()
const Port = process.env.PORT || 8000

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors(
    corsOptions
))


app.use('/auth',authRouter)

dbConnection()



app.listen(Port, () => {
    console.log(`[server]: Server is running at http://localhost:${Port}`);;
});