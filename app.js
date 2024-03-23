import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import moviesRouter from "./routes/moviesRouter.js";

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});



// console.log(process.env.DB_HOST)
mongoose.connect(process.env.DB_HOST)
  .then(() => { app.listen(3001, () => {
    console.log("Server is running. Use our API on port: 3001");
  });})
  .catch(error => {
    console.error(error.message);
    process.exit(1);/*зупиняє всі запущені процеси виконання прог якщо помилка*/
  })
