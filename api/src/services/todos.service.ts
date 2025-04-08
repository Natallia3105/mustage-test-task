import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../entities/todo.entity';
import { Repository } from 'typeorm';
import { GetTodosQueryDto } from '../dtos';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async createOne(data: Partial<Todo>): Promise<Todo> {
    return this.todoRepository.save(data);
  }

  async updateOne(id: string, data: Partial<Todo>): Promise<void> {
    await this.todoRepository.update(id, data);
  }

  async deleteOne(id: string): Promise<void> {
    await this.todoRepository.delete(id);
  }

  async findFilteredByUser(
    userId: string,
    query: GetTodosQueryDto,
  ): Promise<Todo[]> {
    const { search, status } = query;

    const qb = this.todoRepository
      .createQueryBuilder('todo')
      .leftJoin('todo.user', 'user')
      .where('user.id = :userId', { userId });

    if (search) {
      qb.andWhere(
        '(LOWER(todo.title) LIKE LOWER(:search) OR LOWER(todo.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    if (status) {
      qb.andWhere('todo.status = :status', { status });
    }

    return qb.orderBy('todo.created_at', 'DESC').getMany();
  }
}
