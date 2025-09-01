import axios from 'axios'

// @dev This function fetches the next and previous day questions for a given slug from LeetCode
// @test /daily/getNextAndPreviousDayQuestions?slug=some-slug
const getNextAndPreviousDayQuestions = async (req: any, res: any) => {
  const currentQuestionSlug = req.params.slug

  if (!currentQuestionSlug) {
    return res.status(400).json({ message: 'Slug is required' })
  }

  try {
    const response = await axios.post('https://leetcode.com/graphql', {
      operationName: 'learningContext',
      // currentQuestionSlug is mandatory to passed as a variable
      query: `
          query learningContext(
          $currentQuestionSlug: String!, 
          $categorySlug: String, 
          $envId: String, 
          $envType: String, 
          $filters: QuestionListFilterInput, 
          $favoriteFilters: FavoriteQuestionFilterInput, 
          $version: String, 
          $childFavoriteSlug: String, 
          $filtersV2: QuestionFilterInput, 
          $sortBy: QuestionSortByInput, 
          $searchKeyword: String
        ) {
          learningContextV2(
            currentQuestionSlug: $currentQuestionSlug
            categorySlug: $categorySlug
            envId: $envId
            envType: $envType
            filters: $filters
            favoriteFilters: $favoriteFilters
            version: $version
            childFavoriteSlug: $childFavoriteSlug
            filtersV2: $filtersV2
            sortBy: $sortBy
            searchKeyword: $searchKeyword
          ) {
            name
            backLink
            nextQuestion {
              difficulty
              title
              titleSlug
              questionFrontendId
            }
            previousQuestion {
              difficulty
              title
              titleSlug
              questionFrontendId
            }
          }
        }
        `,
      variables: {
        currentQuestionSlug: currentQuestionSlug,
        // new Date().toISOString() -> '2023-10-01T00:00:00.000Z',
        // split('T') -> ['2023-10-01', '00:00:00.000Z']
        // [0] -> '2023-10-01'
        envId: new Date().toISOString().split('T')[0],
        envType: 'daily-question',
        favoriteFilters: {},
      },
    })

    const data = response.data.data.learningContextV2
    res.json({
      message: 'Next and previous day questions fetched successfully',
      data: {
        nextQuestion: data.nextQuestion,
        previousQuestion: data.previousQuestion,
      },
    })
  } catch (error) {
    console.error('Error fetching next and previous day questions:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @dev This function fetches the current day question for the daily challenge
const getCurrentDayQuestion = async (req: any, res: any) => {
  try {
    

  } catch (error) {
    console.error('Error fetching current day question:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export default { getNextAndPreviousDayQuestions }
