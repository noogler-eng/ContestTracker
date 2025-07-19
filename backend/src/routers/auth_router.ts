import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user_schema'

const auth_router = express.Router()

// @dev we are using jwt to verify the token sent by google
// @route POST /auth/google
// @access Public
// @returns user data if token is valid, else error message
auth_router.post('/google', async (req, res) => {
  const token = req.headers.authorization
  if (!token) {
    res.status(401).json({ message: 'require token' })
    return
  }

  try {
    const json_data = jwt.decode(token)
    const { name, email, picture }: any = json_data

    let user = await User.findOne({ email })
    if (!user) {
      user = new User({ name, email, picture })
      await user.save()
    }

    res.status(200).json({ message: 'user successfully logged in', user })
  } catch (error) {
    console.error('Error verifying token', error)
    res.status(401).json({ message: 'Invalid token' })
  }
})

export default auth_router
