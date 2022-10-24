import Match from '../../database/models/MatchModel';
import INewMatch from '../request/newMatch';
import INewResult from '../request/newResultMatch';

export default interface IMatchService {
  getAllMatches(): Promise<Match[]>
  getMatchesByProgress(inProgress: boolean): Promise<Match[]>
  createMatch(newMatch: INewMatch): Promise<Match>
  finishMatch(id: string): Promise<void>
  updateMatch(id: string, newResult: INewResult): Promise<void>
}
