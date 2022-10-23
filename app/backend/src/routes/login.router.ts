import { Router } from 'express';
import authUser from '../middlewares/authUser';
import LoginService from '../services/login.service';
import LoginController from '../controllers/login.controller';

const loginRouter = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

loginRouter.post('/', async (req, res) => loginController.login(req, res));
loginRouter.get(
  '/validate',
  authUser,
  async (req, res) => loginController.validate(req, res),
);

export default loginRouter;
