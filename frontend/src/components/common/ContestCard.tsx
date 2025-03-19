import { Card, CardContent } from "@/components/ui/card";
import { ContestType } from "@/types/contest_type";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Calendar, Clock, ExternalLink } from "lucide-react";
import getPlatformColor from "@/utils/platform_color";
import formatDuration from "@/utils/format_time";
import { Button } from "../ui/button";
import { useRecoilValue } from "recoil";
import user from "@/store/user_atom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";

const platformLogos: Record<string, string> = {
  LeetCode:
    "https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png",
  Codeforces:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIOg7Ka0OJCYuThvywcsaUAIoyhy0dtpexTg&s",
  CodeChef: "https://cdn.codechef.com/sites/all/themes/abessive/cc-logo.png",
};

export default function ContestCard({ contest }: { contest: ContestType }) {
  const curr_user = useRecoilValue(user);
  const [open, setOpen] = useState(false);
  const [videoLink, setVideoLink] = useState("");

  const handleAddSolution = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleBookmark = (e: React.MouseEvent, contest: ContestType) => {
    e.preventDefault();
    alert(`Bookmarked ${contest.title}`);
    axios.post(
      "http://localhost:4000/user/bookmarks",
      {
        contestData: {
          id: contest.id,
          title: contest.title,
          type: contest.type,
          link: contest.link,
          start_date: contest.start_date,
          end_date: contest.end_date,
          duration: contest.duration,
          relativeTime: contest.relativeTime,
          status: contest.status,
          video_solution: contest.video_solution,
        },
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  };

  const handleSaveLink = (contestId: string) => {
    if (!localStorage.getItem("token")) return;
    alert(`Video Solution Link Saved: ${videoLink}`);
    axios.post(
      "http://localhost:4000/contests/upload_solution",
      {
        contestId,
        videoSolution: videoLink,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setOpen(false);
  };

  return (
    <>
      <Card
        key={contest.id}
        className="bg-[#1A1A1A] border-[#3E3E3E] hover:border-[#FFA116] transition-all duration-200 overflow-hidden group"
      >
        <CardContent className="p-0">
          <a
            href={contest.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row items-start gap-4 p-4"
          >
            {/* Logo */}
            <div className="flex-shrink-0 w-16 h-16 bg-[#2A2A2A] rounded-md flex items-center justify-center overflow-hidden">
              {platformLogos[contest.type] ? (
                <img
                  src={platformLogos[contest.type] || "/placeholder.svg"}
                  alt={contest.type}
                  className="w-12 h-12 object-contain"
                />
              ) : (
                <div className="text-2xl font-bold text-[#FFA116]">
                  {contest.type.substring(0, 2)}
                </div>
              )}
            </div>

            {/* Contest Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-medium text-white group-hover:text-[#FFA116] transition-colors">
                  {contest.title}
                </h3>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#FFA116] transition-colors" />
              </div>

              <Badge className={`mt-2 ${getPlatformColor(contest.type)}`}>
                {contest.type}
              </Badge>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(contest.start_date).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(contest.duration)}</span>
                </div>
              </div>

              {/* Conditional Buttons */}
              <div className="mt-4 flex gap-3 flex-wrap">
                {contest.video_solution ? (
                  <Button
                    asChild
                    className="bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                  >
                    <a
                      href={contest.video_solution}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📺 Watch Solution
                    </a>
                  </Button>
                ) : (
                  curr_user.isAdmin && (
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      size="sm"
                      onClick={handleAddSolution}
                    >
                      ➕ Add Solution
                    </Button>
                  )
                )}

                {/* Bookmark if logged in */}
                {curr_user.email && (
                  <Button
                    className="bg-yellow-600 hover:bg-yellow-700 text-white flex items-center gap-2"
                    size="sm"
                    onClick={(e) => handleBookmark(e, contest)}
                  >
                    <Bookmark className="w-4 h-4" />
                    Bookmark
                  </Button>
                )}
              </div>
            </div>
          </a>
        </CardContent>
      </Card>

      {/* Dialog for Adding Video Solution */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Video Solution Link</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter video solution link"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
          />
          <DialogFooter>
            <Button
              onClick={() => handleSaveLink(contest.id)}
              className="bg-blue-600 text-white"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
