import mongoose, { Schema, Document } from 'mongoose'

export interface IContest extends Document {
  id: string
  title: string
  type: string
  link: string
  start_date: Date
  end_date: Date
  duration: number
  relativeTime: number
  status: 'upcoming' | 'running' | 'finished'
  video_solution?: string
  createdAt: Date
  updatedAt: Date
}

const ContestSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    link: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    duration: { type: Number, required: true },
    relativeTime: { type: Number, required: true },
    status: {
      type: String,
      enum: ['upcoming', 'past'],
      default: 'upcoming',
    },
    video_solution: { type: String, default: null },
  },
  { timestamps: true }
)

export default mongoose.models.Contest ||
  mongoose.model<IContest>('Contest', ContestSchema)
