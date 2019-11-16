import {Router} from 'express';
import auth from './auth';
import user from './user';
import list from './list';
import product from './product';
import category from './category';
import {checkJwt} from '../middlewares/checkJwt';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/list', [checkJwt], list);
routes.use('/product', [checkJwt], product);
routes.use('/category', [checkJwt], category);

export default routes;
