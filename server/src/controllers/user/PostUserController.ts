import {Request, Response} from 'express';
import {User} from '../../entity/User';
import {validate} from 'class-validator';
import {getRepository} from 'typeorm';
import {PostCategoryController} from '../category/PostCategoryController';
import {Category} from '../../entity/Category';

export class PostUserController {
  static postNewUser = async (req: Request, res: Response) => {
    const {username, password, email} = req.body;

    const newUser = new User();

    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    newUser.categories = [];

    const errors = await validate(newUser);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    newUser.hashPassword();

    const userRepository = getRepository(User);

    try {
      await userRepository.save(newUser);
    } catch (e) {
      res.status(409).send('username already in use');
      return;
    }

    const currentUser = await userRepository.findOne({where: {email: email}, relations: ['categories']});
    const categoryRepository = getRepository(Category);

    const startCategories = [
      'Молочные продукты',
      'Море продукты',
      'Кондитеские изделия',
      'Хлебобулочные изделия',
      'Мясо',
      'Колбаса/Сыр',
      'Алкоголь',
      'Напитки',
      'Кофе/Чай',
      'Кулинария',
      'Хозяйственные товары',
      'Детские товары',
      'Косметика',
      'Бытовая химия',
      'Крупы/Макароны',
      'Бакалея',
      'Аптека'
    ];

    const array = [];

    startCategories.forEach((startCategory: string) => {
      const some = categoryRepository.findOne({where: {name: startCategory}});
      array.push(some);
    });

    Promise.all(array).then((result) => {
      for (let i = 0; result.length > i; i++) {
        if (!result[i]) {
          const category = new Category();
          category.name = startCategories[i];
          currentUser.categories.push(category);
        } else {
          currentUser.categories.push(result[i]);
        }
      }

      // result.map((category) => {
      //   console.log(category, 'categorycategory');
      //   if (!category) {
      //     const category = new Category()
      //     category.name = st
      //   }
      //   currentUser.categories.push(category);
      // });
      userRepository.save(currentUser);
    }).catch(() => {
        res.status(400).send('Ошибка создания стартовых категорий!');
    });
    //
    // startCategories.forEach((startCategory: string) => {
    //   categoryRepository.findOne({where: {name: startCategory}})
    //     .then((result: Category) => {
    //       let createCategory: Category = null;
    //
    //       if (result) {
    //         console.log(result, 'result');
    //         createCategory = result;
    //         newUser.categories.push(result);
    //       } else if (!result) {
    //
    //         console.log(result, '!result');
    //         const newCategory = new Category();
    //         newCategory.name = startCategory;
    //
    //         createCategory = newCategory;
    //         newUser.categories.push(createCategory);
    //
    //       }
    //
    //       return;
    //     });
    // });

    // try {
    //   console.log('user repository saved');
    //   await userRepository.save(newUser);
    // } catch (err) {
    //   res.status(400).send('Ошибка создания стартовых категорий!');
    //   return;
    // }


    res.status(201).send(newUser);
  };
}
