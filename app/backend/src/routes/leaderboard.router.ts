import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderboardService from '../services/leaderboard.service';

const leaderboardRouter = Router();
const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRouter.get(
  '/home',
  async (req, res) => leaderboardController.getLeaderboardHome(req, res),
);

leaderboardRouter.get(
  '/away',
  async (req, res) => leaderboardController.getLeaderboardAway(req, res),
);

leaderboardRouter.get('/', async (req, res) => leaderboardController.getLeaderboard(req, res));

export default leaderboardRouter;
