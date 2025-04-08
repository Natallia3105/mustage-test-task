import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createOne(data: Partial<User>): Promise<User> {
    return this.usersRepository.save({ ...data });
  }

  async updateOne(id: string, data: Partial<User>): Promise<void> {
    await this.usersRepository.update(id, data);
  }

  async fetchOneById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['products', 'pdfs', 'sessions'],
    });
  }

  async setPassword(id: string, password: string): Promise<void> {
    await this.usersRepository.update(id, { password });
  }

  async fetchUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }
}
