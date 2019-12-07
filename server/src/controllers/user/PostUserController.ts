import {Request, Response} from 'express';
import {User} from '../../entity/User';
import {validate} from 'class-validator';
import {getRepository} from 'typeorm';

export class PostUserController {
  static postNewUser = async (req: Request, res: Response) => {
    const {username, password, email} = req.body;

    const newUser = new User();

    newUser.username = username;
    newUser.email = email;
    newUser.password = password;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    newUser.hashPassword();

    const userRepository = getRepository(User);

    console.log(newUser);
    try {
      await userRepository.save(newUser);
    } catch (e) {
      res.status(409).send('username already in use');
      return;
    }

    res.status(201).send(newUser);
  };
}
