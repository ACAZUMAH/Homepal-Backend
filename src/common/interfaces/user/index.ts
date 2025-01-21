import { Types } from "mongoose";

export interface userDocument {
    _id: Types.ObjectId
    username: string 
    phone: string 
    email: string 
    password?: string
    profile?: string 
    isAuthenticated?: boolean
}

export interface createUserInput {
    username: string 
    phone: string 
    password: string 
}