import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (users.length <= 0) {
      return null;
    }
    return users;
  }

  async getUser(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
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

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOneByOrFail({ email });
    const { result } = await bcrypt.compare(password, user.password);
    if (!result) {
      throw new Error('Unauthorized');
    }

    const payload = { id: user.id, email: user.email, name: user.name };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
