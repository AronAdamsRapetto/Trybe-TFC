import Match from '../../database/models/MatchModel';

export default interface IMatchService {
  getAllMatches(): Promise<Match[]>
}
