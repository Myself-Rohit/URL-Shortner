import express from "express";
import mongoose from "mongoose";
import path from "path";
import staticRoute from "./routes/static.route.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 8001;
mongoose
	.connect(process.env.MONGO_URI)
	.then((req, res) => console.log("mongoose connected!!"))
	.catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use("/", staticRoute);

app.listen(PORT, () => {
	console.log(`app running on port: ${PORT}`);
});
