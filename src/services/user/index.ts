import { createUserInput } from "src/common/interfaces";
import { userModel } from "src/models";
import { validateCreateUser } from "./validation";
import createError from 'http-errors'
import { Types } from "mongoose";

/**
 * create ne user 
 * @param data - user info
 * @returns created user 
 * @throws server error if user is not created
 */
export const createUser = async (data:createUserInput) => {
    validateCreateUser(data);

    const user = await userModel.create({ ...data });

    if(!user) throw createError.InternalServerError('Unable to create user');

    return user;
};

/**
 * check if user exist already
 * @param phone - user phone number
 */
export const checkUserExist = async (phone: string) => {
    if(await userModel.exists({ phone }))
        throw createError.BadRequest('User exist login')
}

export const updateIsAuthenticated = async (id: Types.ObjectId | string, otp: boolean) => {
    return await userModel.findByIdAndUpdate({ _id: id }, { isAuthenticated: otp }, { new: true })
};