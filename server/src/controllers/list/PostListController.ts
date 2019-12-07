import {Request, Response} from 'express';
import {List} from '../../entity/List';
import {validate} from 'class-validator';
import {getRepository} from 'typeorm';
import {User} from '../../entity/User';
import {Product} from '../../entity/Product';

export class PostListController {
  static post = async (req: Request, res: Response) => {
    const userId = res.locals.jwtPayload.userId;
    const {listName, products} = req.body;

    const userList = new List();

    userList.name = listName;

    const errors = await validate(userList);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(userId, {relations: ['lists']});
    user.lists.push(userList);

    try {
      await userRepository.save(user);
    } catch (err) {
      return;
    }

    products.map(async (prod) => {
      await PostListController.addProdutsArray(userId, listName, prod, res);
    });

    res.status(200).send(user.lists);
  };

  static addProdutsArray = async (userId, listName, product, res) => {

    const newProduct = new Product();
    newProduct.name = product.name;
    newProduct.category = 'Какая-то';

    const errors = await validate(newProduct);
    if (errors.length > 0) {
      throw new Error('Ошибка при сохранении!');
    }

    const userRepository = getRepository(User);
    const currentUser = await userRepository.findOne(userId, {relations: ['products']});

    const productExist = currentUser.products.find((prod) => prod.name === newProduct.name);

    if (!productExist) {
      currentUser.products.push(newProduct);
    }

    const listRepository = getRepository(List);
    const currentList = await listRepository.find({where: {name: listName}, relations: ['products']});
    if (!productExist) {
      currentList[0].products.push(newProduct);
    } else {
      currentList[0].products.push(productExist);
    }

    try {
      await userRepository.save(currentUser);
    } catch (err) {
      res.status(409).send('username already in use');
      return;
    }
    try {
      await listRepository.save(currentList);
    } catch (err) {
      res.status(409).send('username already in use');
      return;
    }
  };
}
