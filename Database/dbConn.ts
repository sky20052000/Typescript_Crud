import mongoose from "mongoose";
 import dotenv from "dotenv";
 dotenv.config()
       let MONGO_URL:any = process.env.Mongo_url
  export const DbConn = async()=>{
             const connection = await mongoose.connect(MONGO_URL);
               if(!connection){
                 console.log("Mongoose connection failed to connect database")
               }
               console.log("Mongoose connected to database")
  } 