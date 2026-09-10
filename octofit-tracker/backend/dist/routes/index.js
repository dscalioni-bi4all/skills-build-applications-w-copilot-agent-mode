"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboardRouter = exports.workoutsRouter = exports.activitiesRouter = exports.teamsRouter = exports.usersRouter = void 0;
const express_1 = require("express");
const models_1 = require("../models");
// One router factory per collection keeps the five endpoints behaviourally identical.
function createCrudRouter(model) {
    const router = (0, express_1.Router)();
    router.get('/', async (_request, response) => {
        const documents = await model.find();
        response.json(documents);
    });
    router.post('/', async (request, response) => {
        try {
            const created = await model.create(request.body);
            response.status(201).json(created);
        }
        catch (error) {
            response.status(400).json({ error: error.message });
        }
    });
    return router;
}
exports.usersRouter = createCrudRouter(models_1.User);
exports.teamsRouter = createCrudRouter(models_1.Team);
exports.activitiesRouter = createCrudRouter(models_1.Activity);
exports.workoutsRouter = createCrudRouter(models_1.Workout);
exports.leaderboardRouter = (0, express_1.Router)();
exports.leaderboardRouter.get('/', async (_request, response) => {
    const entries = await models_1.Leaderboard.find().sort({ points: -1 }).populate('team');
    response.json(entries);
});
exports.leaderboardRouter.post('/', async (request, response) => {
    try {
        const created = await models_1.Leaderboard.create(request.body);
        response.status(201).json(created);
    }
    catch (error) {
        response.status(400).json({ error: error.message });
    }
});
