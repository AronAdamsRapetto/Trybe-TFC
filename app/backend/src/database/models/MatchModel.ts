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

Team.belongsTo(Match, { foreignKey: 'homeTeam', as: 'homeTeam' });
Team.belongsTo(Match, { foreignKey: 'awayTeam', as: 'awayTeam' });

Match.hasMany(Team, { foreignKey: 'homeTeam', as: 'homeTeam' });
Match.hasMany(Team, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Match;
