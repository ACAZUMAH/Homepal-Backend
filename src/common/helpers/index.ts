import { response, Response } from "express";
import createError from "http-errors";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

/**
 * 
 * @param password 
 * @returns 
 */
export const hashPassword = async (password: string) => {
    const saltRounds = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, saltRounds);
}

/**
 * 
 * @param hash 
 * @param password 
 * @returns 
 */
export const comparePassword = async (hash: string, password: string) => {
    return await bcrypt.compare(password, hash)
}

/**
 * 
 * @param obj 
 * @returns 
 */
export const jwtSign = (obj: object) => {
    return jwt.sign(obj, `${process.env.JWT_SECRET}`, { expiresIn: '50mb' })
}

/**
 * 
 * @param len 
 * @returns 
 */
export const generateOTP = (len = 4) => {
    const char ='0123456789'
    const charLength = char.length;
    let otp = ''
    for(let i = 0; i < len; i++){
        otp += char.charAt(Math.floor(Math.random() * charLength))
    };
    return otp;
}

/**
 * 
 * @param data 
 * @param error 
 * @param statusCode 
 * @returns 
 */
export const constructHttpResponse = (
    data: any = null, 
    error: null | createError.HttpError = null,
    statusCode: number = 200
) => {
    return (res: Response) => {

        const response: any = {
            success: !error,
            data: error ? null : data,
            error: error ? { message: error.message, details: error.stack || null } : null
        };

        return res.status(statusCode | error?.statusCode!).json(response);
    };
};