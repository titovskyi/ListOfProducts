import {Router} from 'express';
import AuthController from '../controllers/AuthController';
import {checkJwt} from '../middlewares/checkJwt';
import {LoginController} from '../controllers/auth/LoginController';

const router = Router();
// Login route
router.post('/login', LoginController.login);

// Change my password
// TODO Change to ChangePasswordController
router.post('/change-password', [checkJwt], AuthController.changePassword);

export default router;
