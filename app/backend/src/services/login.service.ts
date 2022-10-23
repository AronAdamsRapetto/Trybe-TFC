import 'dotenv/config';
import * as bcrypt from 'bcryptjs';
import User from '../database/models/UserModel';
import ILogin from '../interfaces/request/login';
import ILoginService from '../interfaces/service/login';
import Jwt from '../utils/jwt';
import CustomizedError from '../utils/customizedError';
import IPayloadToken from '../interfaces/payload/payloadToken';

export default class LoginService implements ILoginService {
  private token: string | null;
  private jwt: Jwt;
  private role: string;

  constructor() {
    this.jwt = new Jwt(process.env.JWT_SECRET as string);
  }

  async login({ email, password }: ILogin): Promise<string> {
    const user = await User.findOne({ where: { email } }) as User;
    if (!user) throw new CustomizedError(401, 'Incorrect email or password');

    const validatePassword = bcrypt.compareSync(password, user.password);
    if (!validatePassword) throw new CustomizedError(401, 'Incorrect email or password');

    this.token = this.jwt.generateToken(user.username, user.role, user.email);
    return this.token;
  }

  validate({ role }: IPayloadToken): string {
    this.role = role;
    return this.role;
  }
}
