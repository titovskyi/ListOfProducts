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

    const savedProds = products.map((prod) => {
      return PostListController.addProdutsArray(userId, prod);
    });

    userList.name = listName;
    userList.products = savedProds;
    console.log(userList);


    const errors = await validate(userList);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(userId, {relations: ['lists']});
    user.lists.push(userList);
    await userRepository.save(user);

    res.status(201).send('List created!');
  }

  static addProdutsArray = async (userId, product) => {

    const newProduct = new Product();
    newProduct.name = product.name;
    newProduct.category = 'Какая-то';

    const errors = await validate(newProduct);
    if (errors.length > 0) {
      throw new Error('Щшибка при сохранении!');
    }

    const userRepository = getRepository(User);
    const currentUser = await userRepository.findOne(userId, {relations: ['products']});

    const productExist = currentUser.products.find((prod) => prod.name === newProduct.name);

    if (!productExist) {
      currentUser.products.push(newProduct);
    }

    try {
      await userRepository.save(currentUser);
    } catch (err) {
      return;
    }

    return newProduct;
  }
}
