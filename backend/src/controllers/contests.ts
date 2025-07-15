import axios from 'axios'
import { Request, Response } from 'express'
import ContestType from '../types/contest_type'
import video_solution from '../models/contest_solution'

const TAG_QUERY = `
  query questionDetail($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      topicTags { name slug translatedName }
    }
  }
`

const getTags = async (titleSlug: string) => {
  const payload = {
    operationName: 'questionDetail',
    query: TAG_QUERY,
    variables: { titleSlug },
  }

  const { data } = await axios.post('https://leetcode.com/graphql', payload)
  return data?.data?.question?.topicTags ?? []
}

const fetchUpcommingContest = async (req: Request, res: Response) => {
  try {
    const [codeforces, codechef, leetcodeUpcoming] = await Promise.all([
      axios.get('https://codeforces.com/api/contest.list'),
      axios.get(
        'https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc'
      ),
      axios.post('https://leetcode.com/graphql/', {
        query: `
            query upcomingContests {
              upcomingContests {
                titleSlug
                title
                startTime
                duration
              }
            }
          `,
        variables: {},
        operationName: 'upcomingContests',
      }),
    ])

    const codeforcesUpcomingContests: ContestType[] = codeforces.data.result
      .filter((c: any) => c.phase === 'BEFORE')
      .map((c: any) => ({
        id: c.id.toString(),
        title: c.name,
        type: 'Codeforces',
        link: `https://codeforces.com/contests/${c.id}`,
        start_date: new Date(c.startTimeSeconds * 1000),
        end_date: new Date((c.startTimeSeconds + c.durationSeconds) * 1000),
        duration: c.durationSeconds / 60,
        relativeTime: c.startTimeSeconds * 1000 - Date.now(),
        video_solution: '',
        status: 'upcoming',
      }))

    const codechefUpcomingContests: ContestType[] = codechef.data
      .future_contests
      ? codechef.data.future_contests.map((c: any) => ({
          id: c.contest_code,
          title: c.contest_name,
          type: 'CodeChef',
          link: `https://www.codechef.com/${c.contest_code}`,
          start_date: new Date(c.contest_start_date_iso),
          end_date: new Date(c.contest_end_date_iso),
          duration: parseInt(c.contest_duration),
          video_solution: '',
          relativeTime:
            new Date(c.contest_start_date_iso).getTime() - Date.now(),
          status: 'upcoming',
        }))
      : []

    const leetcodeUpcomingContests: ContestType[] =
      leetcodeUpcoming.data.data && leetcodeUpcoming.data.data.upcomingContests
        ? leetcodeUpcoming.data.data.upcomingContests.map((c: any) => ({
            id: c.titleSlug,
            title: c.title,
            type: 'LeetCode',
            link: `https://leetcode.com/contest/${c.titleSlug}`,
            start_date: new Date(c.startTime * 1000),
            end_date: new Date((c.startTime + c.duration) * 1000),
            duration: c.duration / 60,
            relativeTime: c.startTime * 1000 - Date.now(),
            video_solution: '',
            status: 'upcoming',
          }))
        : []

    const upcomingContests: ContestType[] = [
      ...codeforcesUpcomingContests,
      ...codechefUpcomingContests,
      ...leetcodeUpcomingContests,
    ].sort((a, b) => a.start_date.getTime() - b.start_date.getTime())

    res.status(200).json({ upcomingContests })
  } catch (error: any) {
    console.error('Error fetching contests:', error)
    res.status(500).json({
      error: 'Failed to fetch contest data',
      details: error,
    })
  }
}

const fetchPastContest = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 0

    // Fetch contests from external APIs
    const [codeforces, codechef, leetcodePast] = await Promise.all([
      axios.get('https://codeforces.com/api/contest.list'),
      axios.get(
        `https://www.codechef.com/api/list/contests/past?sort_by=START&sorting_order=desc&offset=${
          page * 20
        }&mode=all`
      ),
      axios.post('https://leetcode.com/graphql/', {
        query: `
          query pastContests($pageNo: Int, $numPerPage: Int) {
            pastContests(pageNo: $pageNo, numPerPage: $numPerPage) {
              data {
                title
                titleSlug
                startTime
                duration
              }
            }
          }
        `,
        variables: {
          pageNo: page + 1,
          numPerPage: 10,
        },
        operationName: 'pastContests',
      }),
    ])

    // Extract contest IDs
    const codeforcesContests = codeforces.data.result
      .filter((c: any) => c.phase === 'FINISHED')
      .slice(10 * page, 10 * page + 10)

    const codechefContests = codechef.data.contests || []
    const leetcodeContests = leetcodePast.data.data?.pastContests?.data || []

    const allContestIds = [
      ...codeforcesContests.map((c: any) => c.id.toString()),
      ...codechefContests.map((c: any) => c.contest_code),
      ...leetcodeContests.map((c: any) => c.titleSlug),
    ]

    // Fetch all video solutions from MongoDB in a single query
    const dbContests = await video_solution.find({
      contestId: { $in: allContestIds },
    })
    const dbContestMap = new Map(
      dbContests.map((c) => [c.contestId, c.video_solution])
    )

    // Map and attach video solutions
    const codeforcesPastContests = codeforcesContests.map((c: any) => ({
      id: c.id.toString(),
      title: c.name,
      type: 'Codeforces',
      link: `https://codeforces.com/contests/${c.id}`,
      start_date: new Date(c.startTimeSeconds * 1000),
      end_date: new Date((c.startTimeSeconds + c.durationSeconds) * 1000),
      duration: c.durationSeconds / 60,
      relativeTime: c.startTimeSeconds * 1000 - Date.now(),
      video_solution: dbContestMap.get(c.id.toString()) || '',
      status: 'past',
    }))

    const codechefPastContests = codechefContests.map((c: any) => ({
      id: c.contest_code,
      title: c.contest_name,
      type: 'CodeChef',
      link: `https://www.codechef.com/${c.contest_code}`,
      start_date: new Date(c.contest_start_date_iso),
      end_date: new Date(c.contest_end_date_iso),
      duration: parseInt(c.contest_duration),
      relativeTime: new Date(c.contest_start_date_iso).getTime() - Date.now(),
      video_solution: dbContestMap.get(c.contest_code) || '',
      status: 'past',
    }))

    const leetcodePastContests = leetcodeContests.map((c: any) => ({
      id: c.titleSlug,
      title: c.title,
      type: 'LeetCode',
      link: `https://leetcode.com/contest/${c.titleSlug}`,
      start_date: new Date(c.startTime * 1000),
      end_date: new Date((c.startTime + c.duration) * 1000),
      duration: c.duration / 60,
      relativeTime: c.startTime * 1000 - Date.now(),
      video_solution: dbContestMap.get(c.titleSlug) || '',
      status: 'past',
    }))

    // Combine and sort all contests
    const pastContests = [
      ...codeforcesPastContests,
      ...codechefPastContests,
      ...leetcodePastContests,
    ].sort((a, b) => b.start_date.getTime() - a.start_date.getTime())

    res.status(200).json({ pastContests })
  } catch (error: any) {
    console.error('Error fetching contests:', error)
    res.status(500).json({
      error: 'Failed to fetch contest data',
      details: error,
    })
  }
}

const uploadVideoSolutionLink = async (req: any, res: any) => {
  try {
    const { contestId, videoSolution } = req.body
    console.log('working...')

    if (!contestId || !videoSolution) {
      return res.status(400).json({
        message: 'contestId and videoSolution are required',
      })
    }

    const result = await video_solution.findOneAndUpdate(
      { contestId },
      { video_solution: videoSolution },
      { upsert: true, new: true }
    )

    res.status(200).json({
      message: 'Video Solution added/updated successfully',
      data: result,
    })
  } catch (error) {
    console.error('Error adding video solution:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getContestById = async (req: Request, res: Response) => {
  const { contestId } = req.params

  try {
    const contestPayload = {
      operationName: 'contestQuestionList',
      query: `
        query contestQuestionList($contestSlug: String!) {
          contestQuestionList(contestSlug: $contestSlug) {
            isAc
            credit
            title
            titleSlug
            titleCn
            questionId
            isContest
          }
        }
      `,
      variables: { contestSlug: contestId },
    }

    const contestRes = await axios.post(
      'https://leetcode.com/graphql',
      contestPayload
    )

    const questionList = contestRes.data?.data?.contestQuestionList ?? []

    const questionsWithTags = await Promise.all(
      questionList.map(async (q: any) => ({
        ...q,
        topicTags: await getTags(q.titleSlug),
      }))
    )

    res.status(200).json({
      message: 'Contest fetched successfully',
      data: questionsWithTags,
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export default {
  fetchUpcommingContest,
  fetchPastContest,
  uploadVideoSolutionLink,
  getContestById,
}
