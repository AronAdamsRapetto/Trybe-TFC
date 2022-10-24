import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const teamRouter = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRouter.get('/', async (req, res) => teamController.getAllTeams(req, res));

export default teamRouter;
