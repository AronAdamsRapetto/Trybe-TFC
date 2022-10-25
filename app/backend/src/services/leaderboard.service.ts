import sequelize from '../database/models';
import ILeaderBoardResponse from '../interfaces/response/leaderboard';
import ILeaderboardService from '../interfaces/service/leaderboard';
import sql from '../utils/queryStringLeaderBoard';

export default class LeaderboardService implements ILeaderboardService {
  private _leaderboard: unknown;

  public async getLeaderboardHome(): Promise<ILeaderBoardResponse[]> {
    [this._leaderboard] = await sequelize.query(sql.sqlStringHome);
    return this._leaderboard as ILeaderBoardResponse[];
  }

  public async getLeaderboardAway(): Promise<ILeaderBoardResponse[]> {
    [this._leaderboard] = await sequelize.query(sql.sqlStringAway);
    return this._leaderboard as ILeaderBoardResponse[];
  }
}

// const sqlString = `SELECT te.team_name as name,
// (SUM(IF (ma.home_team_goals > ma.away_team_goals, 3, 0)) +
// SUM(IF (ma.home_team_goals < ma.away_team_goals, 0, 0)) +
// SUM(IF (ma.home_team_goals = ma.away_team_goals, 1, 0))) AS totalPoints,
// COUNT(te.team_name) as totalGames,
// SUM(IF (ma.home_team_goals > ma.away_team_goals, 1, 0)) AS totalVictories,
// SUM(IF (ma.home_team_goals = ma.away_team_goals, 1, 0)) AS totalDraws,
// SUM(IF (ma.home_team_goals < ma.away_team_goals, 1, 0)) AS totalLosses,
// SUM(ma.home_team_goals) AS goalsFavor,
// SUM(ma.away_team_goals) AS goalsOwn,
// (SUM(ma.home_team_goals) - SUM(ma.away_team_goals)) AS goalsBalance,
// ROUND(((SUM(IF (ma.home_team_goals > ma.away_team_goals, 3, 0)) +
// SUM(IF (ma.home_team_goals < ma.away_team_goals, 0, 0)) +
// SUM(IF (ma.home_team_goals = ma.away_team_goals, 1, 0))) /
// (COUNT(te.team_name) * 3)) * 100, 2) AS efficiency
// FROM TRYBE_FUTEBOL_CLUBE.teams AS te
// join TRYBE_FUTEBOL_CLUBE.matches AS ma ON te.id = ma.home_team
// WHERE in_progress = 0
// GROUP BY te.team_name
// ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC`;
