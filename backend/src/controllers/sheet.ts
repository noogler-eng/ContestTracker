import axios from 'axios'
import process from 'process'
import dotenv from 'dotenv'
import getRandomStepsByStepTitle from '../utils/getRandomQuestion'
dotenv.config()

const aTozStriverSheetLink = process.env.A_TO_Z_STRIVER_SHEET_LINK!
const sdeStriverSheetLink = process.env.SDE_STRIVER_SHEET_LINK!
const striver79SheetLink = process.env.STRIVER_79_SHEET_LINK!
const leetcodeBlinkenSheetLink = process.env.LEETCODE_BLINKEN_SHEET_LINK!

const sheetLinks = [
  { title: 'Striver_A2Z_Sheet', link: aTozStriverSheetLink },
  { title: 'Striver_SDE_Sheet', link: sdeStriverSheetLink },
  { title: 'Striver_79_Sheet', link: striver79SheetLink },
  { title: 'LeetCode_Blinken_Sheet', link: leetcodeBlinkenSheetLink },
]

// @test - GET /sheets/get_sheet/:sheet_name?limit=10&tags=topic1,topic2
// @desc - Get random questions from a specific sheet
// @access - Public
export const getRandomQuestionFromSheet = async (req: any, res: any) => {
  const { sheet_name } = req.params
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10
  const tags = req.query.tags ? (req.query.tags as string).split(',') : []

  try {
    const sheetLink = sheetLinks.find(
      (sheet) => sheet.title == sheet_name
    )?.link

    const response = await axios.get(sheetLink || '')

    if (response.data.length === 0) {
      return res.status(404).json({ error: 'Sheet not found or empty' })
    }

    const randomSheetQuestions = getRandomStepsByStepTitle(
      sheet_name,
      response.data,
      tags,
      limit
    )

    res.status(200).json(randomSheetQuestions)
  } catch (error) {
    console.error('Error fetching sheet:', error)
    res.status(500).json({
      error: 'Failed to fetch sheet data',
      details: error,
    })
  }
}
