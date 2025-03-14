import { createTourRequest } from "src/common/interfaces";
import { tourModel } from "src/models/requestTours";
import { validateCreateTour } from "./validate-tour-data";
import createError from "http-errors";

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


export const getUserRequestedTours = () => {

}

export const getRequestedToursOnUserProperty = () => {

}