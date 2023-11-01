import {Schema,model} from "mongoose";

//creating interface 
 interface User {
       first_name:string,
       last_name:string,
       password:string,
       email:string,
       phone_number:number
 }

 const userSchema = new Schema<User>({
           first_name:{type:String, required:true,trim:true},
           last_name:{type:String, required:true},
           password:{type:String, required:true},
           email:{type:String, required:true},
           phone_number:{type:Number, required:true}
              
 },{timestamps:true});

 //creating model
  export const User = model<User>("User", userSchema);