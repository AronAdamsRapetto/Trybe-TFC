import Team from '../../database/models/TeamModel';

export default interface ITeamService {
  getAllTeams(): Promise<Team[]>
}
