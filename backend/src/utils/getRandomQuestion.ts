import {
  QuesTopic,
  SheetStep,
  SheetTopic,
  Step,
  SubStep,
  Topic,
} from '../types/sheet_type'

// @tags = ['array', 'string', 'linked list', 'binary search', 'dynamic programming',
// 'greedy', 'tree', 'graph', 'bit manipulation', 'hashing', 'stack and queue',
// 'heap and priority queue', 'trie']
// @dev = two different data_types for sheets
export function getRandomStepsByStepTitle(
  sheet:
    | 'Striver_A2Z_Sheet'
    | 'Striver_SDE_Sheet'
    | 'Striver_79_Sheet'
    | 'LeetCode_Blinken_Sheet',
  steps: any,
  tags: string[],
  limit: number
): Topic[] | QuesTopic[] {
  // getting random limit question from the sheet
  if (sheet === 'Striver_A2Z_Sheet') {
    // collecting all topics from the steps
    // filtering topics based on tags
    const topics: Topic[] = steps
      .flatMap((step: Step) =>
        step.sub_steps.flatMap((subStep: SubStep) => subStep.topics)
      )
      .filter((topic: Topic) => {
        if (tags.length === 0) return true
        const inTitle = tags.some(
          (tag) =>
            topic.step_title.toLowerCase().includes(tag.toLowerCase()) ||
            topic.sub_step_title.toLowerCase().includes(tag.toLowerCase())
        )

        // Check if the tag matches any ques_topic value
        // const inQuesTopic = tags.some((tag) =>
        //   topic.ques_topic?.some((q) => q.value === tag)
        // )
        return inTitle
      })

    const randomTopics = topics.sort(() => 0.5 - Math.random()).slice(0, limit)
    return randomTopics
  } else {
    // checking if steps is an array
    const stepsArray = Array.isArray(steps.sheetData) ? steps.sheetData : []

    // collecting all topics from the steps
    // filtering topics based on tags
    const topics: QuesTopic[] = stepsArray
      .flatMap((step: SheetStep) => step.topics)
      .filter((topic: SheetTopic) => {
        if (tags.length === 0) return true
        return tags.some(
          (tag) =>
            topic.title.toLowerCase().includes(tag.toLowerCase()) ||
            topic?.head_step_no?.toLowerCase().includes(tag.toLowerCase())
        )
      })

    console.log('Filtered Topics:', topics)
    const randomTopics = topics.sort(() => 0.5 - Math.random()).slice(0, limit)
    return randomTopics
  }
}

export default getRandomStepsByStepTitle
