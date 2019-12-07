import {Router} from 'express';
import UserController from '../controllers/UserController';
import {checkJwt} from '../middlewares/checkJwt';
import {checkRole} from '../middlewares/checkRole';
import {PostUserController} from '../controllers/user/PostUserController';

const router = Router();

// Get all users
// TODO Change to UsersConstoller
router.get('/', [checkJwt], UserController.listAll);

// Get one user
// TODO Change to GetUserController
router.get(
  '/:id([0-9]+)',
  [checkJwt],
  UserController.getOneById
);

// Create a new user
router.post('/', PostUserController.postNewUser);

// Edit one user
// TODO Cahnge to PAtchUserController
router.patch(
  '/:id([0-9]+)',
  [checkJwt],
  UserController.editUser
);

// Delete one user
// TODO Change to DeleteUserController
router.delete(
  '/:id([0-9]+)',
  [checkJwt, checkRole(['ADMIN'])],
  UserController.deleteUser
);

export default router;
