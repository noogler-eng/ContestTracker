import axios from "axios";
import contest_solution from "../models/contest_solution";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API!;
const CHANNEL_ID = "UCqL-fzHtN3NQPbYqGymMbTA";
const MAX_RESULTS = 10;

export const checkYouTubeSolutions = async () => {
  console.log("Running YouTube check manually...");

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI || "");
  }

  try {
    // Fetch Codeforces contests to map Round Number → Contest ID
    const cfResponse = await axios.get(
      "https://codeforces.com/api/contest.list"
    );
    const cfContests = cfResponse.data.result;

    // Fetch latest YouTube videos
    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: "snippet",
          channelId: CHANNEL_ID,
          maxResults: MAX_RESULTS,
          order: "date",
          type: "video",
          key: YOUTUBE_API_KEY,
        },
      }
    );

    const videos = data.items;

    for (const video of videos) {
      const videoTitle: string = video.snippet.title;
      const videoId: string = video.id.videoId;
      const videoLink = `https://www.youtube.com/watch?v=${videoId}`;

      let contestId = "";

      // Handle Codeforces Educational or Regular Rounds
      const cfEduMatch = videoTitle.match(
        /Educational Codeforces Round (\d+)/i
      );
      const cfNormalMatch = videoTitle.match(/Codeforces Round (\d+)/i);

      if (cfEduMatch) {
        const roundNumber = cfEduMatch[1];
        // Match any CF contest that contains this Educational round number
        const matchedContest = cfContests.find(
          (c: any) =>
            c.name.includes(`Educational Codeforces Round ${roundNumber}`) &&
            c.phase === "FINISHED"
        );
        if (matchedContest) {
          contestId = `${matchedContest.id}`;
        }
      } else if (cfNormalMatch) {
        const roundNumber = cfNormalMatch[1];
        // Match any CF contest that contains this normal round number
        const matchedContest = cfContests.find(
          (c: any) =>
            c.name.includes(`Codeforces Round ${roundNumber}`) &&
            c.phase === "FINISHED"
        );
        if (matchedContest) {
          contestId = `${matchedContest.id}`;
        }
      }

      // Handle LeetCode
      const leetcodeMatch = videoTitle.match(
        /Leetcode (Weekly|Biweekly) Contest (\d+)/i
      );
      if (leetcodeMatch) {
        contestId =
          leetcodeMatch[1].toLowerCase() === "weekly"
            ? `weekly-contest-${leetcodeMatch[2]}`
            : `biweekly-contest-${leetcodeMatch[2]}`;
      }

      // Handle CodeChef
      const codechefMatch = videoTitle.match(/Codechef Starters (\d+)/i);
      if (codechefMatch) {
        contestId = `START${codechefMatch[1]}`;
      }

      console.log({
        videoTitle,
        videoLink,
        contestId: contestId || "N/A (No match found)",
      });

      // If contestId found, store it in DB
      if (contestId) {
        const contest = await contest_solution.findOne({ contestId });
        if (contest) {
          console.log(`Contest solution already exists for: ${contestId}`);
        } else {
          await contest_solution.create({
            contestId,
            video_solution: videoLink,
          });
          console.log(`Contest solution added for: ${contestId}`);
        }
      }
    }

    process.exit(0);
  } catch (err) {
    console.error("Error checking YouTube videos:", err);
    process.exit(1);
  }
};

// Run the YouTube checker
checkYouTubeSolutions();
