import { Document } from 'mongoose';

export interface IDomain extends Document {
    name: string;
    slug: string;
}