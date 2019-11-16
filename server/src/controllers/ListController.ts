import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {List} from '../entity/List';
import {validate} from 'class-validator';
import {User} from '../entity/User';

class ListController {
  static listAll = async (req: Request, res: Response) => {
    // Get current user lists
    const userId = res.locals.jwtPayload.userId;

    const userRepository = getRepository(User);
    const userWithLists = await userRepository.findOneOrFail(userId, {relations: ['lists']});

    res.send(userWithLists.lists);
  };

  static createList = async (req: Request, res: Response) => {
    const userId = res.locals.jwtPayload.userId;
    const {listName} = req.body;
    const userList = new List();
    userList.name = listName;

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
  };
}

export default ListController;
