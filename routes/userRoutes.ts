
import express, { Router, Request, Response } from 'express';
import { UserController } from "../controller/userController";
   export const userRouter:Router = express.Router();


userRouter.post("/register", UserController.addUser);
userRouter.put("/update", UserController.updateUser);
userRouter.get("/getuserlist", UserController.getUserList);
userRouter.get("/getuserdetail/:id", UserController.getUserDetail);
