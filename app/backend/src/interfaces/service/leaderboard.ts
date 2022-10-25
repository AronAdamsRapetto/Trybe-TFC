import ILeaderBoardResponse from '../response/leaderboard';

export default interface ILeaderboardService {
  getLeaderboardHome(): Promise<ILeaderBoardResponse[]>,
  getLeaderboardAway(): Promise<ILeaderBoardResponse[]>,
}
