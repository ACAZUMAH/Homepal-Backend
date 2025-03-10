import { Request, Response, NextFunction } from "express";
import createError from 'http-errors'
import { constructHttpResponse } from "src/common/helpers";
import { logger } from "src/logger/logger";
import { rollbar } from "src/logger/rollbar";

/**
 * general error handler for any thrown error
 * @param err 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const errorHandler = (err: any, _req: Request, res: Response, next: NextFunction) => {
    rollbar.log(err)
    logger.info(err)
    if(createError.isHttpError(err)){
        return constructHttpResponse(null, err, err.status)(res);
    };
    return constructHttpResponse(null, createError(500, "Server Error"), 500)(res);
};