import {Request, Response} from 'express';
import {getConnection, getRepository} from 'typeorm';
import {User} from '../../entity/User';
import {List} from '../../entity/List';
import {Product} from '../../entity/Product';

export class DeleteProductController {
  static delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    const userId = res.locals.jwtPayload.userId;

    let productUsage;
    const productRepository = getRepository(Product);
    try {
      productUsage = await productRepository.findOneOrFail(id, {relations: ['lists']});
    } catch (err) {
      res.status(404).send('Категория не найдена!');
    }


    if (!productUsage.lists.length) {
      console.log(!productUsage.lists.length, 'length == 0');
      await productRepository.delete(id);
    } else {
      const listsNames = productUsage.lists.map((list) => list.name);
      return res.status(409).send(`Продукт с таким именем используется ${listsNames}!`);
    }

    res.send({removedId: id});
  };
}
