import { Router } from 'express';
import authUser from '../middlewares/authUser';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';

const matchRouter = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRouter.get('/', async (req, res) => matchController.getMatches(req, res));
matchRouter.post('/', authUser, async (req, res) => matchController.createMatch(req, res));
matchRouter.patch('/:id/finish', async (req, res) => matchController.finishMatch(req, res));
matchRouter.patch('/:id', async (req, res) => matchController.updateMatch(req, res));

export default matchRouter;
