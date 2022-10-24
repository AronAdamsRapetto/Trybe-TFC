import { Request, Response } from 'express';
import IMatchService from '../interfaces/service/match';

export default class MatchController {
  private matchService: IMatchService;

  constructor(matchService: IMatchService) {
    this.matchService = matchService;
  }

  public async getAllMatches(_req: Request, res: Response) {
    const matches = await this.matchService.getAllMatches();

    res.status(200).json(matches);
  }
}
