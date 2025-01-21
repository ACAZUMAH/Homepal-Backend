import { response, Response } from "express";
import createError from "http-errors";


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
        const Response = {
            success: !error,
            data: error ? null : data,
            error: error ? { message: error.message, details: error.stack || null }
                : null
        };
        return res.status(statusCode | error?.statusCode!).json(response);
    };
};