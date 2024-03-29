import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";


// ****************************************************
import bcrypt from "bcrypt";


const hashPassword = async (password) => {
  const result = await bcrypt.hash(password, 10);
  // console.log(result);                                                 hash
  const compareResult1 = await bcrypt.compare(password, result);
  console.log(compareResult1);
  const compareResult2 = await bcrypt.compare("123457", result);
  
  console.log(compareResult2);
  
};
hashPassword("123456");
// *******************************************************








import authRouter from "./routes/authRouter.js";
import contactsRouter from "./routes/contactsRouter.js";



const { DB_HOST, PORT } = process.env;
const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose.connect(DB_HOST)
  .then(() => {
app.listen(PORT, () => {
  console.log("Database connection successful");
});  })
  .catch(error => {
    console.log(error.message)
    process.exit(1);
  })