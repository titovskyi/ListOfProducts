import {Router} from 'express';
import {PostCategoryController} from '../controllers/category/PostCategoryController';
import {GetCategoreisController} from '../controllers/category/GetCategoreisController';
import {DeleteCategoryController} from '../controllers/category/DeleteCategoryController';

const router = Router();

router.get('/', GetCategoreisController.get);

router.post('/', PostCategoryController.post);

router.delete(
  "/:id([0-9]+)",
  DeleteCategoryController.delete
);

export default router;
