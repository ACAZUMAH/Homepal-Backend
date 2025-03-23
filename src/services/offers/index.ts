import { createOffer, makeOfferDocument, offerfilters } from "src/common/interfaces";
import { offerModel } from "src/models";
import { validateofferData } from "./validateOfferData";
import createError from "http-errors";
import { FilterQuery, QueryOptions } from "mongoose";
import { getSanitizeLimit, getSanitizeOffset, getSanitizePage } from "src/common/helpers";

export const createNewOffer = async (data: createOffer) => {

  validateofferData(data);

  const offer = await offerModel.create({
    ...data,
  });

  if (!offer) throw createError(500, "Could not create offer");

  return offer;
};

export const getUserOffers = async (filters: offerfilters) => {
  const query: FilterQuery<makeOfferDocument> = {
    ...(filters.clientId && { clientId: filters.clientId }),
    ...(filters.agentId && { agentId: filters.agentId })
  }

  const limit = getSanitizeLimit(filters.limit)
  const page = getSanitizePage(filters.page)
  const skip = getSanitizeOffset(limit, page)

  const options: QueryOptions = { skip, lean: true, limit: limit + 1, sort: { createdAt: 1 } }

  return await offerModel.find(query, null, options)
}
