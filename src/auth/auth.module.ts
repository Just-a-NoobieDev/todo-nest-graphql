import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'asdasdasdasdasdasd',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
