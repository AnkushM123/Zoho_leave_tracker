const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    leaveId: {
        type: Schema.Types.ObjectId,
        ref: 'leaveType'
    },
    balance: {
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
    }
}, {
    timestamps: true
}
)

const leaveModel = mongoose.model("leave", leaveSchema);

module.exports = leaveModel;