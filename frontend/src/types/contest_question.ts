export type ContestQuestion = {
  credit: number;
  isAc: boolean;
  isContest: boolean;
  questionId: string;
  title: string;
  titleCn?: string | null;
  titleSlug: string;
  topicTags: { name: string; slug: string; translatedName: string | null }[];
};
