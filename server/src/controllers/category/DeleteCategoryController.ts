import {Request, Response} from 'express';
import {getConnection, getRepository} from 'typeorm';
import {Category} from '../../entity/Category';
import {User} from '../../entity/User';

export class DeleteCategoryController {
  static delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    const userId = res.locals.jwtPayload.userId;

    await getConnection()
      .createQueryBuilder()
      .relation(User, 'categories')
      .of(userId)
      .remove(id);

    let categoryUsage;
    const categoryRepository = getRepository(Category);
    try {
      categoryUsage = await categoryRepository.findOneOrFail(id, {relations: ['users']});
    } catch (err) {
      res.status(404).send('Категория не найдена!');
    }

    if (!categoryUsage.users.length) {
      await categoryRepository.delete(id);
    }
    console.log(JSON.stringify({removedId: id}));
    res.send({removedId: id});

  };
}
