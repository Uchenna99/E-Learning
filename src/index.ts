import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import userRouter from "./routes/user.routes";
import { errorHandler } from "./utils/errorHandler.util";
import courseRouter from "./routes/course.routes";
import authRouter from "./routes/auth.routes";
import passport from "passport";
import googleRouter from "./routes/googleAuth.routes";



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
app.use(passport.initialize());



app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/v1/users", userRouter);

app.use("/api/v1/course", courseRouter);

app.use("/api/v1/login", authRouter);

app.use("/auth", googleRouter);


app.use(errorHandler);

app.listen(PORT, ()=> {
    console.log(`Server is running on Port ${PORT}`)
});







// app.use(cookieSession({
//     name: 'session',
//     keys: ['class'],
//     maxAge: 24 * 60 * 60 * 100,
//     // secret: 'lsfglgalkglhfglahgfl',
// }));

// app.use(
//     session({
//       secret: 'ihasd7aogldghsgkhajgds788887655', // Replace with a secure random string
//       resave: false,
//       saveUninitialized: true,
//       cookie: { secure: false }, // Set `secure: true` in production if using HTTPS
//     })
//   );

// app.use(passport.session());



