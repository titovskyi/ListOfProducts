import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import {List} from './List';
import {User} from './User';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  category: string;

  @ManyToMany(type => List, list => list.products)
  @JoinTable()
  lists: List[];

  @ManyToMany(type => User, user => user.products)
  @JoinTable()
  users: User[];

}
