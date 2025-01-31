import createError from 'http-errors'
import { checkUserExist, createUser, getUserById, getUserByPhone, upsertUser } from "../user";
import { createAuth } from "./index";
import { isDevelopment } from "src/common/contants";
import { sendSms } from "../notifications/nalo";
import { upsertUserInput } from 'src/common/interfaces';

/**
 * the logic with phone number logic 
 * @param data - user info
 * @returns success message 
 */
export const loginWithPhoneNumber = async (data: upsertUserInput) => {
    const { phoneNumber } = data
    const user = await upsertUser({ phoneNumber })
    const token = await createAuth(user._id, 5)

    const message = `Your Homepal verification code is ${token}`

    if(isDevelopment) return { user, message };

    if(!(await sendSms({ to: phoneNumber, content: message}))){
        throw createError.InternalServerError('Failed to send OTP code at the moment, please try again later')
    };
    return 'OTP send successfully'
};

// /**
//  * 
//  * @param phone 
//  * @param password 
//  * @returns 
//  */
// export const loginUser = async (phone: string, password: string) => {
//     const auth = await getUserByPhone(phone)
//     if(!auth) throw createError.BadRequest('No user with this phone numbeer!')
//     const isMatch = comparePassword(auth?.password!, password)
//     if(!isMatch) throw createError.Unauthorized('Invalid credentials')
//     const user = await getUserById(auth._id)
//     const token = jwtSign({ id: user._id })
//     return { user, token }
// };