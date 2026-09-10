"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("./config/api");
require("./config/database");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
});
app.use('/api/users', routes_1.usersRouter);
app.use('/api/teams', routes_1.teamsRouter);
app.use('/api/activities', routes_1.activitiesRouter);
app.use('/api/leaderboard', routes_1.leaderboardRouter);
app.use('/api/workouts', routes_1.workoutsRouter);
app.listen(api_1.port, () => {
    console.log(`OctoFit API listening on ${api_1.baseUrl}`);
});
