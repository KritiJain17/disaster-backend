const supabase = require("../config/supabaseClient");

exports.getNearbyResources = async (disasterId, lat, lon, radiusKm = 10) => {
  const radiusMeters = radiusKm * 1000;

  const { data, error } = await supabase.rpc("get_nearby_resources", {
    lat_input: lat,
    lon_input: lon,
    radius: radiusMeters,
    disaster_id_input: disasterId,
  });

  if (error) throw error;
  return data;
};

exports.getNearbyResourcesViaDisasterId = async (disasterId, radiusKm = 10) => {
  const radiusMeters = radiusKm * 1000;

  // const { data: disaster, error: fetchError } = await supabase
  //   .from("disasters")
  //   .select("location")
  //   .eq("id", disasterId)
  //   .single();

  const { data: locationCoords, error: coordErr } = await supabase.rpc(
    "get_disaster_coordinates",
    {
      disaster_id: disasterId,
    }
  );
  // if (fetchError) throw fetchError;
  // console.log(disaster);
  // const { location } = disaster;
  // console.log(location);

  if (coordErr) throw coordErr;

  const { lat, lon } = locationCoords[0];
  console.log(lat, lon, locationCoords);

  const { data, error } = await supabase.rpc("get_nearby_resources", {
    lat_input: lat,
    lon_input: lon,
    radius: radiusMeters,
    disaster_id_input: disasterId,
  });

  if (error) throw error;
  return data;
};

exports.addResource = async ({
  name,
  type,
  location,
  disaster_id,
  location_name,
}) => {
  const { data, error } = await supabase
    .from("resources")
    .insert([{ name, type, location, disaster_id, location_name }])
    .select()
    .single();

  if (error) throw error;
  return data;
};
