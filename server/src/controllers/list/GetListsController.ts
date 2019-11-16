import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {User} from '../../entity/User';

export class GetListsController {
  static get = async (req: Request, res: Response) => {
    const userId = res.locals.jwtPayload.userId;

    const userRepository = getRepository(User);
    const currentUser = await userRepository.findOne(userId, {relations: ['lists']});

    res.send(currentUser.lists);
  };
}
