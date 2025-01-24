import Ajv from "ajv";
import addFormat from 'ajv-formats'
import addErrors from 'ajv-errors'
import { createUserInput } from "src/common/interfaces";
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
        username: { type: "string" },
        phone: { type: 'string', format: 'phone' },
        password: { type: 'string' }
    },

    required: ['username', 'phone', 'password'],

    errorMessage: {
        required: {
            username: 'username name required',
            phone: 'phone number is required',
            password: 'password is required'
        }
    }

};

export const validateCreateUser = (data: createUserInput) => {
    const validate = ajv.compile(createAccountSchema);
    const isValid = validate(data);
    if(!isValid){
        throw createError(400, ajv.errorsText(validate.errors))
    };
};