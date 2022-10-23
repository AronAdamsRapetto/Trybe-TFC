import PayloadToken from '../payload/payloadToken';
import ILogin from '../request/login';

export default interface ILoginService {
  login(user: ILogin): Promise<string>;
  validate(user: PayloadToken): string;
}
