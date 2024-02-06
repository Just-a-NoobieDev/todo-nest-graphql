import { Module } from '@nestjs/common';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    JwtModule.register({
      global: true,
      secret: 'asdasdasdasdasdasd',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    TodoResolver,
    TodoService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class TodoModule {}
