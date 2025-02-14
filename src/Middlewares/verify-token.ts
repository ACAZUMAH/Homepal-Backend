import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "../common/helpers";
import { getUserById } from "../services/user";
import { userDocument } from "src/common/interfaces";
import createError from 'http-errors'

export const verifyAccessToken = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const bearerHeader = req.headers['authorization']

        if(!bearerHeader) return next();

        const bearer = bearerHeader?.split(' ')
        const bearerToken = bearer.length > 1 ? bearer[1] : bearer[0]

        if(!bearerToken) return next();

        const data = jwtVerify(bearerToken)

        if(!data?.id) return next()

        const user: userDocument = await getUserById(data?.id)

        req.user = user
        return next()
    } catch (err: any) {
        throw createError.Unauthorized(err?.message || 'Invalid token')
    }
};