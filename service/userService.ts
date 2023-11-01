import { User } from "../models/userModels";
import { Response } from 'express';
class userService {

    // createUser 
    async createUser(data:any, res:Response){
         const user = await User.create(data);
         return user
    }

      // getUser 
      async getUser(){
        const getuser = await User.find({})
        return getuser
   }

     // getUserById
     async getUserById(id:string){
        const getUserById = await User.findById({_id:id})
        return getUserById
   }

     // updateUserById
     async updateUserById(userId:string, data:any){
        const updateUserById = await User.findByIdAndUpdate({_id:userId},data,{new:true})
        return updateUserById
   }

     // deleteUserById
     async deleteUserById(id:string,){
        const deleteUserById = await User.findByIdAndDelete({id})
        return deleteUserById
   }

}

export const userServices = new userService();
