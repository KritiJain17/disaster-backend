const service = require("../services/officialUpdatesService");

exports.getOfficialUpdates = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = await service.getOfficialUpdates(id);
    res.status(200).json(updates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
