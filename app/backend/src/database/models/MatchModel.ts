import { NUMBER, Model } from 'sequelize';
import db from '.';
import Team from './TeamModel';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: number;
}

Match.init({
  id: {
    type: NUMBER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: NUMBER,
  },
  homeTeamGoals: NUMBER,
  awayTeam: {
    type: NUMBER,
  },
  awayTeamGoals: NUMBER,
  inProgress: NUMBER,
}, {
  sequelize: db,
  modelName: 'Matches',
  timestamps: false,
  underscored: true,
});

Team.belongsTo(Match, { foreignKey: 'homeTeam', as: 'teamHome' });
Team.belongsTo(Match, { foreignKey: 'awayTeam', as: 'teamAway' });

Match.hasMany(Team, { foreignKey: 'homeTeam', as: 'homeMatch' });
Match.hasMany(Team, { foreignKey: 'awayTeam', as: 'awayMatch' });

export default Match;
