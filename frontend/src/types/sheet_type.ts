// this is for contest questions, a to z sheet
export type Topic = {
  id: string;
  step_no: number;
  sub_step_no: number;
  sl_no: number;
  step_title: string;
  sub_step_title: string;
  question_title: string;
  post_link: string;
  yt_link: string;
  plus_link: string;
  editorial_link: string;
  lc_link: string | null;
  company_tags: string | null;
  difficulty: number;
  ques_topic: { value: string; label: string }[];
};

export type SubStep = {
  sub_step_no: number;
  sub_step_title: string;
  topics: Topic[];
};

export type Step = {
  step_no: number;
  step_title: string;
  sub_steps: SubStep[];
};

// this is for blind 75, striver 79 sheet and SDE striver sheet
export type QuesTopic = {
  value: string;
  label: string;
};

export type SheetTopic = {
  id: string;
  step_no: number;
  sl_no_in_step: number;
  head_step_no: string;
  title: string;
  post_link: string | null;
  yt_link: string | null;
  cs_link: string | null;
  gfg_link: string | null;
  lc_link: string | null;
  company_tags: string[] | null;
  difficulty: number;
  ques_topic: QuesTopic[];
  plus_link: string | null;
  editorial_link: string | null;
};
