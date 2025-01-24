import { createUserInput } from "src/common/interfaces";
import createError from 'http-errors'
import { checkUserExist, createUser } from "../user";
import { hashPassword } from "src/common/helpers";
import { createAuth } from "./index";
import { isDevelopment } from "src/common/contants";
import { sendSms } from "../messaging";

/**
 * 
 * @param data 
 * @returns 
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