import mongoose, { Schema } from "mongoose";
import { ILevel } from "../../adapters/interfaces/ILevelSchema";


const LevelSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const LevelModel = mongoose.model<ILevel>("Level", LevelSchema);
export default LevelModel;