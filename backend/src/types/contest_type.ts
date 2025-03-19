type ContestPlatform = "Codeforces" | "LeetCode" | "CodeChef";

type ContestType = {
  id: string;
  title: string;
  type: ContestPlatform;
  link: string;
  start_date: Date;
  end_date: Date;
  duration: number;
  relativeTime: number;
  videoSolution?: string;
};

export default ContestType
