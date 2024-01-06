const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    flat_details: {
      type: String
    },
    area: {
      type: String
    },
    landmark: {
      type: String
    }
  },
  age: {
    type: Number,
    required: true
  },
  mobile: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male','female'],
    required: true
  },
  // roles:{
  //   type: Array,
  //   items: {          
  //     type: Object
  //   },
  // },
  roles : [
    {
      type : String
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
    required: true,
    required: [true, "Password required"]
  },
  avatar: {
    type: String
  },
  managerId: {
    type: String
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