import { createUserInput } from "src/common/interfaces";
import { userModel } from "src/models";
import { validateCreateUser } from "./user/validation";
import createError from 'http-errors'


/**
 * create new user in the database
 * @param data.username - username
 * @param data.phone - phone
 * @param data.password - password 
 * @returns created user
 */
export const createUser = async (data: createUserInput) => {
    validateCreateUser(data);
    const user = await userModel.create({ ...data });
    if(!user) throw createError.InternalServerError('Unable to create user')
    return user;
}