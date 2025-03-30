import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  picture?: string
  email: string
  isadmin: boolean
  bookmarks?: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    picture: { type: String },
    isadmin: { type: Boolean, default: false },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contest' }],
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
