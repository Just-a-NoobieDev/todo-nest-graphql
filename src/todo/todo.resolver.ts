/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { Success, TodoType } from './todo.type';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from './todo.input,';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Todo } from './todo.entity';
import { Public } from 'src/auth/decorators/public.decorators';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Resolver((of) => TodoType)
export class TodoResolver {
  constructor(private todoservice: TodoService) {}

  @Public()
  @Query((returns) => TodoType)
  todo(@Args('id') id: string) {
    return this.todoservice.getTodo(id);
  }

  @Public()
  @Query((returns) => [TodoType])
  todos() {
    return this.todoservice.getAllTodo();
  }

  @Mutation((returns) => TodoType)
  @UseGuards(AuthGuard)
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    const todo = this.todoservice.createTodo(createTodoInput);
    pubSub.publish('todoAdded', { todoAdded: todo });
    return todo;
  }

  @Mutation((returns) => TodoType)
  @UseGuards(AuthGuard)
  updateTodo(
    @Args('updateTodoInput', { type: () => UpdateTodoInput })
    updateTodoInput: UpdateTodoInput,
    @Args('id') id: string,
  ) {
    const updatedTodo = this.todoservice.updateTodo(updateTodoInput, id);
    pubSub.publish('todoUpdated', { todoUpdated: updatedTodo });
    return updatedTodo;
  }

  @Mutation((returns) => TodoType)
  @UseGuards(AuthGuard)
  updateStatus(@Args('id') id: string) {
    const isDone = this.todoservice.updateStatus(id);
    pubSub.publish('todoIsDone', { todoIsDone: isDone });
    return isDone;
  }

  @Mutation((returns) => Success)
  @UseGuards(AuthGuard)
  deleteTodo(@Args('id') id: string) {
    return this.todoservice.deleteTodo(id);
  }

  // @ResolveField('user')
  // async user(@Parent() todo: Todo) {
  //   return await todo.user;
  // }

  @Subscription(() => Todo, {
    resolve: (value) => value,
  })
  todoAdded() {
    return pubSub.asyncIterator('todoAdded');
  }

  @Subscription(() => Todo, {
    resolve: (value) => value,
  })
  todoUpdated() {
    return pubSub.asyncIterator('todoUpdated');
  }

  @Subscription(() => Todo, {
    resolve: (value) => value,
  })
  todoIsDone() {
    return pubSub.asyncIterator('todoIsDone');
  }
}
