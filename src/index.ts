import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import userRouter from "./routes/user.routes";
import { errorHandler } from "./utils/errorHandler.util";
import courseRouter from "./routes/course.routes";

dotenv.config();

const portEnv = process.env.PORT;
if (!portEnv) {
    console.error("Error: PORT is not defined in .env file");
    process.exit(1);
}


const PORT: number = parseInt(portEnv, 10);
if (isNaN(PORT)) {
    console.error("Error: PORT is not a number in .env file");
    process.exit(1);
}

const app = express();
const corsOptions = {
    origin: "*",
    credentials: true,
    allowedHeaders: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
}


app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/v1/users", userRouter);

app.use("/api/v1/course", courseRouter);

app.use(errorHandler);

app.listen(PORT, ()=> {
    console.error(`Server is running on ${PORT}`)
})