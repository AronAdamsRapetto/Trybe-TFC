import { Router } from 'express';
import TeamService from '../services/team.service';
import TeamController from '../controllers/team.controller';

const teamRouter = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRouter.get('/', async (req, res) => teamController.getAllTeams(req, res));

export default teamRouter;
