import Ajv from "ajv";
import addErrors from "ajv-errors";
import createError from "http-errors";
import { createListingInput, updateListingInput } from "../../common/interfaces/listing";

const ajv = new Ajv({ allErrors: true });

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
    price: { type: "integer" },
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
    type: { type: "string" },
    mode: {
      type: "array",
      items: { type: "string" },
    },
    imageUrls: {
      type: "array",
      items: { type: "string" },
    },
    userRef: { type: "string" },
  },

  required: [
    "name",
    "description",
    "address",
    "price",
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
      type: "property type is required",
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
