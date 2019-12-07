import {Request, Response} from 'express';
import {validate} from 'class-validator';
import {getRepository} from 'typeorm';

import {Product} from '../../entity/Product';
import {User} from '../../entity/User';

export class PostProductController {
  static post = async (req: Request, res: Response) => {
    const userId = res.locals.jwtPayload.userId;
    const {productName} = req.body;
    const newProduct = new Product();

    newProduct.name = productName;
    newProduct.category = 'Какая-то';

    const errors = await validate(newProduct);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const userRepository = getRepository(User);
    const currentUser = await userRepository.findOne(userId, {relations: ['products']});

    const productExist = currentUser.products.find((product) => product.name === newProduct.name);

    if (!productExist) {
      currentUser.products.push(newProduct);
    }

    try {
      await userRepository.save(currentUser);
    } catch (err) {
      res.status(409).send('Категория с таким именем существует!');
      return;
    }

    res.send(currentUser.products);
  };
}
