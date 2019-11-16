import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Unique} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import {User} from './User';


@Entity()
@Unique(['name'])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @ManyToMany(type => User, user => user.categories)
  @JoinTable()
  users: User[];

}
