import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import IMatchService from '../interfaces/service/match';

export default class MatchService implements IMatchService {
  private matches: Match[];

  public async getAllMatches(): Promise<Match[]> {
    this.matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return this.matches;
  }
}
