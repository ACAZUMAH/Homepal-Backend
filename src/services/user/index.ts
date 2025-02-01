import { upsertUserInput, updateUserInput, favorite } from "../../common/interfaces";
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
export const createUser = async (data: upsertUserInput) => {
    validateCreateUser(data);
    const user = await userModel.create({ ...data });
    if(!user) throw createError.InternalServerError('Unable to create user');
    return user;
};

/**
 * upsert user on login
 * @param data - user info
 * @returns upserted data
 */
export const upsertUser = (data: upsertUserInput) => {
    const upsertData: Record<string, any> = {
        phoneNumber: data.phoneNumber
    }

    if(data.email)  upsertData.email = data.email;

    if(data.firstname) upsertData.firstName = data.firstname;

    if(data.lastName) upsertData.lastName = data.lastName;

    if(data.profile) upsertData.profile = data.profile;

    return userModel.findOneAndUpdate(
        { phoneNumber: data.phoneNumber },
        { 
            $set: upsertData
        },
        { new: true, upsert: true }
    )
}

/**
 * check if user exist already
 * @param phone - user phone number
 * @throws 400 error if user exist
 */
export const checkUserExist = async (phone: string) => {
    if(await userModel.exists({ phone })) throw createError.BadRequest('User exist login')
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

/**
 * add property to favorites
 * @param data - userId and propertyId
 * @returns updated user
 * @throws 400 error if user Id is invalid
 * @throws 404 error if User not found
 */
export const addTofavoriteProperty = async (data: favorite) => {
    const { id, propertyId } = data
    const user = await getUserById(id)

    return await userModel.findByIdAndUpdate(
        { _id: user._id },
        { $push: { 'favoriteProperties.propertyIds': propertyId } },
        { new: true }
    )
}

/**
 * 
 * @param data 
 * @returns 
 */
export const removeFavoriteProperty = async (data: favorite) => {
    const { id, propertyId } = data
    const user = await getUserById(id)

    return await userModel.findByIdAndUpdate(
        { _id: user._id },
        { $pull: { 'favoriteProperties.propertyIds': propertyId } },
        { new: true }
    )
}