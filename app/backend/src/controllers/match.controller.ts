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

  public async createMatch(req: Request, res: Response) {
    const { body } = req;
    const newMatch = await this.matchService.createMatch(body);

    res.status(201).json(newMatch);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    await this.matchService.finishMatch(id);
    res.status(200).json({ message: 'Finished' });
  }

  public async updateMatch(req: Request, res: Response) {
    const { body } = req;
    const { id } = req.params;

    await this.matchService.updateMatch(id, body);
    res.status(200).json({ message: 'Updated!' });
  }
}
