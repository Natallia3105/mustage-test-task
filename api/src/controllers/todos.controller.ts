import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TodosService } from '../services/todos.service';
import { GetTodosQueryDto, TodoDto } from '../dtos';
import { AuthGuard } from '../services/auth.guard';
import { UserReq } from '../utils/user.decorator';
import { AuthUser } from '../models';
import { TodoStatus } from '../entities/enums';

@Controller('todos')
@ApiTags('Todos')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async createOne(@Body() body: TodoDto, @UserReq() user: AuthUser) {
    const todo = await this.todosService.createOne({
      ...body,
      userId: user.sub,
    });

    return {
      data: todo,
    };
  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() body: TodoDto) {
    await this.todosService.updateOne(id, body);
  }

  @Patch(':id/complete')
  async completeOne(@Param('id') id: string) {
    await this.todosService.updateOne(id, { status: TodoStatus.Done });
  }

  @Delete(':id')
  async removeOne(@Param('id') id: string) {
    await this.todosService.deleteOne(id);

    return {
      data: id,
    };
  }

  @Get()
  async findAll(@UserReq() user: AuthUser, @Query() query: GetTodosQueryDto) {
    const todos = await this.todosService.findFilteredByUser(user.sub, query);

    return {
      data: todos,
    };
  }
}
