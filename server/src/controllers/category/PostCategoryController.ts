import {Request, Response} from 'express';
import {validate} from 'class-validator';
import {getRepository} from 'typeorm';

import {Category} from '../../entity/Category';
import {User} from '../../entity/User';

export class PostCategoryController {
  static post = async (req: Request, res: Response) => {
    let userCategory: Category;

    const userId = res.locals.jwtPayload.userId;
    const {categoryName} = req.body;
    const categoryRepository = getRepository(Category);
    const existCategory = await categoryRepository.findOne({where: {name: categoryName}});

    if (existCategory) {
      userCategory = existCategory;
    } else {
      userCategory = new Category();
      userCategory.name = categoryName;
    }

    const errors = await validate(userCategory);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const userRepository = getRepository(User);
    const currentUser = await userRepository.findOne(userId, {relations: ['categories']});

    if (userCategory.id) {
      const categoryExist = currentUser.categories.find((category) => category.id === userCategory.id);

      if (categoryExist) {
        res.send(currentUser.categories);
      }
      currentUser.categories.push(userCategory);
    } else {
      currentUser.categories.push(userCategory);
    }

    try {
      await userRepository.save(currentUser);
    } catch (err) {
      res.status(400).send('Категория с таким именем существует!');
      return;
    }

    res.send(currentUser.categories);
  };

}
