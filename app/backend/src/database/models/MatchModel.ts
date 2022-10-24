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

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeMatch' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'awaytMatch' });

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
