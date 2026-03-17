import mongoose, { Schema } from "mongoose";
import { ITopic } from "../../adapters/interfaces/ITopicSchema";

const TopicSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        domain: {
            type: Schema.Types.ObjectId,
            ref: "Domain",
            required: true,
        },
    },
    { timestamps: true }
);

export const TopicModel = mongoose.model<ITopic>("Topic", TopicSchema);