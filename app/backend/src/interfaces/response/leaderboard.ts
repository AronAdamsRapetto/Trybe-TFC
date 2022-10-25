export default interface ILeaderBoardResponse {
  name: string,
  totalPoints: string,
  totalGames: string,
  totalVictories: string,
  totalDraws: string,
  totalLosses: string,
  goalsFavor: string,
  goalsOwn: string,
  goalsBalance: string,
  efficiency: string,
}

export interface ICompleteLeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}
