const supabase = require("../config/supabaseClient");

const { AtpAgent } = require("@atproto/api");

const agent = new AtpAgent({ service: "https://bsky.social" });

exports.getSocialMedia = async (query) => {
  await agent.login({
    identifier: process.env.BLUESKY_ID,
    password: process.env.BLUESKY_PWD,
  });

  const response = await agent.app.bsky.feed.searchPosts({
    q: query,
    limit: 5,
  });

  return response.data.posts.map((post) => ({
    user: post.author.handle,
    content: post.record.text,
  }));
};

// exports.getSocialMedia = async (searchQuery) => {
//   // For now, fake data — return posts that match the tag
//   return [
//     {
//       user: "netrunnerX",
//       content: `People are trapped due to ${searchQuery} near Sector 12.`,
//     },
//     {
//       user: "reliefAdmin",
//       content: `Request for blankets and clean water for ${searchQuery} zone.`,
//     },
//   ];
// };
