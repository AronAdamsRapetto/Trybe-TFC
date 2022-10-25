import sequelize from '../database/models';
import ILeaderBoardResponse from '../interfaces/response/leaderboard';
import ILeaderboardService from '../interfaces/service/leaderboard';
import sql from '../utils/queryStringLeaderBoard';

export default class LeaderboardService implements ILeaderboardService {
  private _leaderboard: unknown;
  // private _newResult: ICompleteLeaderboard;
  // private _completeLeaderboard: ICompleteLeaderboard[] = [];

  // constructor() {
  //   this._newResult = {
  //     name: '',
  //     totalGames: 0,
  //     totalVictories: 0,
  //     totalDraws: 0,
  //     totalLosses: 0,
  //     goalsFavor: 0,
  //     goalsOwn: 0,
  //     goalsBalance: 0,
  //     totalPoints: 0,
  //     efficiency: 0,
  //   };
  // }

  public async getLeaderboardHome(): Promise<ILeaderBoardResponse[]> {
    [this._leaderboard] = await sequelize.query(sql.sqlStringHome);
    return this._leaderboard as ILeaderBoardResponse[];
  }

  public async getLeaderboardAway(): Promise<ILeaderBoardResponse[]> {
    [this._leaderboard] = await sequelize.query(sql.sqlStringAway);
    return this._leaderboard as ILeaderBoardResponse[];
  }

  public async getLeaderboard(): Promise<ILeaderBoardResponse[]> {
    [this._leaderboard] = await sequelize.query(sql.sqlStringTotal);
    return this._leaderboard as ILeaderBoardResponse[];
  }

  // public async getLeaderboard(): Promise<ICompleteLeaderboard[]> {
  //   const leaderboardHome = await this.getLeaderboardHome();
  //   const leaderboardAway = await this.getLeaderboardAway();

  //   const completeLeaderboard = this._generateLeaderboard(leaderboardAway, leaderboardHome);
  //   return completeLeaderboard as ICompleteLeaderboard[];
  // }

  // private _generateLeaderboard(
  //   leaderboardAway: ILeaderBoardResponse[],
  //   leaderboardHome: ILeaderBoardResponse[],
  // ): ICompleteLeaderboard[] {
  //   leaderboardHome.forEach((homeTeam: ILeaderBoardResponse) => {
  //     const awayTeam: ILeaderBoardResponse = leaderboardAway
  //       .find(({ name }) => name === homeTeam.name) as ILeaderBoardResponse;
  //     console.log('HOME TEAM', homeTeam);
  //     console.log('AWAY TEAM', awayTeam);
  //     const newResult = this._generateResult(homeTeam, awayTeam);
  //     console.log('NEW SCORE TEAM', newResult);
  //     this._completeLeaderboard.push(newResult);
  //     // console.log('NEW LEADERBOARD', this._completeLeaderboard);
  //   });
  //   return this._completeLeaderboard;
  // }

  // private _generateResult(
  //   { totalGames, totalVictories, totalDraws, totalLosses, totalPoints,
  //     goalsFavor, goalsBalance, goalsOwn, name }: ILeaderBoardResponse,
  //   awayTeam: ILeaderBoardResponse,
  // ): ICompleteLeaderboard {
  //   this._newResult.name = name;
  //   this._newResult.totalGames = parseInt(awayTeam.totalGames, 10) + parseInt(totalGames, 10);
  //   this._newResult.totalVictories = parseInt(awayTeam.totalVictories, 10)
  //   + parseInt(totalVictories, 10);
  //   this._newResult.totalDraws = parseInt(awayTeam.totalDraws, 10) + parseInt(totalDraws, 10);
  //   this._newResult.totalLosses = parseInt(awayTeam.totalLosses, 10) + parseInt(totalLosses, 10);
  //   this._newResult.goalsFavor = parseInt(awayTeam.goalsFavor, 10) + parseInt(goalsFavor, 10);
  //   this._newResult.goalsOwn = parseInt(awayTeam.goalsOwn, 10) + parseInt(goalsOwn, 10);
  //   this._newResult.goalsBalance = parseInt(awayTeam.goalsBalance, 10) + parseInt(goalsBalance, 10);
  //   this._newResult.totalPoints = parseInt(awayTeam.totalPoints, 10) + parseInt(totalPoints, 10);
  //   this._newResult.efficiency = Math.round((this._newResult.totalPoints
  //     / (this._newResult.totalGames * 3)) * 100);

  //   return this._newResult;
  // }
}
