import { Types } from "mongoose";

export interface userDocument {
    _id: Types.ObjectId
    firstName: string
    lastName: string
    phoneNumber: string 
    email: string 
    profile?: string 
    isAuthenticated?: boolean
}

export interface upsertUserInput {
  phoneNumber: string;
  firstname?: string | null;
  lastName?: string | null;
  email?: string | null;
  profile?: string | null;
}

export interface updateUserInput {
    id: Types.ObjectId
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    profile?: string | null
}

