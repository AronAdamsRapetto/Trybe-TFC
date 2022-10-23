import * as jwt from 'jsonwebtoken';
import CustomizedError from './customizedError';

export default class Jwt {
  private key: string;

  constructor(secretKey: string) {
    this.key = secretKey;
  }

  public generateToken(username: string, role: string, email: string): string {
    const payload = { username, role, email };
    const token = jwt.sign(payload, this.key);

    return token;
  }

  public verifyToken(token: string) {
    try {
      const payload = jwt.verify(token, this.key);
      return payload;
    } catch (error: unknown) {
      const { message } = error as Error;
      throw new CustomizedError(401, message);
    }
  }
}
