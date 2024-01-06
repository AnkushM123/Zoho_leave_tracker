
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveSchema =new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      compensantoryOff: {
        type: Number,
        default: 0
      },
      forgotIdCard: {
        type: Number,
        default: 0
      },
      outOfOfficeOnDuty: {  
        type: Number,
        default: 0
      },
      paidLeave: {
        type: Number,
        default: 1.75
      },
      unpaidLeave: {
        type: Number,
        default: 0
      },
      workFromHome: {
        type: Number,
        default: 1
      }
    }
)

const leaveModel = mongoose.model("leave", leaveSchema);

module.exports = leaveModel;