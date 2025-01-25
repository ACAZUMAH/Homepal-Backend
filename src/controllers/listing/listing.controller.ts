import { Request, Response } from "express";
import { constructHttpResponse } from "src/common/helpers";
import { 
    createListing, 
    deleteListingById, 
    getListingById, 
    getListings,
    updateListing 
} from "src/services/listing";
import createError from 'http-errors';
/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createNewListing = async (req: Request, res: Response) => {
    const { user } = req
    const listing = await createListing({ userRef: String(user?._id), ...req.body })
    return constructHttpResponse(listing, null, 201)(res)
};

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const findListing = async (req: Request, res: Response) => {
    const listing = await getListingById(`${req.params.id}`)
    return constructHttpResponse(listing)(res)
};

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const findListings = async (req: Request, res: Response) => {
    const listings = await getListings({ ...req.query })
    if(!listings) throw createError.NotFound('No listing found')
    return constructHttpResponse(listings)(res)
};

/**
 * 
 * @param req 
 * @param res 
 */
export const getUpdateListing = async (req: Request, res: Response) => {
    const updated = await updateListing({ id: req.params.id, ...req.body })
    return constructHttpResponse(updated)(res)               
};

/**
 * 
 * @param req 
 * @param res 
 */
export const deleteListing = async  (req: Request, res: Response) => {
    const deleted = await deleteListingById(req.params.id);
    if(!deleted) throw createError.NotFound('Unable to delete user')
    return constructHttpResponse('Listing deleted successfully')(res)
};