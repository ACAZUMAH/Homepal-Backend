import { response, Response } from "express";
import createError from "http-errors";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

/**
 * 
 * @param obj 
 * @returns 
 */
export const jwtSign = (obj: object) => {
    return jwt.sign(obj, `${process.env.JWT_SECRET}`, { expiresIn: '50d' })
}

/**
 * 
 * @param token 
 * @returns 
 */
export const jwtVerify = (token: string): any => {
    return jwt.verify(token, `${process.env.JWT_SECRET}`)
}

/**
 * 
 * @param limit 
 * @returns 
 */
export const getSanitizeLimit = (limit?: string | number | null) => {
    const limitNumber = Number(limit)
    if(Number.isNaN(limitNumber)) return 10;
    return Math.min(Math.max(limitNumber, 1), 100)
}

/**
 * 
 * @param page 
 * @returns 
 */
export const getSanitizePage = (page?: string | number | null) => {
    const pageNumber = Number(page)
    if(Number.isNaN(pageNumber)) return 1;
    return Math.max(pageNumber, 1);
}

/**
 * 
 * @param limit 
 * @param page 
 */
export const getSanitizeOffset = (limit: number, page: number) => {
    return (page - 1 ) * limit 
}

/**
 * 
 * @param data 
 * @param page 
 * @param limit 
 */
export const getPageConnection = <T>(data: Array<T>, page: number, limit: number) => {
    const hasNextPage = data.length > limit 
    const edges = hasNextPage ? data.slice(0, limit) : data
    const PageInfo = { page, limit, total: data.length, hasNextPage }
    return { edges, PageInfo }
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