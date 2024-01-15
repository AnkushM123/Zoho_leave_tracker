const userService = require('../core/services/user-service')
const validator = require('validator');

const getUser = async (req, res) => {
    let data = await userService.getUser();
    if (data.length > 0) {
      res.send(data);
      return
    }
    else {
      res.status(404).json("No data found");
    }
  }

  module.exports = { getUser}