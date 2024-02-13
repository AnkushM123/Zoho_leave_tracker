const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  employeeId:{
    type: Number
  },
  leaveId: {
    type: String,
  },
  name: {
    type: String,
  },
  reasonForLeave: {
    type: String
  },
  comment: {
    type: String
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  totalDays:{
    type: Number
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
  },
  status: { 
    type: Number, 
    enum: [0, 1, 2, 3] }
}, {
  timestamps: true
}
)

const leaveRequestModel = mongoose.model("request", leaveRequestSchema);

module.exports = leaveRequestModel;