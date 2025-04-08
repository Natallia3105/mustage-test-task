import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { Todo } from './entities/todo.entity';
import { AuthController } from './controllers/auth.controller';
import { TodosController } from './controllers/todos.controller';
import { AuthService } from './services/auth.service';
import { TodosService } from './services/todos.service';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from './services/auth.guard';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      load: [typeorm],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      // @ts-ignore
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.AUTH_JWT_SECRET,
      signOptions: { expiresIn: '360 days' }, // just for test task, in real project it should be around 15 - 60 mins with refresh mechanism,
    }),
    TypeOrmModule.forFeature([User, Todo]),
  ],
  controllers: [AuthController, TodosController],
  providers: [UsersService, AuthService, TodosService, AuthGuard],
})
export class AppModule {}
