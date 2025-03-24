import contest_solution from "../models/contest_solution";
import cron from "node-cron";
import axios from "axios";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API!;
const CHANNEL_ID = "UCqL-fzHtN3NQPbYqGymMbTA";
const MAX_RESULTS = 20;

export const startYouTubeCron = () => {
  cron.schedule("0 * * * *", async () => {
    console.log("⏰ Cron Job Running: Checking for new YouTube videos...");

    try {
      const cfResponse = await axios.get(
        "https://codeforces.com/api/contest.list"
      );
      const cfContests = cfResponse.data.result;

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

        const cfEduMatch = videoTitle.match(
          /Educational Codeforces Round (\d+)/i
        );
        const cfNormalMatch = videoTitle.match(/Codeforces Round (\d+)/i);

        if (cfEduMatch) {
          const roundNumber = cfEduMatch[1];
          const matchedContest = cfContests.find(
            (c: any) =>
              c.name.includes(`Educational Codeforces Round ${roundNumber}`) &&
              c.phase === "FINISHED"
          );
          if (matchedContest) contestId = `${matchedContest.id}`;
        } else if (cfNormalMatch) {
          const roundNumber = cfNormalMatch[1];
          const matchedContest = cfContests.find(
            (c: any) =>
              c.name.includes(`Codeforces Round ${roundNumber}`) &&
              c.phase === "FINISHED"
          );
          if (matchedContest) contestId = `${matchedContest.id}`;
        }

        const leetcodeMatch = videoTitle.match(
          /Leetcode (Weekly|Biweekly) Contest (\d+)/i
        );
        if (leetcodeMatch) {
          contestId =
            leetcodeMatch[1].toLowerCase() === "weekly"
              ? `weekly-contest-${leetcodeMatch[2]}`
              : `biweekly-contest-${leetcodeMatch[2]}`;
        }

        const codechefMatch = videoTitle.match(/Codechef Starters (\d+)/i);
        if (codechefMatch) contestId = `START${codechefMatch[1]}`;

        console.log({ videoTitle, videoLink, contestId: contestId || "N/A" });

        if (contestId) {
          const contest = await contest_solution.findOne({ contestId });
          if (contest) {
            console.log(`Contest solution already exists: ${videoTitle}`);
          } else {
            await contest_solution.create({
              contestId,
              video_solution: videoLink,
            });
            console.log(`Contest solution added: ${videoTitle}`);
          }
        }
      }
    } catch (err: any) {
      console.error("Error in YouTube cron job:", err);
    }
  });
};

export default startYouTubeCron;
