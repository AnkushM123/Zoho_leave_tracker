const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  leaveType: {
    type: String,
    enum: ['compensantoryOff', 'forgotIdCard', 'outOfOfficeOnDuty', 'paidLeave', 'unpaidLeave', 'workFromHome'],
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