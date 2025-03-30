import ContestCard from "@/components/common/ContestCard";
import usePastContests from "@/hooks/usePastContests";
import useUpcommingContests from "@/hooks/UseUpcommingContests";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import NoData from "@/components/common/NoData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { ContestType } from "@/types/contest_type";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const platforms = ["LeetCode", "Codeforces", "CodeChef"];

export default function HomePage() {
  const [page, setPage] = useState<number>(0);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("upcoming");

  const {
    upcomingContests,
    loading: upLoading,
    error: upErr,
  } = useUpcommingContests();

  const {
    pastContests,
    loading: paLoading,
    error: paErr,
  } = usePastContests({ pageNumber: page });

  useEffect(() => {
    setPage(0);
  }, [selectedFilters, activeTab]);

  const handleFilterChange = (platform: string) => {
    setSelectedFilters((prev) =>
      prev.includes(platform)
        ? prev.filter((item) => item !== platform)
        : [...prev, platform]
    );
  };

  const filterContests = (contests: ContestType[] | null | undefined) => {
    if (!contests) return [];
    if (selectedFilters.length === 0) return contests;
    return contests.filter((contest) => selectedFilters.includes(contest.type));
  };

  const filteredUpcoming = filterContests(upcomingContests);
  const filteredPast = filterContests(pastContests);

  if (upErr || paErr) {
    return (
      <div className="min-h-screen bg-[#121212] text-red-500 flex justify-center items-center text-xl">
        Failed to load contests. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200">
      <div className="max-w-6xl mx-auto p-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            <span className="text-[#FFA116]">Contest</span> Tracker
          </h1>
        </div>

        {/* Multi-select Filter */}
        <div className="mb-8 bg-[#1A1A1A] p-4 rounded-lg border border-[#3E3E3E]">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-[#FFA116]" />
            <h2 className="text-lg font-medium text-white">Filter Platforms</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <Button
                type="button"
                key={platform}
                variant={
                  selectedFilters.includes(platform) ? "default" : "outline"
                }
                onClick={() => handleFilterChange(platform)}
                className={
                  selectedFilters.includes(platform)
                    ? "bg-[#FFA116] text-black hover:bg-[#FFB84D] hover:text-black"
                    : "border-[#3E3E3E] text-gray-500 hover:bg-[#2A2A2A] hover:text-white"
                }
                size="sm"
              >
                {platform}
              </Button>
            ))}
          </div>
          <p className="text-sm mt-2 text-gray-400">
            * You can select multiple platforms
          </p>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="upcoming"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <TabsList className="bg-[#1A1A1A] border border-[#3E3E3E]">
            <TabsTrigger
              value="upcoming"
              className="text-white data-[state=active]:bg-[#FFA116] data-[state=active]:text-black"
            >
              Upcoming Contests
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="text-white data-[state=active]:bg-[#FFA116] data-[state=active]:text-black"
            >
              Past Contests
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Contests */}
          <TabsContent value="upcoming" className="mt-4">
            {upLoading ? (
              <LoadingSkeleton />
            ) : filteredUpcoming.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredUpcoming.map((contest: ContestType) => (
                  <ContestCard key={contest.id} contest={contest} />
                ))}
              </div>
            ) : (
              <NoData message="No upcoming contests found." />
            )}
          </TabsContent>

          {/* Past Contests */}
          <TabsContent value="past" className="mt-4">
            {paLoading ? (
              <LoadingSkeleton />
            ) : filteredPast.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredPast.map((contest: ContestType) => (
                  <ContestCard key={contest.id} contest={contest} />
                ))}
              </div>
            ) : (
              <NoData message="No past contests found." />
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-4">
              <Button
                type="button"
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                disabled={page === 0 || paLoading}
                variant="outline"
                size="sm"
                className="border border-[#3E3E3E] bg-[#1A1A1A] text-gray-300 
               hover:bg-[#2A2A2A] hover:text-white 
               disabled:opacity-50 disabled:cursor-not-allowed 
               rounded-lg px-6 py-3 transition-all duration-300"
              >
                Previous
              </Button>

              <span
                className="flex items-center justify-center px-6 py-1 
                  bg-gradient-to-br from-[#1F1F1F] via-[#2D2D2D] to-[#3A3A3A] 
                  border border-[#3E3E3E] rounded-lg 
                  text-gray-300 text-sm shadow-inner"
              >
                Page{" "}
                <span className="ml-2 text-white font-semibold">
                  {page + 1}
                </span>
              </span>

              <Button
                type="button"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={paLoading}
                variant="outline"
                size="sm"
                className="border border-[#3E3E3E] bg-[#1A1A1A] text-gray-300 
               hover:bg-[#2A2A2A] hover:text-white 
               disabled:opacity-50 disabled:cursor-not-allowed 
               rounded-lg px-6 py-3 transition-all duration-300"
              >
                Next
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
