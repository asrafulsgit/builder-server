import mongoose, { Schema, model } from "mongoose";
import { IComponent, ITemplate } from "./template.interface";

const componentSchema = new Schema<IComponent>(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { _id: false,versionKey : false, timestamps : false }
);

const templateSchema = new Schema<ITemplate>(
  {
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    name: { type: String, required: true },
    components: [componentSchema],
  },
  { timestamps: true,versionKey : false }
);


export const Template = model<ITemplate>("Template", templateSchema);
