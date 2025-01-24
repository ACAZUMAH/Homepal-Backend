import { Router } from "express";
import { signIn, signUp, verifyOTP } from "src/controllers/auth/auth.controller";

const router = Router()

router.post('/signup', signUp)

router.post('/login', signIn)

router.post('/verify', verifyOTP)

export default router;