import  { Document } from 'mongoose';

export interface ILevel extends Document {
    name: string;
    description: string;
    status: boolean;
}