import { Router } from "express";
import { createNewListing, findListing, findListings, getUpdateListing } from "../../controllers";
import { verifyAccessToken } from "../../Middlewares/verify-token";
import { deleteListingById } from "src/services/listing";

const router = Router();

router.post('listing', verifyAccessToken ,createNewListing);

router.get('listings', findListings);

router.get('listing/:id', findListing);

router.put('listing/:id', verifyAccessToken, getUpdateListing);

router.delete('listing/:id', verifyAccessToken, deleteListingById);

export default router;