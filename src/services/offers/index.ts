import { createOffer } from "src/common/interfaces";
import { offerModel } from "src/models";
import { validateofferData } from "./validateOfferData";
import createError from "http-errors";

export const createNewOffer = async (data: createOffer) => {
  validateofferData(data);

  const offer = await offerModel.create({
    ...data,
  });

  if (!offer) throw createError(500, "Could not create offer");

  return offer;
};
