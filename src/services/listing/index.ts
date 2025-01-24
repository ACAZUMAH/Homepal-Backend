import { listingModel } from "../../models";
import {
  createListingInput,
  listingDocument,
  listingFilter,
  updateListingInput,
} from "../../common/interfaces";
import { createListingValidation } from "./validation";
import createError from "http-errors";
import { Types, FilterQuery, QueryOptions } from "mongoose";
import {
  getPageConnection,
  getSanitizeLimit,
  getSanitizeOffset,
  getSanitizePage,
} from "../../common/helpers";

/**
 * create a new listing
 * @param data
 * @returns created listing
 * @throws 500 error if unable to create listing
 */
export const createListing = async (data: createListingInput) => {
  createListingValidation(data);

  const listing = await listingModel.create({ ...data });
  if (!listing) throw createError.InternalServerError("Unable to create listing");

  return listing;
};

/**
 * get listing by id
 * @param id listing id
 * @returns listing
 * @throws 400 error if listing id is invalid
 * @throws 404 error if listing not found
 */
export const getListingById = async (id: Types.ObjectId | string) => {
  if (!Types.ObjectId.isValid(id)) throw createError.BadRequest("Invalid listing id");

  const listing = await listingModel.findById(id);
  if (!listing) throw createError.NotFound("Listing not found");

  return listing;
};

/**
 *get listing by filterations
 * @param filter - filter options
 * @returns list of filtered listing
 */
export const getListings = async (filter: listingFilter) => {
  const query: FilterQuery<listingDocument> = {
    ...(filter.userRef && { userRef: filter.userRef }),
    ...(filter.name && { name: filter.name }),
    ...(filter.regularPrice && { regularPrice: filter.regularPrice }),
    ...(filter.discountPrice && { discountPrice: filter.discountPrice }),
    ...(filter.bedrooms && { bedrooms: filter.bedrooms }),
    ...(filter.bathrooms && { bathrooms: filter.bathrooms }),
    ...(filter.furnished && { furnished: filter.furnished }),
    ...(filter.parking && { parking: filter.parking }),
    ...(filter.offer && {
      $or: [{ offer: filter.offer }, { offer: { $in: [false, true] } }],
    }),
    ...(filter.type && {
      $or: [{ type: filter.type }, { type: { $in: ["rent", "sale"] } }],
    }),
    ...(filter.search && {
      $or: [
        { description: { $regex: filter.search, $options: "i" } },
        { name: { $regex: filter.search, $options: "i" } },
        { address: { $regex: filter.search, $options: "i" } },
      ],
    }),
  };

  const limit = getSanitizeLimit(filter.limit);
  const page = getSanitizePage(filter.page);
  const skip = getSanitizeOffset(limit, page);

  const options: QueryOptions = {
    skip,
    lean: true,
    limit: limit + 1,
    sort: { createdAt: filter.sort === "latest" ? -1 : 1 },
  };

  const listings = await listingModel.find(query, null, options);

  return getPageConnection(listings, page, limit);
};

/**
 * update a listing
 * @param data - listing data
 * @returns updated listing
 * @throws 400 error if listing data is invalid
 * @throws 404 error if listing not found
 */
export const updateListing = async (data: updateListingInput) => {
    const listing = await getListingById(data.id)

    const updateData = {
        ...(data.name && { name: data.name }),
        ...(data.description && { description: data.description }),
        ...(data.address && { address: data.address }),
        ...(data.regularPrice && { regularPrice: data.regularPrice }),
        ...(data.discountPrice && { discountPrice: data.discountPrice }),
        ...(data.bathrooms && { bathrooms: data.bathrooms }),
        ...(data.bedrooms && { bedrooms: data.bedrooms }),
        ...(data.furnished && { furnished: data.furnished }),
        ...(data.parking && { parking: data.parking }),
        ...(data.type && { type: data.type }),
        ...(data.offer && { offer: data.offer }),
        ...(data.imageUrls && { imageUrls: data.imageUrls })
    };

    return await listingModel.findByIdAndUpdate(
        { _id: listing._id },
        { $set: updateData },
        { new: true }
    );
};

/**
 * delete a listing
 * @param id - listing id
 * @returns delete listing
 * @throws 400 error listing id is invalid
 */
export const deleteListingById = async (id: string | Types.ObjectId) => {
    if(!Types.ObjectId.isValid(id)) throw createError.BadRequest('Invalid listing id')
    
    const listing = await listingModel.findByIdAndDelete({ _id: id })

    return listing
};