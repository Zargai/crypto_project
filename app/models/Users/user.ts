import {IUser } from '../../interfaces/users/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
    {
        username:{
            type: String,
            required: false
        },
        password:{
            type: String,
            required: false
        },
        like:{
            type: Array,
            required: false
        }
}
,{
    timestamps: true
})

export default mongoose.model<IUser & mongoose.Document>('User', User)