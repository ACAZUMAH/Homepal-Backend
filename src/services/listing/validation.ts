import Ajv from "ajv";
import addErrors from "ajv-errors";
import createError from "http-errors";
import { createListingInput, updateListingInput } from "../../common/interfaces/listing";

const ajv = new Ajv();

addErrors(ajv);

const createListingSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
      errorMessage: {
        minLength: "name must be at least 1 character",
      },
    },
    description: {
      type: "string",
      minLength: 1,
      errorMessage: {
        minLength: "description must be at least 1 character",
      },
    },
    address: {
      type: "string",
      minLength: 1,
      errorMessage: {
        minLength: "address must be at least 1 character",
      },
    },
    regularPrice: { type: "integer" },
    discountPrice: { type: "integer" },
    bathrooms: {
      type: "number",
      minimum: 1,
      errorMessage: {
        minimum: "bathrooms must be atleast 1",
      },
    },
    bedrooms: {
      type: "number",
      minimum: 1,
      errorMessage: {
        minimum: "bedrooms must be atleast 1",
      },
    },
    furnished: { type: "boolean" },
    parking: { type: "boolean" },
    type: { type: "string" },
    offer: { type: "boolean" },
    imageUrls: {
      type: "array",
      items: { types: "string" },
      minimum: 1,
      errorMessage: {
        minimum: "images must be at least 1",
      },
    },
    userRef: { type: "string" },
  },

  required: [
    "name",
    "description",
    "address",
    "regularPrice",
    "bathrooms",
    "bedrooms",
    "type",
    "imageUrls",
    "userRef",
  ],

  errorMessage: {
    required: {
      name: "name is required",
      description: "description is required",
      address: "address is required",
      regularPrice: "regular price is required",
      bathrooms: "bathrooms is required",
      bedrooms: "bedrooms is required",
      type: "type is required",
      imageUrls: "imageUrls is required",
    },
  },
};

export const createListingValidation = (data: createListingInput) => {
  const validate = ajv.compile(createListingSchema);
  const valid = validate(data);
  if (!valid) {
    throw createError(400, ajv.errorsText(validate.errors));
  }
};
