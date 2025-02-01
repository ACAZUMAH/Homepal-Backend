import Ajv from "ajv";
import addFormat from 'ajv-formats'
import addErrors from 'ajv-errors'
import { upsertUserInput } from "src/common/interfaces";
import createError from 'http-errors'

const ajv = new Ajv({ allErrors: true })

addFormat(ajv)
addErrors(ajv)

ajv.addFormat('phone', {
    type: 'string',
    validate: (value: string) => {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneRegex.test(value)
    }
}) 

const createAccountSchema = {
    type: 'object',

    properties: {
        phone: { type: 'string', format: 'phone' },
    },

    required: ['phone'],

    errorMessage: {
        required: {
            phone: 'phone number is required',
        }
    }

};

export const validateCreateUser = (data: upsertUserInput) => {
    const validate = ajv.compile(createAccountSchema);
    const isValid = validate(data);
    if(!isValid){
        throw createError(400, ajv.errorsText(validate.errors))
    };
};