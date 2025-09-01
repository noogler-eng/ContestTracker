import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import generateSolution from "@/utils/gemini_solution";
import { motion, AnimatePresence } from "framer-motion";
//@ts-ignore
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
//@ts-ignore
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ContestQuestion } from "@/types/contest_question";

export default function QuestionsList({ contestData, loading }: any) {
  const contest: ContestQuestion[] = useMemo(() => {
    if (!Array.isArray(contestData)) return [];
    return contestData.filter((q): q is ContestQuestion => !!q?.questionId);
  }, [contestData]);

  const [openSolutions, setOpenSolutions] = useState<Record<string, boolean>>(
    {}
  );
  const [solutionMap, setSolutionMap] = useState<Record<string, string>>({});
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const toggleSolution = (id: string) => {
    setOpenSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const getDifficultyBadge = (level?: string) => {
    if (!level) return null;
    const colors: Record<string, string> = {
      Easy: "bg-green-600/30 text-green-400",
      Medium: "bg-yellow-600/30 text-yellow-400",
      Hard: "bg-red-600/30 text-red-400",
    };
    return (
      <span
        className={`text-xs px-2 py-1 rounded-full font-medium ${
          colors[level] || "bg-gray-600/30 text-gray-400"
        }`}
      >
        {level}
      </span>
    );
  };

  return (
    <section className="w-full max-w-4xl space-y-6">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-lg bg-[#1e1e1e]" />
          ))
        : contest.map((q) => {
            const isOpen = openSolutions[q.questionId];
            const solution = solutionMap[q.questionId];
            const isGenerating = loadingMap[q.questionId];
            const cleanSolution = solution
              ? solution.replace(/```cpp|```/g, "").trim()
              : "";

            return (
              <motion.div
                key={q.questionId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-[#1e1e1e] border border-[#323232] rounded-xl shadow-md hover:shadow-lg transition">
                  {/* Header */}
                  <CardHeader
                    onClick={() => toggleSolution(q.questionId)}
                    className="cursor-pointer flex justify-between items-center px-4 py-3 hover:bg-[#2a2a2a] transition"
                  >
                    <div className="flex flex-col">
                      <CardTitle className="text-lg text-[#ffa116] font-semibold">
                        {q.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        {getDifficultyBadge(
                          q.credit <= 3
                            ? "Easy"
                            : q.credit < 6
                            ? "Medium"
                            : "Hard"
                        )}
                        {isOpen && q.topicTags?.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {q.topicTags.map((tag) => (
                              <span
                                key={tag.slug}
                                className="text-xs bg-[#30363d] text-gray-200 px-2 py-0.5 rounded-full"
                              >
                                {tag.translatedName || tag.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="text-gray-400 w-5 h-5" />
                    ) : (
                      <ChevronDown className="text-gray-400 w-5 h-5" />
                    )}
                  </CardHeader>

                  {/* Collapsible Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="px-4 pb-4 pt-2 text-sm text-[#d0d7de] space-y-4">
                          {/* Problem Link + Action */}
                          <div className="flex justify-between items-center flex-wrap gap-3">
                            <span>
                              <strong>Problem Link:</strong>{" "}
                              <a
                                href={`https://leetcode.com/problems/${q.titleSlug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#2f81f7] hover:underline"
                              >
                                {q.titleSlug}
                              </a>
                            </span>
                            <Button
                              size="sm"
                              variant="secondary"
                              disabled={isGenerating}
                              onClick={() =>
                                generateSolution(
                                  q,
                                  loadingMap,
                                  setSolutionMap,
                                  setLoadingMap
                                )
                              }
                              className="flex items-center gap-2"
                            >
                              {isGenerating && (
                                <Loader2 className="animate-spin h-4 w-4" />
                              )}
                              {solution ? "Regenerate" : "Generate"}
                            </Button>
                          </div>

                          {/* Solution */}
                          {solution ? (
                            <div className="relative">
                              <SyntaxHighlighter
                                language="cpp"
                                style={atomOneDark}
                                customStyle={{
                                  backgroundColor: "#0d1117",
                                  borderRadius: "0.75rem",
                                  padding: "1rem",
                                  fontSize: "0.875rem",
                                  lineHeight: "1.5",
                                }}
                              >
                                {cleanSolution}
                              </SyntaxHighlighter>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleCopy(q.questionId, cleanSolution)
                                }
                                className="absolute top-2 right-2 flex items-center gap-1 text-xs text-gray-400 hover:text-white"
                              >
                                {copied === q.questionId ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                                {copied === q.questionId ? "Copied" : "Copy"}
                              </Button>
                            </div>
                          ) : (
                            <div className="bg-[#141414] border border-[#323232] p-4 rounded-lg text-[#6e7681] italic">
                              {isGenerating
                                ? "Generating solution..."
                                : "Solution not generated yet."}
                            </div>
                          )}
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
    </section>
  );
}
