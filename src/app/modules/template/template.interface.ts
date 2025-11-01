import { Types } from "mongoose";

export interface IComponent {
  id : string;
  type: string;  
  order: number;
}

export interface ITemplate{
  userId: Types.ObjectId;
  name: string;
  components: IComponent[];
}