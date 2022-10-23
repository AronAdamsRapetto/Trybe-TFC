import { NextFunction, Response, Request } from 'express';
import CustomizedError from '../utils/customizedError';
import Jwt from '../utils/jwt';

const authUser = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomizedError(401, 'Invalid Token!');

  const jwt = new Jwt(process.env.JWT_SECRET as string);

  const payload = jwt.verifyToken(authorization as string);
  req.body.user = payload;
  next();
};

export default authUser;
