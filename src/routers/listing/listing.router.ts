import { Router } from "express";
import { createNewListing, findListing, findListings, getUpdateListing, deleteListing } from "../../controllers";
import { verifyAccessToken } from "../../Middlewares/verify-token";

const router = Router();

router.post('/listing', verifyAccessToken ,createNewListing);

router.get('/listings', findListings);

router.get('/listing/:id', findListing);

router.put('/listing/:id', verifyAccessToken, getUpdateListing);

router.delete('/listing/:id', verifyAccessToken, deleteListing);

export default router;