const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  roleName: {
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
}, {
  timestamps: true
}
)

const roleModel = mongoose.model("role", roleSchema);

module.exports = roleModel;