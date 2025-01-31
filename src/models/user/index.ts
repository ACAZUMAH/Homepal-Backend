import mongoose from "mongoose";
import { listingDocument, userDocument } from "src/common/interfaces";

const userSchema = new mongoose.Schema<userDocument>({
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    profile: { type: String },
    isAuthenticated: { type: Boolean },
  },
  { timestamps: true }
);

export const userModel = mongoose.model<userDocument>("users", userSchema);
