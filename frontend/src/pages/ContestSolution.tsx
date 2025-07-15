import UseGetContestById from "@/hooks/useGetContestById";
import QuestionsList from "@/components/common/QuestionsList";
import { useParams } from "react-router-dom";

export default function ContestSolution() {
  const { contestId } = useParams();
  const { contest, loading, error }: any = UseGetContestById(contestId || "");

  return (
    <div className="min-h-screen bg-[#141414] px-4 pb-16 flex flex-col items-center text-white">
      <header className="w-full max-w-3xl text-left pt-16 pb-6">
        <h1 className="text-3xl font-bold text-[#ffa116] mb-2">
          Weekly Contest {contestId} – Solutions
        </h1>
        <p className="text-[#d0d7de]">
          Browse questions from the contest. Click on a question to view or
          generate the solution.
        </p>
      </header>

      {error && <p className="text-red-500 text-sm mb-4">Error: {error}</p>}
      {!loading && !error && (
        <QuestionsList contestData={contest} loading={loading} />
      )}
      {!loading && contest && contest?.length === 0 && !error && (
        <p className="mt-12 text-[#d0d7de]">
          No questions found for this contest.
        </p>
      )}
    </div>
  );
}
