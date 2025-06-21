Disaster Response Coordination Backend
A backend-heavy Node.js & Supabase-powered API for managing disasters, resources, and real-time updates. Built for location-aware emergency response using geospatial queries, Gemini AI, and mock social media data.

🚀 Features
🔧 CRUD for Disasters

📍 Geolocation & Supabase PostGIS

📡 Nearby Resource Lookup

🧠 Google Gemini API Integration (location extraction & image verification)

🐦 Mock Social Media Fetching (Twitter/Bluesky compatible)

🌐 WebSocket Real-Time Updates via Socket.IO

🗂️ Caching & Rate Limiting via Supabase

📦 Tech Stack
Node.js, Express.js

Supabase (PostgreSQL + PostGIS)

Socket.IO

Google Gemini API

Mapbox / OSM (Geocoding)

Cheerio (for scraping official updates)

🧪 API Overview
Method Endpoint Description
POST /disasters Create a disaster
GET /disasters?tag=flood List disasters by tag
PUT /disasters/:id Update disaster
DELETE /disasters/:id Delete disaster
GET /disasters/:id/resources?lat=..&lon=.. Nearby resources
GET /disasters/:id/social-media Fetch social posts
GET /disasters/:id/official-updates Scrape gov updates
POST /disasters/:id/verify-image Verify image with Gemini
POST /geocode Extract & convert location

🧪 Testing Locally
npm install

Add your .env file with:

env
Copy
Edit
SUPABASE_URL=
SUPABASE_ANON_KEY=
GEMINI_API_KEY=
npm start and test endpoints with Postman

🌐 Deployment
Backend: Render
