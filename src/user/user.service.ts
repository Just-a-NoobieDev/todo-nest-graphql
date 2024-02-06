import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUser(id: string): Promise<User> {
    return this.userRepository.findOneByOrFail({ id });
  }

  async createUser(
    name: string,
    email: string,
    password: string,
    cpassword: string,
  ): Promise<User> {
    if (password != cpassword) {
      return null;
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      id: uuid(),
      name,
      email,
      password: hashedPass,
      createdAt: new Date().toISOString(),
    });
    return this.userRepository.save(user);
  }
}
