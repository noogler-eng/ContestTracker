import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import generateSolution from "@/utils/gemini_solution";
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

  const toggleSolution = (id: string) => {
    setOpenSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full max-w-3xl space-y-6">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-lg bg-[#1e1e1e]" />
          ))
        : contest.map((q) => {
            const isOpen = openSolutions[q.questionId];
            const solution = solutionMap[q.questionId];
            const isGenerating = loadingMap[q.questionId];
            return (
              <Card
                key={q.questionId}
                className="bg-[#1e1e1e] border border-[#323232] rounded-lg overflow-hidden"
              >
                <CardHeader
                  onClick={() => toggleSolution(q.questionId)}
                  className="cursor-pointer flex justify-between items-center px-4 py-3 hover:bg-[#2a2a2a]"
                >
                  <div className="w-full">
                    <CardTitle className="text-lg text-[#ffa116] font-semibold">
                      {q.title}
                    </CardTitle>
                    {isOpen && q.topicTags?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {q.topicTags.map((tag) => (
                          <span
                            key={tag.slug}
                            className="text-xs bg-[#30363d] text-white px-2 py-1 rounded-full"
                          >
                            {tag.translatedName || tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {isOpen ? (
                    <ChevronUp className="text-gray-400 w-5 h-5" />
                  ) : (
                    <ChevronDown className="text-gray-400 w-5 h-5" />
                  )}
                </CardHeader>

                {isOpen && (
                  <CardContent className="px-4 pb-4 pt-2 text-sm text-[#d0d7de] space-y-4">
                    <div className="flex justify-between items-center">
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

                    {solution ? (
                      <SyntaxHighlighter
                        language="cpp"
                        style={atomOneDark}
                        customStyle={{
                          backgroundColor: "#0d1117",
                          borderRadius: "0.5rem",
                          padding: "1rem",
                          fontSize: "0.875rem",
                          lineHeight: "1.5",
                        }}
                      >
                        {solution.replace(/```cpp|```/g, "").trim()}
                      </SyntaxHighlighter>
                    ) : (
                      <div className="bg-[#141414] border border-[#323232] p-4 rounded text-[#6e7681] italic">
                        {isGenerating
                          ? "Generating solution..."
                          : "Solution not generated yet."}
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            );
          })}
    </section>
  );
}
