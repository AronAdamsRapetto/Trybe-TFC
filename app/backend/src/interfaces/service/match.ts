import Match from '../../database/models/MatchModel';
import INewMatch from '../request/newMatch';

export default interface IMatchService {
  getAllMatches(): Promise<Match[]>
  getMatchesByProgress(inProgress: boolean): Promise<Match[]>
  createMatch(newMatch: INewMatch): Promise<Match>
}
