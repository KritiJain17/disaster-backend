const service = require("../services/socialService");
const disasterService = require("../services/disasterService");
const statusCodes = require("../../constants/statusCodes");

exports.getSocialMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const disaster = await disasterService.getDisasterById(id);
    if (!disaster) {
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ error: "Disaster not found" });
    }
    const query = disaster.title || disaster.description;
    const posts = await service.getSocialMedia(query);

    res.status(statusCodes.OK).json(posts);
  } catch (err) {
    res.status(statusCodes.INTERNAL_SERVER).json({ error: err.message });
  }
};
