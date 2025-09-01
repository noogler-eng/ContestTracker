import useMyContests from "@/hooks/useMyContests";
import { useState, useEffect } from "react";
import ContestCard from "@/components/common/ContestCard";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import NoData from "@/components/common/NoData";
import { Button } from "@/components/ui/button";
import { ContestType } from "@/types/contest_type";

export default function Bookmarks() {
  const [page, setPage] = useState(0);

  const { bookmarks, refresh, loading, error }: any = useMyContests({
    pageNumber: page,
  });

  useEffect(() => {
    setPage(0);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-[#121212] text-red-500 flex justify-center items-center text-xl">
        Failed to load bookmarks. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200">
      <div className="max-w-6xl mx-auto p-6 pt-10">
        {/* Title */}
        <div className="flex items-center justify-center mb-10">
          <h1 className="text-4xl font-bold text-white tracking-wide">
            My <span className="text-[#FFA116]">Bookmarks</span>
          </h1>
        </div>

        {/* Loading state */}
        {loading ? (
          <LoadingSkeleton />
        ) : Array.isArray(bookmarks) && bookmarks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {bookmarks.map((contest: ContestType) => (
              <ContestCard key={contest.id} contest={contest} refresh={refresh}/>
            ))}
          </div>
        ) : (
          <NoData message="No bookmarked contests found." />
        )}

        {/* Pagination */}
        {Array.isArray(bookmarks) && bookmarks.length > 0 && (
          <div className="flex justify-center items-center mt-10 gap-4">
            <Button
              type="button"
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0 || loading}
              className="border border-[#3E3E3E] bg-[#1A1A1A] text-gray-300 hover:bg-[#2A2A2A] hover:text-white disabled:opacity-50 rounded-lg px-5 py-2 shadow-md"
            >
              Previous
            </Button>

            <span className="flex items-center justify-center px-5 py-2 bg-[#1A1A1A] border border-[#3E3E3E] rounded-lg text-sm shadow-sm text-gray-300">
              Page {page + 1}
            </span>

            <Button
              type="button"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={loading}
              className="border border-[#3E3E3E] bg-[#1A1A1A] text-gray-300 hover:bg-[#2A2A2A] hover:text-white disabled:opacity-50 rounded-lg px-5 py-2 shadow-md"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
