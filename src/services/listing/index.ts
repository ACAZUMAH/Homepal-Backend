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
  stringsToObjecIds,
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
  if (!listing)
    throw createError.InternalServerError("Unable to create listing");

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
  if (!Types.ObjectId.isValid(id))
    throw createError.BadRequest("Invalid listing id");

  const listing = await listingModel.findById(id);
  if (!listing) throw createError.NotFound("Listing not found");

  return listing;
};

/**
 *get listing by filterations
 * @param filter - filter options
 * @returns list of filtered listing
 */
export const getListings = async (filter: listingFilter, favoriteIds?: Types.ObjectId[]) => {
  const query: FilterQuery<listingDocument> = {
    ...(filter.userRef && { userRef: filter.userRef }),
    ...(filter.name && { name: filter.name }),
    ...(filter.price && { price: filter.price }),
    ...(filter.bedrooms && { bedrooms: filter.bedrooms }),
    ...(filter.bathrooms && { bathrooms: filter.bathrooms }),
    ...(filter.type && { type: filter.type }),
    ...(filter.mode && { mode: filter.mode }),
    ...(filter.amenities && { amenities: filter.amenities }),
    ...(filter.address && { address: filter.address }),
    ...(filter.search && {
      $or: [
        { description: { $regex: filter.search, $options: "i" } },
        { name: { $regex: filter.search, $options: "i" } },
        { address: { $regex: filter.search, $options: "i" } },
        { type: { $regex: filter.search, $options: "i" } },
      ],
    }),
    ...(favoriteIds && { _id: { $in: favoriteIds }})
  };

  const limit = getSanitizeLimit(filter.limit);
  const page = getSanitizePage(filter.page);
  const skip = getSanitizeOffset(limit, page);

  const sortOrder: 1 | -1 = filter.sort === "Newest" ? -1 : 1;

  const agregationPipeline = [
    { $match: query },

    { $sort: { createdAt: sortOrder } },

    {
      $facet: {
        listings: [{ $skip: skip }, { $limit: limit }],
        totalCount: [{ $count: "count" }],
      },
    },

    {
      $project: {
        listings: '$listings',
        totalCount: { $arrayElemAt: ['$totalCount.count', 0] }
      }
    }
  ];

  const [result] = await listingModel.aggregate(agregationPipeline)

  return getPageConnection(result.listings, page, limit, result.totalCount)
};

export const getFavoriteListings = async (ids: string[], filters: listingFilter) => {
  if (!ids.length)
    return {
      edges: [],
      PageInfo: {
        page: filters.page,
        limit: filters.limit,
        total: 0,
        hasNextPage: false,
        totalCount: 0
      },
    };

  const favoriteIds = stringsToObjecIds(ids)

  return await getListings(filters, favoriteIds);
}

/**
 * update a listing
 * @param data - listing data
 * @returns updated listing
 * @throws 400 error if listing data is invalid
 * @throws 404 error if listing not found
 */
export const updateListing = async (data: updateListingInput) => {
  const listing = await getListingById(data.id);

  const updateData = {
    ...(data.name && { name: data.name }),
    ...(data.description && { description: data.description }),
    ...(data.address && { address: data.address }),
    ...(data.price && { regularPrice: data.price }),
    ...(data.bathrooms && { bathrooms: data.bathrooms }),
    ...(data.bedrooms && { bedrooms: data.bedrooms }),
    ...(data.type && { type: data.type }),
    ...(data.mode && { mode: data.mode }),
    ...(data.amenities &&
      data.amenities.length > 0 && { amenities: data.amenities }),
    ...(data.imageUrls &&
      data.imageUrls.length > 0 && { imageUrls: data.imageUrls }),
  };

  return await listingModel.findByIdAndUpdate(
    { _id: listing._id, userRef: data.userRef },
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
  if (!Types.ObjectId.isValid(id))
    throw createError.BadRequest("Invalid listing id");

  const listing = await listingModel.findByIdAndDelete({ _id: id });

  if (!listing) throw createError.NotFound("Unable to delete");

  return "succesfully deleted";
};

export const getPropertiesByIds = async (ids: string[] | Types.ObjectId[]) => {
  return await listingModel.find({ _id: { $in : ids }})
}