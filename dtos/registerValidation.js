const yup = require('yup');
const passwordRegex=require('../core/constant/passwordRegex');

const registerSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    address: yup.object({
        flat_details: yup.string().required('Flat deails are required').max(100, 'Flat details must be less than or equal to 100 characters'),
        area: yup.string().required('area deails are required').max(100, 'Area details must be less than or equal to 100 characters'),
        landmark: yup.string().required('landmark deails are required').max(100, 'Landamark details must be less than or equal to 100 characters'),
    }),
    email: yup.string().email('Invalid email format').required('Email is required'),
    gender: yup.string().required('Gender is required'),
    age: yup.number().required().positive().integer(),
    managerId: yup.string().required('managerId is required'),
    createdBy: yup.string().required('createdBy is required'),
    updatedBy: yup.string().required('updatedBy is required'),
    roles: yup.string().required('Role is required'),
    password: yup.string().required('Password is required').matches(passwordRegex,"Password must contain at least 8 characters, one uppercase,one lowercase, one number and one special case character"),
    mobile: yup.string().required('Mobile is required'),
    avatar: yup.string().required('Image is required')
});

module.exports = registerSchema