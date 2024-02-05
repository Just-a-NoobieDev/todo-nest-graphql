import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateTodoInput } from './todo.input,';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async getTodo(id: string): Promise<Todo> {
    return await this.todoRepository.findOneBy({
      id: id,
    });
  }

  async getAllTodo(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async createTodo(createTodoInput: CreateTodoInput): Promise<Todo> {
    const { title, description } = createTodoInput;
    const todo = this.todoRepository.create({
      id: uuid(),
      title: title,
      description: description,
      status: false,
      createdAt: new Date().toISOString(),
    });
    return await this.todoRepository.save(todo);
  }

  async updateTodo(
    id: string,
    title?: string,
    description?: string,
  ): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (title) {
      todo.title = title;
    }

    if (description) {
      todo.description = description;
    }
    return await this.todoRepository.save(todo);
  }

  async updateStatus(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    todo.status = !todo.status;
    return await this.todoRepository.save(todo);
  }

  async deleteTodo(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    return await this.todoRepository.remove(todo);
  }
}
