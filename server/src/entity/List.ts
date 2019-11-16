import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import {User} from './User';
import {Product} from './Product';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @ManyToMany(type => Product, product => product.lists)
  products: Product[];

  @ManyToMany(type => User, user => user.lists)
  @JoinTable()
  users: User[];

}
