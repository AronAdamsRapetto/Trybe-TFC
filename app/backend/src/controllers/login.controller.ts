import { Request, Response } from 'express';
import IPayloadToken from '../interfaces/payload/payloadToken';
import CustomizedError from '../utils/customizedError';
import ILoginService from '../interfaces/service/login';

export default class LoginController {
  private loginService: ILoginService;

  constructor(loginService: ILoginService) {
    this.loginService = loginService;
  }

  public async login(req: Request, res: Response) {
    const { body } = req;
    if (!body.email || !body.password) throw new CustomizedError(400, 'All fields must be filled');

    const token = await this.loginService.login(body);
    res.status(200).json({ token });
  }

  public validate(req: Request, res: Response) {
    const { user } = req.body;

    const role = this.loginService.validate(user as IPayloadToken);
    res.status(200).json({ role });
  }
}
