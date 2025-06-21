const service = require("../services/disasterService");
const statusCodes = require("../../constants/statusCodes");

// exports.createDisaster = async (req, res) => {
//   try {
//     const { title, locationName, description, tags, lat, lon } = req.body;

//     if (!title || !locationName || !lat || !lon || !description || !tags) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const newDisaster = await service.createDisaster({
//       title,
//       locationName,
//       description,
//       location: `POINT(${lon} ${lat})`,
//       tags,
//     });

//     const io = req.app.get("io");
//     io.emit("disaster_updated", {
//       type: "create",
//       payload: newDisaster,
//     });
//     res.status(statusCodes.CREATED).json(newDisaster);
//   } catch (err) {
//     res.status(statusCodes.INTERNAL_SERVER).json({ error: err.message });
//   }
// };

exports.createDisaster = async (req, res) => {
  try {
    const { title, locationName, description, tags, lat, lon } = req.body;

    if (!title || !locationName || !lat || !lon || !description || !tags) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newDisaster = await service.createDisaster({
      title,
      locationName,
      description,
      location: `POINT(${lon} ${lat})`,
      tags,
    });

    const io = req.app.get("io");
    io.emit("disaster_updated", {
      type: "create",
      payload: newDisaster,
    });
    res.status(statusCodes.CREATED).json(newDisaster);
  } catch (err) {
    res.status(statusCodes.INTERNAL_SERVER).json({ error: err.message });
  }
};

exports.getDisaster = async (req, res) => {
  try {
    const tags = req.query.tags?.split(",");
    const disasters = await service.getDisaster(tags);
    res.status(statusCodes.OK).json(disasters);
  } catch (err) {
    res.status(statusCodes.INTERNAL_SERVER).json({ error: err.message });
  }
};

exports.editDisaster = async (req, res) => {
  const { id } = req.params;
  const updatedDisasterFields = req.body;
  try {
    const updatedDisaster = await service.editDisaster(
      id,
      updatedDisasterFields
    );
    const io = req.app.get("io");
    io.emit("disaster_updated", {
      type: "update",
      payload: updatedDisaster,
    });
    res.status(statusCodes.OK).json(updatedDisaster);
  } catch (err) {
    res.status(statusCodes.INTERNAL_SERVER).json({ error: err.message });
  }
};

exports.deleteDisaster = async (req, res) => {
  const { id } = req.params;
  try {
    await service.deleteDisaster(id);
    const io = req.app.get("io");
    io.emit("disaster_updated", {
      type: "delete",
      payload: { id },
    });
    res.status(statusCodes.NO_CONTENT).send();
  } catch (err) {
    res.status(statusCodes.INTERNAL_SERVER).json({ error: err.message });
  }
};
