import express from 'express'
import contest_controllers from '../controllers/contests'

const contest_router = express.Router()

contest_router.get(
  '/upcomming_contest',
  contest_controllers.fetchUpcommingContest
)
contest_router.get('/past_contest', contest_controllers.fetchPastContest)
contest_router.post(
  '/upload_solution',
  contest_controllers.uploadVideoSolutionLink
)
contest_router.get(
  '/getContestById/:contestId',
  contest_controllers.getContestById
)

export default contest_router
