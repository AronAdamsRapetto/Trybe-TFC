import { Request, Response } from 'express';
import ITeamService from '../interfaces/service/team';

export default class TeamController {
  private teamService: ITeamService;

  constructor(teamService: ITeamService) {
    this.teamService = teamService;
  }

  public async getAllTeams(_req: Request, res: Response) {
    const teams = await this.teamService.getAllTeams();
    res.status(200).json(teams);
  }
}
