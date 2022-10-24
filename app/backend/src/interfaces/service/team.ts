import Teams from '../database/models/TeamModel';

export default interface ITeamService {
  getAllTeams(): Team[]
}
