const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String
  }
}
)

const roleModel = mongoose.model("role", roleSchema);

module.exports = roleModel;