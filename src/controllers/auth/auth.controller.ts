import { Request, Response } from "express";
import { constructHttpResponse } from "src/common/helpers";
import { completeAuthAndGenerateToken } from "src/services/auth";
import { registerUser } from "src/services/auth/auth";

/**
 * sign up user
 * @param req - Request object
 * @param res - Response object
 * @returns success message
 */
export const signUp = async (req: Request, res: Response) => {
    const auth = await registerUser({ ...req.body })
    return constructHttpResponse(auth, null, 201)(res)
};

/**
 * verify user
 * @param req - Request object
 * @param res - Response object
 * @returns user and token
 */
export const verifyOTP = async (req: Request, res: Response) => {
    const { otp } = req.body
    const auth = await completeAuthAndGenerateToken(otp)
    return constructHttpResponse({ user: auth.user, token: auth.token })(res)
};