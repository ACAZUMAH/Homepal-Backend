import { Types } from "mongoose";
import { savedProperties } from "../savedProperties";

export interface userDocument {
    _id: Types.ObjectId
    firstName: string
    lastName: string
    phoneNumber: string 
    email: string 
    profile?: string 
    isAuthenticated?: boolean

    savedProperties: savedProperties
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

