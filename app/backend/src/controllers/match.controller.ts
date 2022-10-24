import { Request, Response } from 'express';
import Match from '../database/models/MatchModel';
import IMatchService from '../interfaces/service/match';

export default class MatchController {
  private matchService: IMatchService;

  constructor(matchService: IMatchService) {
    this.matchService = matchService;
  }

  public async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    let matches: Match[];

    if (inProgress) {
      matches = await this.matchService.getMatchesByProgress(inProgress === 'true');
      return res.status(200).json(matches);
    }
    matches = await this.matchService.getAllMatches();
    res.status(200).json(matches);
  }
}
