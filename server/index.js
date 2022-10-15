import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

import routes from "./routes/api.js";

const MONGO_CLUSTER = process.env.MONGODB;

const MONGODB_URL = process.env.DB_URL;
/* "mongodb+srv://lukasm10:christmas123@holdings.wugr4l2.mongodb.net/?retryWrites=true&w=majority"; */

//Pripojeni na databazi
mongoose
  .connect(/* MONGODB_URL */ /* MONGO_CLUSTER */ process.env.DB_URL)
  .then(() => app.listen(PORT, console.log(`Server is starting at ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!");
});

//Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CORS policy handler
app.use(cors());

// /api jako starting route
app.use("/", routes);

app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});
