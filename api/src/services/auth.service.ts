import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { Token } from '../models';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;

    return hash(password, saltRounds);
  }

  async signIn(email: string, password: string): Promise<Token | null> {
    const user = await this.usersService.fetchUserByEmail(email);

    if (!user?.password) return null;

    const isPasswordEquals = await this.isPasswordsEqual(
      password,
      user.password,
    );

    if (!isPasswordEquals) return null;

    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async isPasswordsEqual(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
