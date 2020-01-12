import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {User} from '../../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../../config/config';

export class CheckTokenController {
  static check = async (req: Request, res: Response) => {
    const {token} = req.body;
    console.log(token, 'tokentokentokentaasdsadasdasasdasadasdassdlgmapnwpmagpaernbpijwnemvlearpbneor;mpfl;');
    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOne({where: {token: token}});
    } catch (error) {
      res.status(401).send();
    }
    // Sing JWT

    // if (user) {
    //   const jwtToken = jwt.sign(
    //     {userId: user.id, username: user.username},
    //     config.jwtSecret
    //   );
    // }


    // Send the jwt in the response
    res.send(user);

  }
}
