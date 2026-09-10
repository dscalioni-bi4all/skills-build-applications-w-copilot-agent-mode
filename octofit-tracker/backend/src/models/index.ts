import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
});

const teamSchema = new Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const activitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  points: { type: Number, default: 0 },
  performedAt: { type: Date, default: Date.now },
});

const leaderboardSchema = new Schema({
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  points: { type: Number, default: 0 },
});

const workoutSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, default: 'beginner' },
  targetMinutes: { type: Number, required: true },
});

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
