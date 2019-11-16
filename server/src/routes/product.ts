import {Router} from 'express';
import {GetProductsController} from '../controllers/product/GetProductsController';
import {PostProductController} from '../controllers/product/PostProductController';
import {DeleteProductController} from '../controllers/product/DeleteProductController';

const router = Router();

router.get('/', GetProductsController.get);

router.post('/', PostProductController.post);

router.delete(
  '/:id([0-9]+)',
  DeleteProductController.delete
);

export default router;
