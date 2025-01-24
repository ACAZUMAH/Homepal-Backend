import mongoose from "mongoose";
import { userDocument } from "src/common/interfaces";

const userSchema = new mongoose.Schema<userDocument>(
  {
    username: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    profile: { type: String },
    isAuthenticated: { type: Boolean },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("users", userSchema);
