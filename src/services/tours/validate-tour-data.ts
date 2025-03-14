import Ajv from "ajv";
import addErrors from "ajv-errors";
import { createTourRequest } from "src/common/interfaces";
import createError from "http-errors";

const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

const createTourSchema = {
  type: "object",

  properties: {
    propertyId: { type: "string" },
    agentId: { type: "string" },
    clientId: { type: "string" },
    tourMode: { type: "string" },
    contactDetails: { type: "string" },
  },

  required: ["propertyId","agentId", "clientId", "tourMode", "contactDetails"],

  errorMessage: {
    required: {
      propertyId: "Property id is required",
      agentId: "Agent id is required",
      clientId: "Client id is required",
      tourMode: "Tour mode is required",
      contactDetails: "Contact details is required",
    },
  },
};

export const validateCreateTour = (data: createTourRequest) => {
  const validate = ajv.compile(createTourSchema);

  const isValid = validate(data);

  if (!isValid) throw createError(400, ajv.errorsText(validate.errors));
};
