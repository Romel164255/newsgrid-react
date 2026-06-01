/**
 * devserver.cjs
 * -----------
 * Lightweight Express server that runs the Vercel-style API handlers
 * locally so Vite's proxy (/api -> localhost:3001) can reach them.
 *
 * Usage:
 *   Terminal 1: node devserver.cjs
 *   Terminal 2: npm run dev
 *
 * OR just use "vercel dev" which does both automatically.
 *
 * Requires: npm install -D express dotenv
 */

require("dotenv").config({ path: ".env.local" });

const express = require("express");
const app = express();

app.use(express.json());

// Helper: wrap ESM handlers for CommonJS require
function makeHandler(modulePath) {
  return async (req, res) => {
    // Dynamically import the ESM handler
    const mod = await import(modulePath);
    await mod.default(req, res);
  };
}

app.all("/api/news", makeHandler("./api/news.js"));
app.all("/api/weather", makeHandler("./api/weather.js"));

app.listen(3001, () => {
  console.log("Dev API server running on http://localhost:3001");
});
