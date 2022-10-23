import { STRING, NUMBER, Model } from 'sequelize';
import db from '.';

class User extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

User.init({
  id: {
    type: NUMBER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: STRING,
  role: STRING,
  email: STRING,
  password: STRING,
}, {
  sequelize: db,
  modelName: 'user',
  timestamps: false,
});

export default User;
