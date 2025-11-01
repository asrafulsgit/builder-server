import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";


const userSchema = new Schema<IUser>({
    name : {type : String, required : true},
    email : {type : String, unique : true ,required : true},
    password :{type : String,required : true},
},{
    versionKey : false,
    timestamps : true
});


export const User = model<IUser>("User",userSchema);

