import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import postRoute from "./routes/postRoute.js";
import userRoute from "./routes/userRoute.js";
import commentRoute from "./routes/commentRoute.js";
import messageRoute from "./routes/messageRoute.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

// middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// const MONGODB_URL = "mongodb://localhost:27017/Inkypen_db";
const MONGODB_URL =
    "mongodb+srv://webmanagement:webmanagement@damian.yv76yyk.mongodb.net/InkypenWebsite_db";

const PORT = 5000;
await mongoose
    .connect(MONGODB_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server is listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(`${error} did not connect`);
    });

app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
});
app.use("/", commentRoute);
app.use("/", messageRoute);
app.use("/", postRoute);
app.use("/", userRoute);