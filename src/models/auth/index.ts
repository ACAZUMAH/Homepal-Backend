import mongoose, { mongo } from "mongoose";
import { authDocument } from "src/common/interfaces/auth";

const authSchema = new mongoose.Schema<authDocument>({
    userId: { type: String, ref: 'users', required: true },
    token: { type: String, required: true },
    expiresIn: { type: Date }
})

export const authModel = mongoose.model('auth', authSchema);