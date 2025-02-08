// import { Request, Response } from 'express'
// import createError from 'http-errors'
// import { constructHttpResponse } from 'src/common/helpers'
// import { getListings } from '../../services/listing';
// import { updateUser } from '../../services/user'

// /**
//  * update user
//  * @param req - Request object
//  * @param res - response object
//  * @returns updated user 
//  * @throws 400 error if user id is invalid
//  * @throws 404 error if user
//  */
// export const getUpdateUser = async (req: Request, res: Response) => {
//     const { user } = req
//     const update = await updateUser({ id: user?._id, ...req.body })
//     if(!update) throw createError.NotFound('Unable to update user')
//     return constructHttpResponse(update)(res)
// };

// /**
//  * get user listing
//  * @param req - Request object
//  * @param res - Response object
//  * @returns found listing
//  * @throws 404 error if no lisitng is found
//  */
// export const getUserListing = async (req: Request, res: Response) => {
//     const { user } = req
//     const listing = await getListings({ userRef: user?._id })
//     if(!listing) throw createError.NotFound('No listing found')
//     return constructHttpResponse(listing)(res)
// };