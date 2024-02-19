const mongoose = require('mongoose');
const { string } = require('yup');

const userSchema = new mongoose.Schema({
  employeeId: { 
    type: String, 
  },
  name: {
    type: String,
    required: true
  },
  address: {
    addressLine1: {
      type: String
    },
    addressLine2: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    country: {
      type: String
    },
    postalCode: {
      type: String
    },
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  mobile: {
    type: String,
    required: true,
  },
  gender: { 
    type: Number,
    enum: [0, 1] 
  },
  roles: [
    {
      type: String
    }
  ],
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email required"]
  },
  password: {
    type: String,
    required: [true, "Password required"]
  },
  avatar: {
    type: String
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, {
  timestamps: true
}
)

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;