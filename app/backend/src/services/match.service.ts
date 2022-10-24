import { Op } from 'sequelize';
import INewMatch from '../interfaces/request/newMatch';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import IMatchService from '../interfaces/service/match';
import CustomizedError from '../utils/customizedError';

export default class MatchService implements IMatchService {
  private _matches: Match[] | Match;
  private _validateTeams: Team[];

  public async getAllMatches(): Promise<Match[]> {
    this._matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return this._matches;
  }

  public async getMatchesByProgress(inProgress: boolean): Promise<Match[]> {
    this._matches = await Match.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return this._matches;
  }

  public async createMatch({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals }: INewMatch): Promise<Match> {
    if (homeTeam === awayTeam) {
      throw new CustomizedError(422, 'It is not possible to create a match with two equal teams');
    }

    this._validateTeams = await Team.findAll({ where: { id: { [Op.or]: [homeTeam, awayTeam] } } });
    if (this._validateTeams.length < 2) {
      throw new CustomizedError(404, 'There is no team with such id!');
    }

    this._matches = await Match.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true,
    });
    return this._matches;
  }
}
