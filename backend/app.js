import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbconnection } from "./database/dbconnection.js";
import messageRouter from "./router/messageRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });


const app = express();
config({ path: "./config/config.env" });

//for connecting frontend with backend
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json()); //passing data from json to string as we get data as in json format
app.use(cookieParser()); //for using(get) cookies
app.use(express.urlencoded({ extended: true })); //for recognising data type ex-appointment request contain like 14 may
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

dbconnection();

app.use(errorMiddleware); //always used at last for removing error
export default app;