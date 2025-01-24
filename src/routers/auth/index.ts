import { Router } from "express";
import { signUp, verifyOTP } from "src/controllers/auth/auth.controller";

const router = Router()

router.post('/signup', signUp)

router.post('/verify', verifyOTP)

export default router;