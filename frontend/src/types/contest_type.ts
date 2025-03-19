export interface ContestType {
  id: string;
  title: string;
  type: "Codeforces" | "CodeChef" | "LeetCode";
  link: string;
  start_date: Date;
  end_date: Date;
  duration: number;
  relativeTime: number;
  video_solution?: string;
  status: "upcoming" | "past";
}

