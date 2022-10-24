import CustomizedError from '../utils/customizedError';
import Team from '../database/models/TeamModel';
import ITeamService from '../interfaces/service/team';

export default class TeamService implements ITeamService {
  private teams: Team[] | Team | null;

  public async getAllTeams(): Promise<Team[]> {
    this.teams = await Team.findAll();
    return this.teams as Team[];
  }

  public async getTeamById(id: string): Promise<Team> {
    this.teams = await Team.findByPk(id);
    if (!this.teams) throw new CustomizedError(404, 'Team not found!');

    return this.teams;
  }
}
