import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {List} from '../../entity/List';
import {User} from '../../entity/User';
import {validate} from 'class-validator';
import {Product} from '../../entity/Product';

export class PutListController {
  static put = async (req: Request, res: Response) => {
    const userId = res.locals.jwtPayload.userId;
    const listId = Number(req.params.id);
    const {listName, products} = req.body;

    const userRepository = getRepository(User);
    const listRepository = getRepository(List);
    let currentUser = await userRepository.findOne(userId, {relations: ['products', 'lists']});
    let currentList = await listRepository.findOne({where: {id: listId}, relations: ['products']});

    currentList.name = listName;
    currentList.products = products;

    currentList.products.map(async (product) => {
      if (!product.id) {
        const newProduct = new Product();
        newProduct.name = product.name;
        newProduct.category = product.category;

        const productExist = currentUser.products.find((prod) => prod.name === product.name);

        if (!productExist) {
          currentUser.products.push(newProduct);
        } else {
          productExist.category = product.category;
          currentUser.products.map((prod) => {
            if (prod.id === productExist.id) {
              prod = productExist;
            }
            return prod;
          });
        }
      }
    });

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
    console.log(currentList);
    res.send(currentList.products);
  };
}
