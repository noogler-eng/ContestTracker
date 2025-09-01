import express from 'express'
import user_functions from '../controllers/user'
import googleAuthMiddleware from '../middleware/middleware'

const user_router = express.Router()

user_router.get('/profile', googleAuthMiddleware, user_functions.getCurrentUser)

user_router.post('/profile', googleAuthMiddleware, user_functions.updateProfile)

user_router.post('/bookmarks', googleAuthMiddleware, user_functions.addBookmark)
user_router.delete(
  '/bookmarks',
  googleAuthMiddleware,
  user_functions.removeBookmark
)

user_router.get(
  '/bookmarks',
  googleAuthMiddleware,
  user_functions.getUserBookmarks
)

export default user_router
