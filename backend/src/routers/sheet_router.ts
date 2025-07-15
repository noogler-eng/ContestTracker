import express from 'express'
import { getRandomQuestionFromSheet } from '../controllers/sheet'

export const sheet_router = express.Router()

sheet_router.get('/get_sheet/:sheet_name', getRandomQuestionFromSheet)
