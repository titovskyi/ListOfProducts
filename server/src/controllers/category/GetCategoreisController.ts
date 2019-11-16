import {Request, Response} from 'express';
import {User} from '../../entity/User';
import {getRepository} from 'typeorm';

export class GetCategoreisController {
  static get = async (req: Request, res: Response) => {
    const userId = res.locals.jwtPayload.userId;
    const userRepository = getRepository(User);
    const currentUser = await userRepository.findOneOrFail(userId, {relations: ['categories']});

    res.send(currentUser.categories);
  };
}
