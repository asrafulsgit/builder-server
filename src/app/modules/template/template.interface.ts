import { Types } from "mongoose";

export interface IComponent {
  id : string;
  componentId : string;  
}

export interface ITemplate{
  userId: Types.ObjectId;
  name: string;
  components: IComponent[];
}