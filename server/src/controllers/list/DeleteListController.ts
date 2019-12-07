import {Request, Response} from 'express';
import {getConnection, getRepository} from 'typeorm';
import {User} from '../../entity/User';
import {Category} from '../../entity/Category';
import {List} from '../../entity/List';

export class DeleteListController {
  static delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    const userId = res.locals.jwtPayload.userId;

    await getConnection()
      .createQueryBuilder()
      .relation(User, 'lists')
      .of(userId)
      .remove(id);

    let listUsage;
    const listRepository = getRepository(List);
    try {
      listUsage = await listRepository.findOneOrFail(id, {relations: ['users']});
    } catch (err) {
      res.status(404).send('Категория не найдена!');
    }

    if (!listUsage.users.length) {
      await listRepository.delete(id);
    }
    console.log(JSON.stringify({removedId: id}));
    res.send({removedId: id});
  }
}
