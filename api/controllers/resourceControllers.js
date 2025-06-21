const service = require("../services/resourceService");

exports.getNearbyResources = async (req, res) => {
  try {
    const { id } = req.params;
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: "lat and lon are required" });
    }

    const data = await service.getNearbyResources(
      id,
      parseFloat(lat),
      parseFloat(lon)
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNearbyResourcesViaDisasterId = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await service.getNearbyResourcesViaDisasterId(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addResource = async (req, res) => {
  try {
    const { name, type, lat, lon, disaster_id, locationName } = req.body;

    if (!name || !type || !lat || !lon || !disaster_id || !locationName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const resource = await service.addResource({
      name,
      type,
      disaster_id,
      location: `POINT(${lon} ${lat})`,
      location_name: locationName,
    });

    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
