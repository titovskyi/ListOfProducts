import {Response, Request} from 'express';
import {Product} from '../../entity/Product';
import {getRepository} from 'typeorm';
import {User} from '../../entity/User';

export class GetProductsController {
  static get = async (req: Request, res: Response) => {
    const userId = res.locals.jwtPayload.userId;
    const userRepository = getRepository(User);
    const currentUser = await userRepository.findOne(userId, {relations: ['products']});

    res.send(currentUser.products);
  };
}
