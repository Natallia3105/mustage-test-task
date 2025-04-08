import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { AuthService } from 'src/services/auth.service';
import { Token } from '../models';
import { SignInDto } from 'src/dtos';
import { SignUpDto } from '../dtos';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signin')
  async signIn(@Body() body: SignInDto): Promise<{ data: Token }> {
    const result = await this.authService.signIn(body.email, body.password);

    if (!result) {
      throw new UnauthorizedException();
    }

    return { data: result };
  }

  @Post('signup')
  async signUp(@Body() body: SignUpDto): Promise<{ data: Token }> {
    const { email, password, name } = body;

    const user = await this.usersService.fetchUserByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.authService.hashPassword(password);

    await this.usersService.createOne({
      email,
      name,
      password: hashedPassword,
    });

    const result = await this.authService.signIn(email, password);

    if (!result) {
      throw new UnauthorizedException();
    }

    return {
      data: result,
    };
  }
}
