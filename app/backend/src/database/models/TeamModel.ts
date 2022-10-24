import { STRING, NUMBER, Model } from 'sequelize';
import db from '.';

class Team extends Model {
  id!: number;
  teamName!: string;
}

Team.init({
  id: {
    type: NUMBER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: STRING,
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

export default Team;
