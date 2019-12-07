import {Router} from 'express';
import {GetListsController} from '../controllers/list/GetListsController';
import {GetListController} from '../controllers/list/GetListController';
import {PostListController} from '../controllers/list/PostListController';
import {DeleteListController} from '../controllers/list/DeleteListController';

const router = Router();

router.get('/', GetListsController.get);

router.get('/:id([0-9]+)', GetListController.get);

router.post('/', PostListController.post);

router.delete(
  '/:id([0-9]+)',
  DeleteListController.delete
);

export default router;
