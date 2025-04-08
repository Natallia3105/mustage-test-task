import { Column, Entity, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './abstract/base.enitty';
import { Todo } from './todo.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
