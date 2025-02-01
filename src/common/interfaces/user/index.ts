import { Types } from "mongoose";
import { favoriteProperties } from "../favorite";

export interface userDocument {
    _id: Types.ObjectId
    firstName: string
    lastName: string
    phoneNumber: string 
    email: string 
    profile?: string 
    isAuthenticated?: boolean

    favoriteProperties: favoriteProperties
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

export interface favorite {
  id: string | Types.ObjectId
  propertyId: string | Types.ObjectId
}

