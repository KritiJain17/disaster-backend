const supabase = require("../config/supabaseClient");
const { getDisasterById } = require("./disasterService");
const axios = require("axios");
const cheerio = require("cheerio");

exports.getFemaUpdates = async (keyword) => {
  const url = "https://www.fema.gov/press-releases";
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);

  const updates = [];

  $(".card__content").each((i, el) => {
    const title = $(el).find(".card__title").text().trim();
    const link = "https://www.fema.gov" + $(el).find("a").attr("href");
    const timestamp = $(el).find("time").attr("datetime");

    if (title.toLowerCase().includes(keyword.toLowerCase())) {
      updates.push({
        source: "FEMA",
        title,
        url: link,
        timestamp,
      });
    }
  });

  return updates.slice(0, 5);
};

exports.getOfficialUpdates = async (disasterId) => {
  const disaster = await getDisasterById(disasterId);
  const keyword = disaster.tag || disaster.title;

  const cacheKey = `updates_${keyword}`;
  const now = new Date().toISOString();

  const { data: cached, error: cacheError } = await supabase
    .from("cache")
    .select("value")
    .eq("key", cacheKey)
    .gt("expires_at", now)
    .maybeSingle();

  if (cached) return cached.value;

  const updates = [
    {
      source: "NDMA India",
      title: `${keyword} Alert: NDMA deploys teams`,
      url: "https://ndma.gov.in",
      timestamp: new Date().toISOString(),
    },
  ];

  await supabase.from("cache").upsert({
    key: cacheKey,
    value: updates,
    expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  });

  return updates;
};
