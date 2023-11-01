import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { DbConn } from "./Database/dbConn";
 DbConn();
import { userRouter } from "./routes/userRoutes";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// set route 
 app.use("/api/user",userRouter);

app.listen(process.env.Port, () => {
  console.log(`Server listening on the:${process.env.Host}:${process.env.Port}`);
});
