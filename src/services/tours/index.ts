import { createTourRequest, requestFilters, RequestTourDocument } from "src/common/interfaces";
import { tourModel } from "src/models/requestTours";
import { validateCreateTour } from "./validate-tour-data";
import createError from "http-errors";
import { FilterQuery, QueryOptions } from "mongoose";
import { getPageConnection, getSanitizeLimit, getSanitizeOffset, getSanitizePage } from "src/common/helpers";

/**
 * 
 * @param data 
 * @returns 
 */
export const createNewTourRequest = async (data: createTourRequest) => {
  validateCreateTour(data);

  const create = await tourModel.create({ ...data });

  if (!create) throw createError.BadRequest("Unable to create request.");

  return create;
};


export const getUserRequestTours = async (filters: requestFilters) => {
  const query: FilterQuery<RequestTourDocument> = {
    ...(filters.clientId && { clientId: filters.clientId }),
    ...(filters.agentId && { agentId: filters.agentId })
  }

  const limit = getSanitizeLimit(filters.limit)
  const page = getSanitizePage(filters.page)
  const skip = getSanitizeOffset(limit, page)

  const options: QueryOptions = { skip, lean: true, limit: limit + 1, sort: { createdAt: 1 } }

  return await tourModel.find(query, null, options)
}