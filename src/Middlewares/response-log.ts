import { logger } from "../logger/logger";
import { Request, Response, NextFunction } from "express";

export const logResponseTime = (req: Request, res: Response, next: NextFunction) => {
    const startHrTime = process.hrtime()

    res.on('finish', () => {
        const elapsedHrTime = process.hrtime(startHrTime)
        const elapsedHrTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6
        const message = `${req.method} ${res.statusCode} ${elapsedHrTimeInMs}ms\t${req.path}`
        logger.info(message)
    })

    next()
};