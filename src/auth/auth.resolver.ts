/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Access_token } from './auth.type';
import { AuthService } from './auth.service';
import { Public } from 'src/auth/decorators/public.decorators';

@Resolver(() => Access_token)
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Public()
  @Mutation(() => Access_token)
  signIn(@Args('email') email: string, @Args('password') password: string) {
    return this.authService.signIn(email, password);
  }
}
