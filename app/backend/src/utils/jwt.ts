import * as jwt from 'jsonwebtoken';

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
}
