import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {User} from '../../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../../config/config';
import {validate} from 'class-validator';

export class LoginController {
  static login = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    if (!(email && password)) {
      res.status(400).send();
    }

    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail({where: {email}});
    } catch (error) {
      res.status(401).send();
    }

    // Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    // Sing JWT
    const jwtToken = jwt.sign(
      {userId: user.id, username: user.username},
      config.jwtSecret
    );

    user.token = jwtToken;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    try {
      await userRepository.save(user);
    } catch (err) {
      res.status(409).send('Something went wrong!');
      return;
    }

    // Send the jwt in the response
    res.send(JSON.stringify({
      token: jwtToken
    }));

  }
}
