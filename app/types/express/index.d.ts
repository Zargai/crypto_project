import { Document, Model } from 'mongoose';
import mongoose from 'mongoose'
import { IUser } from '../../interfaces/users/IUser';


declare global {
  
  namespace Models {
    export type UserModel = Model<IUser & Document>;
  }
  export type ObjectId = mongoose.Schema.Types.ObjectId;
}

