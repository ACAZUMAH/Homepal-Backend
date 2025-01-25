import { Types } from "mongoose";

export interface userDocument {
    _id: Types.ObjectId
    username: string 
    firstName: string
    lastName: string
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

export interface updateUserInput {
    id: Types.ObjectId
    firstName?: string
    lastName?: string
    email?: string 
    profile?: string 
}

