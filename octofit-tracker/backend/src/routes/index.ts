import { Router } from 'express';
import type { Model } from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

// One router factory per collection keeps the five endpoints behaviourally identical.
function createCrudRouter(model: Model<any>) {
  const router = Router();

  router.get('/', async (_request, response) => {
    const documents = await model.find();
    response.json(documents);
  });

  router.post('/', async (request, response) => {
    try {
      const created = await model.create(request.body);
      response.status(201).json(created);
    } catch (error) {
      response.status(400).json({ error: (error as Error).message });
    }
  });

  return router;
}

export const usersRouter = createCrudRouter(User);
export const teamsRouter = createCrudRouter(Team);
export const activitiesRouter = createCrudRouter(Activity);
export const workoutsRouter = createCrudRouter(Workout);

export const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response) => {
  const entries = await Leaderboard.find().sort({ points: -1 }).populate('team');
  response.json(entries);
});

leaderboardRouter.post('/', async (request, response) => {
  try {
    const created = await Leaderboard.create(request.body);
    response.status(201).json(created);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});
