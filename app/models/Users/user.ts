import {IUser } from '../../interfaces/users/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
    {
        username:{
            type: String,
            required: [true, 'Please provide full name'],
        },
        password:{
            type: String,
            required: [true, 'Please provide password'],
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