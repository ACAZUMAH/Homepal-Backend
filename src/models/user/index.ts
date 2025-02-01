import mongoose from "mongoose";
import { favoriteProperties, userDocument } from "src/common/interfaces";

const favoriteSchema = new mongoose.Schema<favoriteProperties>({
  propertyIds: [{ type: mongoose.Schema.ObjectId }],

}, { _id: false })

const userSchema = new mongoose.Schema<userDocument>({
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    profile: { type: String },
    isAuthenticated: { type: Boolean },

    favoriteProperties: favoriteSchema
  },
  { timestamps: true }
);

export const userModel = mongoose.model<userDocument>("users", userSchema);
