const yup = require('yup');
const passwordRegex = require('../constant/passwordRegex');

const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required')
});

const registerSchema = yup.object().shape({
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
    gender: yup.string().required('Gender is required'),
    age: yup.number().required().positive().integer(),
    managerId: yup.string().required('managerId is required'),
    createdBy: yup.string().required('createdBy is required'),
    updatedBy: yup.string().required('updatedBy is required'),
    roles: yup.string().required('Role is required'),
    password: yup.string().required('Password is required').matches(passwordRegex, "Password must contain at least 8 characters, one uppercase,one lowercase, one number and one special case character"),
    mobile: yup.string().required('Mobile is required'),
});

module.exports = { loginSchema, registerSchema }