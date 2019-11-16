import {Router} from 'express';
import {GetListsController} from '../controllers/list/GetListsController';
import {PostListController} from '../controllers/list/PostListController';

const router = Router();

router.get('/', GetListsController.get);

// router.get('/:id([0-9]+)', ListController.getOneById);

router.post('/', PostListController.post);

export default router;
