import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './abstract/base.enitty';
import { User } from './user.entity';
import { TodoStatus } from './enums';

@Entity('todos')
export class Todo extends BaseEntity {
  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  description: string;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;

  @Column()
  @ApiProperty()
  userId: string;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.InProgress,
  })
  @ApiProperty()
  status: TodoStatus;
}
