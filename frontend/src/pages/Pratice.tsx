"use client";

import UseGetSheet from "@/hooks/useGetSheet";
import { SheetTopic, Topic } from "@/types/sheet_type";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Search,
  ChevronRight,
  Hash,
  ExternalLink,
  ListChecks,
  AlertTriangle,
  Filter,
  Layers,
} from "lucide-react";

// ----- Data Options -----
const limitOptions = [5, 10, 20, 50, 100];
const sheets = [
  "Striver_A2Z_Sheet",
  "Love_Babbar_Sheet",
  "NeetCode_150",
  "Blind_75",
];
const tagOptions = [
  "array",
  "string",
  "linkedlist",
  "binary search",
  "dynamic programming",
  "greedy",
  "binary tree",
  "binary search tree",
  "tree",
  "graph",
  "bit manipulation",
  "hashing",
  "Recursion",
  "backtracking",
  "dp",
  "stack",
  "queue",
  "heaps",
  "priority queue",
  "stack and queue",
  "heap and priority queue",
  "trie",
  "bit",
  "hashmap",
];

// ----- Small UI helpers -----
const spring = { type: "spring", stiffness: 260, damping: 20 } as const;

function TagChip({
  tag,
  selected,
  onToggle,
}: {
  tag: string;
  selected: boolean;
  onToggle: (tag: string) => void;
}) {
  return (
    <motion.button
      layout
      transition={spring}
      onClick={() => onToggle(tag)}
      className={`px-3 py-1 rounded-full text-xs md:text-sm border backdrop-blur-sm transition shadow-sm hover:shadow ${
        selected
          ? "border-amber-500/80 bg-amber-500/10 text-amber-300"
          : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
      }`}
    >
      <div className="flex items-center gap-1.5">
        <Hash className="h-3.5 w-3.5" />
        <span className="capitalize">{tag}</span>
      </div>
    </motion.button>
  );
}

function SkeletonCard() {
  return (
    <Card className="bg-gradient-to-b from-zinc-900/60 to-zinc-900/20 border-white/10">
      <CardContent className="p-5 animate-pulse space-y-3">
        <div className="h-5 w-2/3 rounded bg-white/10" />
        <div className="h-4 w-full rounded bg-white/10" />
        <div className="h-4 w-5/6 rounded bg-white/10" />
        <div className="flex gap-3 pt-2">
          <div className="h-7 w-24 rounded bg-white/10" />
          <div className="h-7 w-20 rounded bg-white/10" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Practice() {
  const [sheetName, setSheetName] = useState<string>("Striver_A2Z_Sheet");
  const [limit, setLimit] = useState<number>(50);
  const [tags, setTags] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");

  const { sheetData, loading, error } = UseGetSheet(
    sheetName,
    limit,
    tags
  ) as unknown as {
    sheetData: Topic[] | SheetTopic[] | null;
    loading: boolean;
    error: string | null;
  };

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredData = useMemo(() => {
    if (!sheetData) return [] as (Topic | SheetTopic)[];
    const q = query.trim().toLowerCase();
    return sheetData.filter((item) => {
      const title = "step_title" in item ? item.question_title : item.title;
      return q ? title.toLowerCase().includes(q) : true;
    });
  }, [sheetData, query]);

  console.log("sharad", filteredData, sheetData);

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen bg-[#0B0B0C] text-white">
        {/* Top Gradient Glow */}
        <div className="pointer-events-none fixed inset-x-0 top-0 h-48 bg-[radial-gradient(600px_200px_at_50%_-40px,rgba(254,215,170,0.25),transparent_60%)]" />

        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden lg:block w-[300px] sticky top-0 h-screen p-6 border-r border-white/10 bg-black/30 backdrop-blur-xl">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-amber-400 flex items-center gap-2">
                  <Filter className="h-5 w-5" /> Filters
                </h2>
                <p className="text-xs text-white/60 mt-1">
                  Tune your practice set.
                </p>
              </div>

              {/* Sheets */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-white/80">Sheets</h3>
                <ScrollArea className="h-[160px] pr-2">
                  <div className="grid gap-2 mt-1">
                    {sheets.map((sheet) => (
                      <motion.div key={sheet} layout transition={spring}>
                        <Button
                          variant={
                            sheet === sheetName ? "secondary" : "outline"
                          }
                          onClick={() => setSheetName(sheet)}
                          className={`w-full justify-between rounded-xl border-white/10 ${
                            sheet === sheetName
                              ? "bg-amber-500/10 text-amber-300"
                              : "bg-white/5 hover:bg-white/10"
                          }`}
                        >
                          <span className="truncate">{sheet}</span>
                          {sheet === sheetName ? (
                            <ChevronRight className="h-4 w-4" />
                          ) : (
                            <Layers className="h-4 w-4 opacity-60" />
                          )}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <Separator className="bg-white/10" />

              {/* Limit */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-white/80">
                  Question Limit
                </h3>
                <Select
                  value={String(limit)}
                  onValueChange={(v: any) => setLimit(Number(v))}
                >
                  <SelectTrigger className="rounded-xl bg-white/5 border-white/10 text-white">
                    <SelectValue
                      placeholder="Select limit"
                      className="text-white"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-white/10 text-white">
                    {limitOptions.map((opt) => (
                      <SelectItem key={opt} value={String(opt)}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-white/10" />

              {/* Tags */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-white/80">Tags</h3>
                <ScrollArea className="h-[280px] pr-2">
                  <motion.div
                    layout
                    className="flex flex-wrap gap-2 mt-1"
                    transition={spring}
                  >
                    {tagOptions.map((tag) => (
                      <TagChip
                        key={tag}
                        tag={tag}
                        selected={tags.includes(tag)}
                        onToggle={toggleTag}
                      />
                    ))}
                  </motion.div>
                </ScrollArea>

                {tags.length > 0 && (
                  <div className="pt-2">
                    <Badge
                      variant="secondary"
                      className="rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30"
                    >
                      {tags.length} tag{tags.length > 1 ? "s" : ""} selected
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-h-screen p-6 md:p-10">
            {/* Header */}
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
              >
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-amber-300">
                    Practice Questions
                  </h1>
                  <p className="text-sm text-white/60 mt-1">
                    Curated from{" "}
                    <span className="text-white/80">{sheetName}</span>
                  </p>
                </div>

                {/* Search + quick tags */}
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full md:w-auto">
                  <div className="relative w-full sm:w-[340px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search questions..."
                      className="pl-9 pr-3 rounded-xl bg-white/5 border-white/10 placeholder:text-white/40"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
                          onClick={() => {
                            setTags([]);
                            setQuery("");
                          }}
                        >
                          Reset
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Clear search and tags</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Content States */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {!loading && error && (
              <Card className="bg-red-950/20 border-red-900/40">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-red-300">
                    <AlertTriangle className="h-5 w-5" /> Error
                  </CardTitle>
                  <CardDescription className="text-red-300/80">
                    {error}
                  </CardDescription>
                </CardHeader>
              </Card>
            )}

            {!loading &&
              !error &&
              filteredData &&
              filteredData.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <ListChecks className="h-10 w-10 text-amber-300" />
                  <h3 className="mt-3 text-lg font-semibold text-white/90">
                    Oops! No data found.
                  </h3>
                  <p className="text-white/60 max-w-md">
                    Try a different search term, increase the limit, or remove a
                    few tags.
                  </p>
                </motion.div>
              )}

            {/* Results Grid */}
            {!loading && !error && filteredData && filteredData.length > 0 && (
              <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <AnimatePresence>
                  {filteredData.map((item) => {
                    const isTopic = "step_title" in (item as Topic);
                    if (isTopic) {
                      const topic = item as Topic;
                      return (
                        <motion.li
                          key={`topic-${topic.id}`}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={spring}
                        >
                          <Card className="group border-white/10 bg-gradient-to-b from-zinc-900/60 to-zinc-900/30 hover:from-zinc-800/60 hover:to-zinc-900/40 transition">
                            <CardHeader>
                              <CardTitle className="text-base text-white">
                                {topic.step_no}.{topic.sub_step_no}.
                                {topic.sl_no} – {topic.step_title}
                              </CardTitle>
                              <CardDescription className="text-white/70">
                                Question: {topic.question_title}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="flex flex-wrap gap-2">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <a
                                      href={topic.post_link}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <Button
                                        size="sm"
                                        className="rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30"
                                      >
                                        Blog{" "}
                                        <ExternalLink className="ml-1 h-4 w-4" />
                                      </Button>
                                    </a>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    take you forward
                                  </TooltipContent>
                                </Tooltip>

                                {topic.lc_link && (
                                  <a
                                    href={topic.lc_link}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <Button
                                      size="sm"
                                      variant="default"
                                      className="rounded-lg border-white/10 bg-white/5 hover:bg-white/10"
                                    >
                                      LeetCode{" "}
                                      <ExternalLink className="ml-1 h-4 w-4" />
                                    </Button>
                                  </a>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.li>
                      );
                    } else {
                      const st = item as SheetTopic;
                      return (
                        <motion.li
                          key={`sheet-${st.id}`}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={spring}
                        >
                          <Card className="group border-white/10 bg-gradient-to-b from-zinc-900/60 to-zinc-900/30 hover:from-zinc-800/60 hover:to-zinc-900/40 transition">
                            <CardHeader>
                              <CardTitle className="text-base text-white">
                                {st.step_no}.{st.sl_no_in_step} – {st.title}
                              </CardTitle>
                              <CardDescription className="text-white/70">
                                Difficulty:
                                <span className="ml-1">
                                  {st.difficulty === 0
                                    ? "⭐️"
                                    : "⭐️".repeat(st.difficulty)}
                                </span>
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="flex flex-wrap gap-2">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <a
                                      href={st.post_link || "#"}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <Button
                                        size="sm"
                                        className="rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30"
                                      >
                                        Blog{" "}
                                        <ExternalLink className="ml-1 h-4 w-4" />
                                      </Button>
                                    </a>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    take you forward
                                  </TooltipContent>
                                </Tooltip>

                                {st.lc_link && (
                                  <a
                                    href={st.lc_link}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="rounded-lg border-white/10 bg-white/5 hover:bg-white/10"
                                    >
                                      LeetCode{" "}
                                      <ExternalLink className="ml-1 h-4 w-4" />
                                    </Button>
                                  </a>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.li>
                      );
                    }
                  })}
                </AnimatePresence>
              </ul>
            )}
          </main>
        </div>

        {/* Subtle bottom glow */}
        <div className="pointer-events-none fixed inset-x-0 bottom-0 h-24 bg-[radial-gradient(600px_120px_at_50%_120%,rgba(251,191,36,0.20),transparent_70%)]" />
      </div>
    </TooltipProvider>
  );
}
