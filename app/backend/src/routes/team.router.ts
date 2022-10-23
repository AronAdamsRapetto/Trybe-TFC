import { Router } from 'express';

const teamRouter = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRouter.get('/', async (req, res) => teamController.getAllTeams(req, res));

export default teamRouter;
