import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import contest_router from './routers/contest_router'
import auth_router from './routers/auth_router'
import dotenv from 'dotenv'
import user_router from './routers/user_router'
import startYouTubeCron from './cron/video_link_fetcher'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const MONGO_URI = process.env.MONGO_URI!
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected')
    startYouTubeCron()
    console.log('youtube cron started')
  })
  .catch((err: any) => console.error('MongoDB Connection Error:', err))

app.get('/', (req: any, res: any) => res.send('Server is running'))
app.use('/auth', auth_router)
app.use('/contests', contest_router)
app.use('/user', user_router)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
