const supabase = require("../config/supabaseClient");

// exports.createDisaster = async (disaster) => {
//   const { data, error } = await supabase
//     .from("disasters")
//     .insert([disaster])
//     .select()
//     .single();
//   if (error) throw error;
//   return data;
// };

exports.createDisaster = async ({
  title,
  locationName,
  description,
  location,
  tags,
}) => {
  const { data, error } = await supabase
    .from("disasters")
    .insert([
      { title, location_name: locationName, location, description, tags },
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
};

exports.getDisaster = async (tags) => {
  let query = supabase.from("disasters").select("*");
  if (tags?.length) query = query.overlaps("tags", tags);
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

exports.getDisasterById = async (id) => {
  let query = supabase.from("disasters").select("*");
  if (id) query = query.eq("id", id);
  const { data, error } = await query;
  if (error) throw error;
  return data[0];
};

exports.editDisaster = async (id, updatedDisaster) => {
  const { data, error } = await supabase
    .from("disasters")
    .update(updatedDisaster)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

exports.deleteDisaster = async (id) => {
  const { error } = await supabase.from("disasters").delete().eq("id", id);
  if (error) throw error;
};
