import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';

const matchRouter = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRouter.get('/', async (req, res) => matchController.getMatches(req, res));

export default matchRouter;
