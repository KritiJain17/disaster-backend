const service = require("../services/userService");
const statusCodes = require("../../constants/statusCodes");

exports.createUser = async (req, res) => {
  try {
    const newUser = await service.createUser(req.body);
    res.status(statusCodes.CREATED).json(newUser);
  } catch (err) {
    res.status(statusCodes.INTERNAL_SERVER).json({ error: err.message });
  }
};
