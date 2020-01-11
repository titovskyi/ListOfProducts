import {Router} from 'express';
import AuthController from '../controllers/AuthController';
import {checkJwt} from '../middlewares/checkJwt';
import {LoginController} from '../controllers/auth/LoginController';
import {CheckTokenController} from '../controllers/auth/CheckTokenController';

const router = Router();
// Login route
router.post('/login', LoginController.login);

// Check Token
router.post('/check-token', CheckTokenController.check);

// Change my password
// TODO Change to ChangePasswordController
router.post('/change-password', [checkJwt], AuthController.changePassword);



export default router;
