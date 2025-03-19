import mongoose from "mongoose";

const videoSolutionSchema = new mongoose.Schema({
  contestId: { type: String, required: true, unique: true },
  video_solution: { type: String, required: true },
});

export default mongoose.models.VideoSolution ||
  mongoose.model("VideoSolution", videoSolutionSchema);
