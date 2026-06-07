import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date:   { type: String, required: true },
  count:  { type: Number, default: 1 },
});

activitySchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model('Activity', activitySchema);
