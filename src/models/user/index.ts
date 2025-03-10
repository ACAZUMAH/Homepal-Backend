import mongoose from "mongoose";
import { savedProperties, userDocument } from "src/common/interfaces";

const savedPropertiesSchema = new mongoose.Schema<savedProperties>({
  propertyIds: [{ type: mongoose.Schema.ObjectId }],

}, { _id: false })

const userSchema = new mongoose.Schema<userDocument>({
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String, unique: true },
    email: { type: String },
    profile: { type: String },
    isAuthenticated: { type: Boolean },

    savedProperties: savedPropertiesSchema
  },
  { timestamps: true }
);

export const userModel = mongoose.model<userDocument>("users", userSchema);
