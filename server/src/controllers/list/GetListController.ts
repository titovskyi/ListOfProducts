import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {List} from '../../entity/List';

export class GetListController {
  static get = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const userId = res.locals.jwtPayload.userId;

    const listRepository = getRepository(List);
    const currentList = await listRepository.findOneOrFail(id, {relations: ['products']});

    // const currentUser = await userRepository.findOneOrFail(userId, {relations: ['lists']});
    // const currentList = currentUser.lists.find((list) => list.id === id);

    res.send(currentList);
  }
}
