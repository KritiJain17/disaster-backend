const supabase = require("../config/supabaseClient");

exports.createUser = async (user) => {
  const { data, error } = await supabase.from("users").insert([user]);
  if (error) throw error;
  return data;
};
