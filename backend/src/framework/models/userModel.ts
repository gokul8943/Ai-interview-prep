import mongoose from "mongoose";
import { IUserSchema } from "../../adapters/interfaces/IUserSchema";

const userSchema = new mongoose.Schema<IUserSchema>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const User = mongoose.model<IUserSchema>("User", userSchema);
export default User;