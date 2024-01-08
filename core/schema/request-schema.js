const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  managerId: {
    type: Schema.Types.ObjectId,
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
    type: String
  },
  endDate: {
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

const requestModel = mongoose.model("request", requestSchema);

module.exports = requestModel;