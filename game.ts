import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

import Monster, { sayHello } from "./monster.ts";
import { syncContributionsWithGithub } from "./syncWithGithub.ts";

const env = await load();
const token = env["TOKEN"];
const username = env["USERNAME"];

const FIFTEEN_MINUTES = 900000;
const DEFAULT_SYNC_TIME_IN_MILLISECONDS = 60000;
const lastSync = new Date(Date.now() - 30 * 24 * 60 * 60  * 1000); // thirty days ago
const oneYearAgo = new Date();
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

await syncContributionsWithGithub(username, token, oneYearAgo, lastSync);
try {
  setTimeout(
    async () => { await syncContributionsWithGithub(username, token, lastSync, new Date()) }, 
    DEFAULT_SYNC_TIME_IN_MILLISECONDS
  );
} catch ({ name, message }) {
    console.log(`Error: ${name}, Message: ${message}`);
};

// Setup:
    // Get all contribution data - call getContributions
    // Calculate base score - call calculateScore
    // Create monster - call Monster constructor with score data

    // syncContributionsWithGithub(900) --> number of minutes in seconds. Default is 15 mins
// Update:
    // ping github every 15 minutes
    // recalculate new base score
    // Update monster aka "set monster"
    
