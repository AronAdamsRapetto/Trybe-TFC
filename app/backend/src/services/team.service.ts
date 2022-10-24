import Team from '../database/models/TeamModel';
import ITeamService from '../interfaces/service/team';

export default class TeamService implements ITeamService {
  private teams: Team[];

  public async getAllTeams(): Promise<Team[]> {
    this.teams = await Team.findAll();
    return this.teams as Team[];
  }
}
