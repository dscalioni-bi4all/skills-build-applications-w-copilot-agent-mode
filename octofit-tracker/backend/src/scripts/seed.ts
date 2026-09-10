import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [blueTeam, goldTeam] = await Team.create([
      { name: 'Blue Falcons', members: [] },
      { name: 'Gold Griffins', members: [] },
    ]);

    const [ada, grace, alan, katherine] = await User.create([
      { email: 'ada.lovelace@octofit.test', name: 'Ada Lovelace', team: blueTeam._id },
      { email: 'grace.hopper@octofit.test', name: 'Grace Hopper', team: blueTeam._id },
      { email: 'alan.turing@octofit.test', name: 'Alan Turing', team: goldTeam._id },
      { email: 'katherine.johnson@octofit.test', name: 'Katherine Johnson', team: goldTeam._id },
    ]);

    blueTeam.members.push(ada._id, grace._id);
    goldTeam.members.push(alan._id, katherine._id);
    await Promise.all([blueTeam.save(), goldTeam.save()]);

    await Activity.create([
      { user: ada._id, type: 'Running', durationMinutes: 45, points: 90, performedAt: new Date('2026-09-01T07:30:00Z') },
      { user: grace._id, type: 'Cycling', durationMinutes: 60, points: 110, performedAt: new Date('2026-09-02T18:00:00Z') },
      { user: alan._id, type: 'Swimming', durationMinutes: 30, points: 70, performedAt: new Date('2026-09-03T06:45:00Z') },
      { user: katherine._id, type: 'Strength Training', durationMinutes: 50, points: 95, performedAt: new Date('2026-09-04T17:15:00Z') },
      { user: ada._id, type: 'Yoga', durationMinutes: 40, points: 60, performedAt: new Date('2026-09-05T08:00:00Z') },
    ]);

    await Leaderboard.create([
      { team: blueTeam._id, points: 260 },
      { team: goldTeam._id, points: 165 },
    ]);

    await Workout.create([
      {
        name: 'Sunrise 5K',
        description: 'Steady-paced five kilometre run to build aerobic endurance.',
        difficulty: 'beginner',
        targetMinutes: 30,
      },
      {
        name: 'Hill Interval Ride',
        description: 'Eight rounds of three-minute climbs with recovery spins between efforts.',
        difficulty: 'intermediate',
        targetMinutes: 60,
      },
      {
        name: 'Full Body Strength Circuit',
        description: 'Squats, deadlifts, presses and rows performed as a timed circuit.',
        difficulty: 'intermediate',
        targetMinutes: 50,
      },
      {
        name: 'Recovery Flow Yoga',
        description: 'Low-intensity mobility flow focused on hips, hamstrings and shoulders.',
        difficulty: 'beginner',
        targetMinutes: 40,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
