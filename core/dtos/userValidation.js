const yup = require('yup');
const mongoIdRegex = require('../constant/mongodbIdRegex');
const mobileNoRegex= require('../constant/mobileNoRegex')

const mongoIdSchema = yup.object().shape({
    id: yup.string().required().matches(mongoIdRegex, "Invalid mongodb Id"),
});

const getUserByEmailSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
});

const editUserSchema=yup.object().shape({
    name: yup.string().required('Name is required'),
    address: yup.object({
        addressLine1: yup.string().required('Address line 1 details are required').max(100, 'Flat details must be less than or equal to 100 characters'),
        addressLine2: yup.string().required('Address line 2 deails are required').max(100, 'Area details must be less than or equal to 100 characters'),
        city: yup.string().required('city deails are required').max(100, 'Landamark details must be less than or equal to 100 characters'),
        state: yup.string().required('state deails are required').max(100, 'Landamark details must be less than or equal to 100 characters'),
        country: yup.string().required('country deails are required').max(100, 'Landamark details must be less than or equal to 100 characters'),
        postalCode: yup.string().required('postal Code deails are required').max(100, 'Landamark details must be less than or equal to 100 characters'),
    }),
    email: yup.string().email('Invalid email format').required('Email is required'),
    mobile: yup.string().required('Mobile is required').matches(mobileNoRegex, "Mobile number is not valid"),
    age: yup.number().required().positive().integer(),
    updatedBy: yup.string().required('updatedBy is required'),
})

module.exports = { mongoIdSchema, getUserByEmailSchema, editUserSchema }