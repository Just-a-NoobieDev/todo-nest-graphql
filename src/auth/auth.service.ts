import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOneByOrFail({ email });
    await bcrypt.compare(password, user.password, async function (err, result) {
      if (result) {
      } else {
        throw new Error(err);
      }
    });
    const payload = { id: user.id, email: user.email, name: user.name };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
