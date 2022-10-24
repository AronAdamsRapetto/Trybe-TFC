import { Op } from 'sequelize';
import newResultMatch from '../interfaces/request/newResultMatch';
import INewMatch from '../interfaces/request/newMatch';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import IMatchService from '../interfaces/service/match';
import CustomizedError from '../utils/customizedError';

export default class MatchService implements IMatchService {
  private _matches: Match[] | Match;
  private _validateTeams: Team[] | Team | null;
  private _validateMatch: Match;
  private _errorMessageNotFoundId = 'There is no team with such id!';

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
      throw new CustomizedError(404, this._errorMessageNotFoundId);
    }

    this._matches = await Match.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true,
    });
    return this._matches;
  }

  public async finishMatch(id: string): Promise<void> {
    this._validateTeams = await Team.findOne({ where: { id } });

    if (!this._validateTeams) throw new CustomizedError(404, this._errorMessageNotFoundId);

    await Match.update({ inProgress: false }, {
      where: { id },
    });
  }

  public async updateMatch(
    id: string,
    { homeTeamGoals, awayTeamGoals }: newResultMatch,
  ): Promise<void> {
    this._validateMatch = await Match.findOne({ where: { id } }) as Match;

    if (!this._validateMatch) throw new CustomizedError(404, this._errorMessageNotFoundId);
    if (!this._validateMatch.inProgress) throw new CustomizedError(422, 'Match finshed!');

    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}
