/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoType } from './todo.type';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './todo.input,';

@Resolver((of) => TodoType)
export class TodoResolver {
  constructor(private todoservice: TodoService) {}

  @Query((returns) => TodoType)
  todo(@Args('id') id: string) {
    return this.todoservice.getTodo(id);
  }

  @Query((returns) => [TodoType])
  todos() {
    return this.todoservice.getAllTodo();
  }

  @Mutation((returns) => TodoType)
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoservice.createTodo(createTodoInput);
  }

  @Mutation((returns) => TodoType)
  updateTodo(
    @Args('title') title: string,
    @Args('description') description: string,
    @Args('id') id: string,
  ) {
    return this.todoservice.updateTodo(title, description, id);
  }

  @Mutation((returns) => TodoType)
  updateStatus(@Args('id') id: string) {
    return this.todoservice.updateStatus(id);
  }

  @Mutation((returns) => TodoType)
  deleteTodo(@Args('id') id: string) {
    return this.todoservice.deleteTodo(id);
  }
}
