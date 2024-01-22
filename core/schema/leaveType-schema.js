const mongoose = require('mongoose');

const leaveTypeSchema = new mongoose.Schema({
  leaveName: {
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

const leaveTypeModel = mongoose.model("leaveType", leaveTypeSchema);

module.exports = leaveTypeModel;