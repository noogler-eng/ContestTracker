"use client";

import type React from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bookmark,
  Calendar,
  Clock,
  ExternalLink,
  Youtube,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import user from "@/store/user_atom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { ContestType } from "@/types/contest_type";
import { Link } from "react-router-dom";

const platformGradients: Record<string, string> = {
  LeetCode: "from-[#1A1A1A] via-[#2D2D2D] to-[#FFA116]",
  Codeforces: "from-[#1A1A1A] via-[#2D2D2D] to-[#1F8ACB]",
  CodeChef: "from-[#1A1A1A] via-[#2D2D2D] to-[#5C2C06]",
};

export default function ContestCard({ contest }: { contest: ContestType }) {
  const curr_user = useRecoilValue(user);
  const [open, setOpen] = useState(false);
  const [videoLink, setVideoLink] = useState("");

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    await axios.post(
      `${import.meta.env.VITE_PROD_BACKEND_URL}/user/bookmarks`,
      { contestData: contest },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    alert(`Bookmarked ${contest.title}`);
  };

  const handleSaveLink = async () => {
    await axios.post(
      `${import.meta.env.VITE_PROD_BACKEND_URL}/contests/upload_solution`,
      { contestId: contest.id, videoSolution: videoLink },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    alert("Video Solution Link Saved");
    setOpen(false);
  };

  return (
    <>
      <Card
        className={`bg-gradient-to-br ${
          platformGradients[contest.type] ||
          "from-[#1A1A1A] via-[#2D2D2D] to-[#444]"
        } border border-[#2A2A2A] hover:scale-[1.02] transition-transform duration-300 rounded-2xl shadow-lg relative overflow-hidden`}
      >
        {/* Background Contest Number */}
        <div className="absolute top-0 right-0 text-[120px] font-bold text-white/5 leading-none pointer-events-none select-none">
          {String(contest.id).replace(/\D/g, "")}
        </div>

        <CardContent className="p-6 space-y-5 text-white relative z-10 flex flex-col">
          {/* Title + Link */}
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-semibold leading-tight">
              {contest.title}
            </h3>
            <a
              href={contest.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:cursor-pointer"
            >
              <ExternalLink className="w-5 h-5 text-gray-300 hover:text-white" />
            </a>
          </div>

          {/* Platform Badge */}
          <Badge className="w-fit bg-black/40 border border-[#3E3E3E] rounded-lg text-sm px-3 py-1">
            {contest.type}
          </Badge>

          {/* Date & Duration */}
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{new Date(contest.start_date).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-gray-400" />
              {contest.duration >= 1440 ? (
                <span>{(contest.duration / 1440).toFixed(1)} days</span>
              ) : (
                <span>{(contest.duration / 60).toFixed(1)} hrs</span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            {/* Past Contest AI Written Solution */}
            {contest.type === "LeetCode" &&
              new Date(contest.start_date) < new Date() && (
                <Button
                  asChild
                  className="px-4 py-2 rounded-full text-sm font-medium
                  bg-[#1F1F1F] border border-[#333] text-gray-200
                  hover:bg-[#2A2A2A] hover:shadow-[0_0_12px_rgba(34,197,94,0.3)]
                  transition-all duration-300 flex items-center gap-2"
                >
                  <Link to={`/solution/${contest.id}`}>
                    <FileText className="w-4 h-4 text-green-400" />
                    <span>AI Solution</span>
                  </Link>
                </Button>
              )}

            {/* Video Solution */}
            {contest.video_solution ? (
              <Button
                asChild
                className="px-4 py-2 rounded-full text-sm font-medium
                bg-[#1F1F1F] border border-[#333] text-gray-200
                hover:bg-[#2A2A2A] hover:shadow-[0_0_12px_rgba(239,68,68,0.35)]
                transition-all duration-300 flex items-center gap-2"
              >
                <a
                  href={contest.video_solution}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span>Watch Solution</span>
                </a>
              </Button>
            ) : (
              curr_user.isAdmin && (
                <Button
                  onClick={() => setOpen(true)}
                  className="px-4 py-2 rounded-full text-sm font-medium
                  bg-[#1F1F1F] border border-[#333] text-gray-200
                  hover:bg-[#2A2A2A] hover:shadow-[0_0_12px_rgba(37,99,235,0.35)]
                  transition-all duration-300 flex items-center gap-2"
                >
                  ➕ Add Solution
                </Button>
              )
            )}

            {/* Bookmark */}
            {curr_user.email && (
              <Button
                onClick={handleBookmark}
                className="px-4 py-2 rounded-full text-sm font-medium
                bg-[#1F1F1F] border border-[#333] text-gray-200
                hover:bg-[#2A2A2A] hover:shadow-[0_0_12px_rgba(234,179,8,0.35)]
                transition-all duration-300 flex items-center gap-2"
              >
                <Bookmark className="w-4 h-4 text-yellow-400" />
                <span>Bookmark</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Solution Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#1A1A1A] border border-[#333] text-white rounded-xl">
          <DialogHeader>
            <DialogTitle>Add Video Solution Link</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Paste YouTube link..."
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="bg-[#2A2A2A] text-white border border-[#444]"
          />
          <DialogFooter>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              onClick={handleSaveLink}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
