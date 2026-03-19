import mongoose, { Document } from 'mongoose';

export interface ITopic extends Document {
    name: string;
    domain: mongoose.Types.ObjectId;
    status: boolean;
}