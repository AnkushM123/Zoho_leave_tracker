const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema =new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users'
      },
    managerEmail: {
        type: String
      },
    leaveType:{
        type: String,
        enum: ['compensantoryOff','forgotIdCard','outOfOfficeOnDuty','paidLeave','unpaidLeave','workFromHome'],
    },
    date:{
        type: Date,
        default: Date.now
    },
    reasonForLeave:{
        type:String
    }
     
  }
)

const requestModel = mongoose.model("request", requestSchema);

module.exports = requestModel;