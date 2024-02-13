const yup = require('yup');
const regex = require('../constant/regex');
const message = require('../constant/messages');

const mongoIdSchema = yup.object().shape({
    id: yup.string().required().matches(regex.mongoIdRegex, message.userApi.error.invalidId),
});

const getUserByEmailSchema = yup.object().shape({
    email: yup.string().email().required(),
});

const changePasswordSchema = yup.object().shape({
    password: yup.string().required().matches(regex.passwordRegex, message.userApi.error.passwordValidation),
});

const editUserSchema = yup.object().shape({
    name: yup.string().required(),
    address: yup.object({
        addressLine1: yup.string().required().max(100),
        addressLine2: yup.string().required().max(100),
        city: yup.string().required().max(100),
        state: yup.string().required().max(100),
        country: yup.string().required().max(100), 
        postalCode: yup.string().required().max(100),
    }),
    mobile: yup.string().required().matches(regex.mobileRegex, message.userApi.error.mobileValidation),
    updatedBy: yup.string().required(),
})

module.exports = { mongoIdSchema, getUserByEmailSchema, editUserSchema, changePasswordSchema }   