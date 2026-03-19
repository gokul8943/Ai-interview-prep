import mongoose, { Schema } from "mongoose";
import { IDomain } from "../../adapters/interfaces/IDomainSchema";

const DomainSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        status:{
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const DomainModel = mongoose.model<IDomain>("Domain", DomainSchema);
export default DomainModel;