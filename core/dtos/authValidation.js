const yup = require('yup');
const regex = require('../constant/regex');
const message = require('../constant/messages');

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
});

const registerSchema = yup.object().shape({
    name: yup.string().required(),
    address: yup.object({
        addressLine1: yup.string().required().max(100),
        addressLine2: yup.string().required().max(100),
        city: yup.string().required().max(100),
        state: yup.string().required().max(100),
        country: yup.string().required().max(100),
        postalCode: yup.string().required().max(100),
    }),
    email: yup.string().email().required(),
    gender: yup.string().required(),
    age: yup.number().required().positive().integer(),
    managerId: yup.string().required(),
    createdBy: yup.string().required(),
    updatedBy: yup.string().required(),
    roles: yup.string().required(),
    password: yup.string().required().matches(regex.passwordRegex, message.validations.passwordValidation),
    mobile: yup.string().required().matches(regex.mobileRegex, message.validations.mobileValidation),
});

module.exports = { loginSchema, registerSchema } 