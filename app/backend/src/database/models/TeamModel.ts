import { STRING, NUMBER, Model } from 'sequelize';
import db from '.';

class Teams extends Model {
  id!: number;
  teamName!: string;
}

Teams.init({
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

export default Teams;
