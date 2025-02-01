import { Types } from "mongoose";
import { generateOTP, jwtSign } from "src/common/helpers";
import { authModel } from "src/models";
import createError from 'http-errors'
import { updateIsAuthenticated } from "../user";

/**
 * create auth and generate otp code
 * @param userId 
 * @param len 
 * @returns otp
 */
export const createAuth = async (userId: Types.ObjectId, len: number) => {
    let otp = generateOTP(len);
    while(await authModel.exists({ token: otp })){
        otp = generateOTP(len)
    };
    const expiresIn = new Date(Date.now() + 1 * 60 * 60 * 1000)
    await authModel.findOneAndUpdate(
        { userId }, 
        { userId, token: otp, expiresIn}, 
        { new: true, upsert: true })
    return otp
};

/**
 * verify otp and generate jwt token
 * @param otp - otp
 * @returns verified user and token
 */
export const completeAuthAndGenerateToken = async (otp: string) => {
    const auth = await authModel.findOne({ token: otp })
    if(!auth) throw createError.BadRequest('Invalid OTP')
    if(new Date(auth.expiresIn) < new Date()) throw createError.BadRequest('OTP expired')
    const user = await updateIsAuthenticated(auth.userId, true)
    const token = jwtSign({ id: user?._id })
    return { user, token }
};