import {Request, Response} from 'express';
import {getConnection} from 'typeorm';
import {User} from '../../entity/User';

export class DeleteProductController {
  static delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    const userId = res.locals.jwtPayload.userId;

    await getConnection()
      .createQueryBuilder()
      .relation(User, 'products')
      .of(userId)
      .remove(id);

    res.send({removedId: id});
  };
}
