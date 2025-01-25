import { createUserInput } from "src/common/interfaces";
import createError from 'http-errors'
import { checkUserExist, createUser, getUserById, getUserByPhone } from "../user";
import { comparePassword, hashPassword, jwtSign } from "src/common/helpers";
import { createAuth } from "./index";
import { isDevelopment } from "src/common/contants";
import { sendSms } from "../messaging";

/**
 * the sign logic 
 * @param data - user info
 * @returns success message 
 */
export const registerUser = async (data: createUserInput) => {
    const { username, phone, password } = data
    await checkUserExist(phone)
    const hash = await hashPassword(password)
    const user = await createUser({ username, phone, password: hash })
    const token = await createAuth(user._id, 5)
    if(isDevelopment) return `OTP: ${token}`
    await sendSms(phone, token);
    return 'OTP send successfully'
};

/**
 * 
 * @param phone 
 * @param password 
 * @returns 
 */
export const loginUser = async (phone: string, password: string) => {
    const auth = await getUserByPhone(phone)
    if(!auth) throw createError.BadRequest('No user with this phone numbeer!')
    const isMatch = comparePassword(auth?.password!, password)
    if(!isMatch) throw createError.Unauthorized('Invalid credentials')
    const user = await getUserById(auth._id)
    const token = jwtSign({ id: user._id })
    return { user, token }
};