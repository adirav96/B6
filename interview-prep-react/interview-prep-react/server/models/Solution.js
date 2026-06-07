import mongoose from 'mongoose';

const solutionSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  problemId:   { type: Number, required: true },
  score:       { type: Number, required: true },
  timeSpent:   { type: Number, required: true },
  code:        { type: String, required: true },
  testsPassed: { type: Number, required: true },
  totalTests:  { type: Number, required: true },
  hintsUsed:   { type: Number, default: 0 },
  date:        { type: String, default: () => new Date().toISOString() },
});

solutionSchema.index({ userId: 1, problemId: 1 }, { unique: true });

export default mongoose.model('Solution', solutionSchema);
