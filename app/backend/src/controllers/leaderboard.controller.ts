import { Request, Response } from 'express';
import ILeaderboardService from '../interfaces/service/leaderboard';

export default class LeaderboardController {
  private _leaderboardService: ILeaderboardService;

  constructor(leaderboardService: ILeaderboardService) {
    this._leaderboardService = leaderboardService;
  }

  public async getLeaderboardHome(_req: Request, res: Response) {
    const leaderboard = await this._leaderboardService.getLeaderboardHome();

    res.status(200).json(leaderboard);
  }

  public async getLeaderboardAway(_req: Request, res: Response) {
    const leaderboard = await this._leaderboardService.getLeaderboardAway();

    res.status(200).json(leaderboard);
  }
}
