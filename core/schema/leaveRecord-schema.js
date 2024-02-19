const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveRecordSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    leaveId: {
        type: Schema.Types.ObjectId,
        ref: 'leaveType'
    },
    balance: {
        type: Number,
        default:0
    },
    booked: {
        type: Number,
        default:0
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

const leaveRecordModel = mongoose.model("leave", leaveRecordSchema);

module.exports = leaveRecordModel;