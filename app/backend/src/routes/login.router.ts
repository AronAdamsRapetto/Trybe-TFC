import { Router } from 'express';
import LoginService from '../services/login.service';
import LoginController from '../controllers/login.controller';

const loginRouter = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

loginRouter.post('/', async (req, res) => loginController.login(req, res));

export default loginRouter;
