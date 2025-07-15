import UseGetSheet from "@/hooks/useGetSheet";
import { SheetTopic, Topic } from "@/types/sheet_type";
import { useState } from "react";
import { motion } from "framer-motion";

const sheets = [
  "Striver_A2Z_Sheet",
  "Striver_SDE_Sheet",
  "Striver_79_Sheet",
  "LeetCode_Blinken_Sheet",
];

const limitOptions = [5, 10, 20];
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

export default function Practice() {
  const [sheetName, setSheetName] = useState<string>(sheets[0]);
  const [limit, setLimit] = useState<number>(1000);
  const [tags, setTags] = useState<string[]>([]);

  const { sheetData, loading, error } = UseGetSheet(sheetName, limit, tags) as {
    sheetData: Topic[] | SheetTopic[] | null;
    loading: boolean;
    error: string | null;
  };

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className={`flex h-screen text-white`}>
      {/* Sidebar */}
      <aside className="w-64 p-6 space-y-8 border-r border-gray-700 sticky top-0 h-screen overflow-y-auto bg-[#1A1A1A]/80 backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-[#FFA116]">Filters</h2>

        {/* Sheets */}
        <div>
          <h3 className="font-medium mb-2">Sheets</h3>
          <div className="space-y-2">
            {sheets.map((sheet) => (
              <motion.button
                key={sheet}
                onClick={() => setSheetName(sheet)}
                whileTap={{ scale: 0.95 }}
                className={`w-full text-left px-4 py-2 rounded-full transition text-sm ${
                  sheet === sheetName
                    ? "bg-[#1A1A1A] border-2 border-[#FFA116]"
                    : "bg-[#1A1A1A] border border-gray-700"
                }`}
              >
                {sheet}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Limit */}
        <div>
          <h3 className="font-medium mb-2">Question Limit</h3>
          <div className="flex gap-2">
            {limitOptions.map((opt) => (
              <motion.button
                key={opt}
                onClick={() => setLimit(opt)}
                whileTap={{ scale: 0.9 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition ${
                  opt === limit
                    ? "bg-[#1A1A1A] border-2 border-[#FFA116]"
                    : "bg-[#1A1A1A] border border-gray-700"
                }`}
              >
                {opt}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="font-medium mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tagOptions.map((tag) => {
              const selected = tags.includes(tag);
              return (
                <motion.button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    selected
                      ? "bg-[#1A1A1A] border-2 border-[#FFA116]"
                      : "bg-[#1A1A1A] border border-gray-700"
                  }`}
                >
                  {tag}
                </motion.button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Content (scrollable) */}
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-2xl font-bold mb-6 text-[#FFA116]">
          Practice Questions
        </h1>

        {loading && <p className="text-gray-300">Loading...</p>}
        {error && <p className="text-red-400">Error: {error}</p>}
        {sheetData && sheetData.length === 0 && (
          <p className="text-gray-300 h-full text-[#FFA116]">
            Oops! No data found.
          </p>
        )}

        <ul className="space-y-6">
          {sheetData &&
            sheetData.map((item) => {
              if ("step_title" in item) {
                const topic = item as Topic;
                return (
                  <li
                    key={topic.id}
                    className="p-4 rounded-lg shadow border border-gray-700 bg-gradient-to-r from-[#1A1A1A] via-[#2D2D2D] to-[#444]"
                  >
                    <h3 className="font-semibold text-lg text-white">
                      {topic.step_no}.{topic.sub_step_no}.{topic.sl_no} –{" "}
                      {topic.step_title}
                    </h3>
                    <p className="mt-1 text-gray-300">
                      Question: {topic.question_title}
                    </p>
                    <div className="mt-2 space-x-4">
                      <a
                        href={topic.post_link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#FFA116] underline"
                      >
                        take you forward
                      </a>
                      {topic.lc_link && (
                        <a
                          href={topic.lc_link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#FFA116] underline"
                        >
                          LeetCode
                        </a>
                      )}
                    </div>
                  </li>
                );
              } else {
                const st = item as SheetTopic;
                return (
                  <li
                    key={st.id}
                    className="p-4 bg-[#1A1A1A] rounded-lg shadow border border-gray-700 bg-gradient-to-r from-[#1A1A1A] via-[#2D2D2D] to-[#444]"
                  >
                    <h3 className="font-semibold text-lg text-white">
                      {st.step_no}.{st.sl_no_in_step} – {st.title}
                    </h3>
                    <p className="mt-1 text-gray-300">
                      Difficulty:{" "}
                      {st.difficulty == 0 ? "⭐️" : "⭐️".repeat(st.difficulty)}
                    </p>
                    <div className="mt-2 space-x-4">
                      <a
                        href={st.post_link || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#FFA116] underline"
                      >
                        take you forward
                      </a>
                      {st.lc_link && (
                        <a
                          href={st.lc_link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#FFA116] underline"
                        >
                          LeetCode
                        </a>
                      )}
                    </div>
                  </li>
                );
              }
            })}
        </ul>
      </main>
    </div>
  );
}
