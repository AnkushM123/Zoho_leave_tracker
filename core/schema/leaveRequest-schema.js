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
  leaveId: {
    type: String,
  },
  name: {
    type: String,
  },
  leaveName: {
    type: String,
  },
  reasonForLeave: {
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
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, {
  timestamps: true
}
)

const leaveRequestModel = mongoose.model("request", leaveRequestSchema);

module.exports = leaveRequestModel;