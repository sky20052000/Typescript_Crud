import { userServices } from "../service/userService";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response } from "express";
import { User } from "../models/userModels";
class userController {
  addUser: any = async (req: Request, res: Response) => {
    try {
      let { first_name, last_name, password, email, phone_number }: any =
        req.body;
      if (!(first_name && last_name && password && email && phone_number)) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Mandatory fields can not be empty",
          });
      }

      // validate email
      const validateEmail = validator.isEmail(email);
      if (!validateEmail) {
        return res
          .status(400)
          .json({ success: false, message: "Please enter a valid email" });
      }

      email = email.toLowerCase();

      // findUser
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({
            success: false,
            message: "User already exists! Please login with credentials",
          });
      }

      // hash password
      const hashPassword = await bcrypt.hash(password, 10);

      // save data
      let saveData = {
        first_name,
        last_name,
        password: hashPassword,
        email,
        phone_number,
      };

      await userServices.createUser(saveData, res);
      return res
        .status(201)
        .json({ success: true, message: "User regiater successfully!" });
    } catch (e) {
      console.log(e, "rr");
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
  };

  updateUser: any = async (req: Request, res: Response) => {
    try {
      let { userId, first_name, last_name, phone_number }: any = req.body;
      if (!userId) {
        return res
          .status(400)
          .json({
            success: false,
            message: "User id is required to update the user",
          });
      }
      // update data
      let data = {
        first_name,
        last_name,
        phone_number,
      };

      await userServices.updateUserById(userId, data);
      return res
        .status(201)
        .json({ success: true, message: "User updated successfully!" });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
  };

  getUserList: any = async (req: Request, res: Response) => {
    try {
      const getUser = await userServices.getUser();
      if (!getUser) {
        return res
          .status(200)
          .json({ success: true, message: "No record found!" });
      }
      return res
        .status(200)
        .json({ success: true, totalUserCount: getUser.length, data: getUser });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
  };

  getUserDetail: any = async (req: Request, res: Response) => {
    try {
      let id = (req as any).params.id;
      const getUserDetail = await userServices.getUserById(id);
      if (!getUserDetail) {
        return res
          .status(400)
          .json({ success: true, message: "No record found!" });
      }
      return res.status(200).json({ success: true, data: getUserDetail });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
  };
}

export const UserController = new userController();
