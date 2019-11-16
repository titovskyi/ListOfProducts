import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn, ManyToMany
} from 'typeorm';
import {Length, IsNotEmpty} from 'class-validator';
import * as bcrypt from 'bcryptjs';
import {List} from './List';
import {Product} from './Product';
import {Category} from "./Category";

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 20)
  username: string;

  @Column()
  @Length(4, 100)
  password: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(type => List, list => list.users, {cascade: true})
  lists: List[];

  @ManyToMany(type => Product, product => product.users, {cascade: true})
  products: Product[];

  @ManyToMany(type => Category, category => category.users, {cascade: true})
  categories: Category[];

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
