import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

import { initializeDB } from "./database.ts";
import { syncContributionsWithGithub } from "./syncWithGithub.ts";

const env = await load();
const db = await initializeDB();
const token = env["TOKEN"];
const username = env["USERNAME"];

const TWENTY_SECONDS = 20000;
const DEFAULT_SYNC_TIME_IN_MILLISECONDS = TWENTY_SECONDS;
const lastSync = new Date(Date.now() - 30 * 24 * 60 * 60  * 1000); // thirty days ago
const startDate = new Date();
startDate.setFullYear(startDate.getFullYear() - 1); // one year ago from today

const recursiveSync = async (username: string, token: string, start: Date, end: Date) => {
  const stop = false;
  try {
    const results = await syncContributionsWithGithub(username, token, start, end);
    console.log(results);
  } catch ({name, message}) {
    console.log(`Error: ${name}, Message ${message}`);
  }
  if(stop) {
    console.log("condition met... stopping api calls. This should probably be triggered via a pause or exit. Might not need it.");
  } else {
    setTimeout(() => recursiveSync(username, token, start, end), DEFAULT_SYNC_TIME_IN_MILLISECONDS);
  }
};

recursiveSync(username, token, startDate, lastSync);

db.close();

// Setup:
    // Get all contribution data - call getContributions
    // Calculate base score - call calculateScore
    // Create monster - call Monster constructor with score data

    // syncContributionsWithGithub(900) --> number of minutes in seconds. Default is 15 mins
// Update:
    // ping github every 15 minutes
    // recalculate new base score
    // Update monster aka "set monster"
    
