import useMyContests from "@/hooks/useMyContests";
import { useState, useEffect } from "react";
import ContestCard from "@/components/common/ContestCard";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import NoData from "@/components/common/NoData";
import { Button } from "@/components/ui/button";
import { ContestType } from "@/types/contest_type";

export default function Bookmarks() {
  const [page, setPage] = useState(0);

  const { bookmarks, loading, error }: any = useMyContests({
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
      <div className="max-w-6xl mx-auto p-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            My <span className="text-[#FFA116]">Bookmarks</span>
          </h1>
        </div>

        {/* Loading state */}
        {loading ? (
          <LoadingSkeleton />
        ) : Array.isArray(bookmarks) && bookmarks.length > 0 ? (
          <div className="grid gap-4">
            {bookmarks.map((contest: ContestType) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        ) : (
          <NoData message="No bookmarked contests found." />
        )}

        {/* Pagination */}
        {Array.isArray(bookmarks) && bookmarks.length > 0 && (
          <div className="flex justify-center mt-6 gap-2">
            <Button
              type="button"
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0 || loading}
              variant="outline"
              size="sm"
              className="border-[#3E3E3E] text-gray-300 hover:bg-[#2A2A2A] hover:text-white disabled:opacity-50"
            >
              Previous
            </Button>

            <span className="flex items-center justify-center px-4 py-2 bg-[#1A1A1A] border border-[#3E3E3E] rounded-md text-sm">
              Page {page + 1}
            </span>

            <Button
              type="button"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={loading}
              variant="outline"
              size="sm"
              className="border-[#3E3E3E] text-gray-300 hover:bg-[#2A2A2A] hover:text-white disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
