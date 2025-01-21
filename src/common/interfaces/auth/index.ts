import { Types } from "mongoose";

export interface authDocument {
    _id: Types.ObjectId,
    userId: string
    token: string,
    expiresIn: Date
}