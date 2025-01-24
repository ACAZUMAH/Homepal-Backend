import { createUserInput, updateUserInput } from "../../common/interfaces";
import { userModel } from "../../models";
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
 * @throws 400 error if user exist
 */
export const checkUserExist = async (phone: string) => {
    if(await userModel.exists({ phone }))
        throw createError.BadRequest('User exist login')
};

/**
 * 
 * @param phone 
 * @returns 
 */
export const getUserByPhone = async (phone: string) => {
    return await userModel.findOne({ phone })
};

/**
 * get user by id
 * @param id - user id
 * @returns found user
 * @throws 400 error if user id is invalid
 * @throws 404 error is user is not found
 */
export const getUserById = async (id: Types.ObjectId | string) => {
    if(!Types.ObjectId.isValid(id)) throw createError.BadRequest('Invalid user id');
    
    const user = await userModel.findById(id)
    if(!user) throw createError.NotFound('User not found')
    
    return user
};

/**
 * update isAuthenticated field
 * @param id - user id
 * @param otp - boolean option
 * @returns updated user
 */
export const updateIsAuthenticated = async (id: Types.ObjectId | string, otp: boolean) => {
    return await userModel.findByIdAndUpdate({ _id: id }, { isAuthenticated: otp }, { new: true })
};

/**
 * update user
 * @param data user data
 * @returns updated user
 * @throws 400 error if user id is invalid
 * @throws 404 error if user not found
 */
export const updateUser = async (data: updateUserInput) => {
    const user = await getUserById(data.id)

    const updateData = {
        ...(data.firstName && { firstName: data.firstName }),
        ...(data.lastName && { lastName: data.lastName }),
        ...(data.email && { email: data.email }),
        ...(data.profile && { profile: data.profile })
    }

    return await userModel.findByIdAndUpdate(
        { _id: user._id }, 
        { $set: updateData}, 
        { new: true }
    )
};

/**
 * delete user
 * @param id - user id
 * @returns deleted user
 * @throws 400 error if ser id is invalid
 */
export const deleteUser = async (id: string | Types.ObjectId) => {
    if(!Types.ObjectId.isValid(id)) throw createError.BadRequest('Invalid user id')

    const user = await userModel.findByIdAndDelete({ _id: id })
    return user;
};
