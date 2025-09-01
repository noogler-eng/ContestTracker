import { motion } from "framer-motion";
import UseGetContestById from "@/hooks/useGetContestById";
import QuestionsList from "@/components/common/QuestionsList";
import { useParams } from "react-router-dom";
import Loading from "@/components/common/Loading";
import { AlertCircle, Trophy } from "lucide-react";

export default function ContestSolution() {
  const { contestId } = useParams();
  const { contest, loading, error }: any = UseGetContestById(contestId || "");

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#141414] px-4 pb-20 flex flex-col items-center text-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl text-left pt-16 pb-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="w-8 h-8 text-[#ffa116]" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#ffa116]">
            Weekly Contest {contestId}
          </h1>
        </div>
        <p className="text-gray-400 text-base sm:text-lg">
          Browse questions from this contest. Click on a question to explore
          detailed solutions or generate your own.
        </p>
      </motion.header>

      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 bg-red-900/30 border border-red-600 text-red-400 px-4 py-3 rounded-xl mb-6"
        >
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">Error: {error}</p>
        </motion.div>
      )}

      {/* Questions list */}
      {!loading && !error && contest && contest.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          <QuestionsList contestData={contest} loading={loading} />
        </motion.div>
      )}

      {/* Empty state */}
      {!loading && contest && contest.length === 0 && !error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-16 text-gray-400 text-center text-lg"
        >
          No questions found for this contest. 🎯
        </motion.p>
      )}
    </div>
  );
}
