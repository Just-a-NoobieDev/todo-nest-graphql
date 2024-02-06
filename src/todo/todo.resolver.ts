/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Args,
  Mutation,
  // Parent,
  Query,
  // ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Success, TodoType, UpdateTodoInput } from './todo.type';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './todo.input,';
import { Public } from './decorators/public.decorators';
// import { AuthGuard } from 'src/auth/auth.guard';
// import { UseGuards } from '@nestjs/common';
// import { Public } from './decorators/public.decorators';
// import { Todo } from './todo.entity';

@Resolver((of) => TodoType)
export class TodoResolver {
  constructor(private todoservice: TodoService) {}

  // @Public()
  @Query((returns) => TodoType)
  todo(@Args('id') id: string) {
    return this.todoservice.getTodo(id);
  }

  // @Public()
  @Query((returns) => [TodoType])
  todos() {
    return this.todoservice.getAllTodo();
  }

  @Mutation((returns) => TodoType)
  // @UseGuards(AuthGuard)
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoservice.createTodo(createTodoInput);
  }

  @Mutation((returns) => TodoType)
  // @UseGuards(AuthGuard)
  updateTodo(
    @Args('updateTodoInput', { type: () => UpdateTodoInput })
    updateTodoInput: UpdateTodoInput,
    @Args('id') id: string,
  ) {
    return this.todoservice.updateTodo(updateTodoInput, id);
  }

  @Mutation((returns) => TodoType)
  // @UseGuards(AuthGuard)
  updateStatus(@Args('id') id: string) {
    return this.todoservice.updateStatus(id);
  }

  @Mutation((returns) => Success)
  // @UseGuards(AuthGuard)
  deleteTodo(@Args('id') id: string) {
    return this.todoservice.deleteTodo(id);
  }

  // @ResolveField('user')
  // async user(@Parent() todo: Todo) {
  //   return await todo.user;
  // }
}
