import Ajv from "ajv";
import addErrors from "ajv-errors";
import { createOffer } from "src/common/interfaces";
import createError from "http-errors"

const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

const offerSchama = {
  type: "object",

  properties: {
    propertyId: { type: "string" },
    agentId: { type: "string" },
    clientId: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string" },
    PhoneNumber: { type: "string" },
    offerAmount: { type: "number" },
  },

  required: [
    "propertyId",
    "agentId",
    "clientId",
    "email",
    "phoneNumber",
    "offerAmount",
  ],

  errorMessage: {
    required: {
        propertyid: "Property id is required",
        agentId: "Agent id is required",
        email: 'Email is requried',
        phoneNumber: "Phone number is required",
        offerAmount: 'offer amount is required'
    }
  }
};

export const validateofferData = (data: createOffer) => {
    const validate = ajv.compile(offerSchama)

    const isValid = validate(data)

    if(!isValid){
        throw createError(400, ajv.errorsText(validate.errors))
    }
}
